// keycap3d.js — keycap magnética 3D (Three.js), vista frontal.
// Uso:
//   import { createKeycap } from './keycap3d.js';
//   const key = await createKeycap(document.getElementById('stage'), { actuation: 1.2 });
//   key.setActuation(2.0); key.press(); key.release();
//   key.onUpdate = ({ travel, actuated }) => { ... };
//   key.destroy();
// Acrescentado para o configurador:
//   key.follow(mm, acionada) / key.unfollow()   segue o curso real da tecla
//   key.setMaxTravel(mm)                        curso maximo do switch
//   key.pause() / key.resume()                  para de desenhar fora da aba

const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

export async function createKeycap(container, options = {}) {
  const THREE = options.THREE || await import(THREE_URL);
  const o = {
    actuation: 1.2,          // mm (0.1–4.0)
    maxTravel: 4,            // mm
    showGuide: true,
    accent: 0x4fd6a6,
    capColor: 0xe9e6df,
    ...options,
  };

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.domElement.style.display = 'block';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 1, 500);
  camera.position.set(0, 14, 80);
  camera.lookAt(0, 8, 0);

  scene.add(new THREE.HemisphereLight(0xdfe6ff, 0x16181c, 0.9));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(30, 55, 25);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -30, right: 30, top: 30, bottom: -30 });
  key.shadow.bias = -0.0005;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x8fb8ff, 0.8);
  rim.position.set(-35, 20, -30);
  scene.add(rim);

  const rr = (w, d, r) => {
    const s = new THREE.Shape(), x = -w / 2, y = -d / 2;
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + d - r); s.quadraticCurveTo(x + w, y + d, x + w - r, y + d);
    s.lineTo(x + r, y + d); s.quadraticCurveTo(x, y + d, x, y + d - r);
    s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    return s;
  };
  const mk = (geo, mat, y, shadow = true) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.y = y; m.castShadow = shadow; m.receiveShadow = true;
    return m;
  };

  // Estrutura fixa (1 unidade = 1 mm)
  scene.add(mk(new THREE.BoxGeometry(36, 1.6, 36), new THREE.MeshStandardMaterial({ color: 0x1f2e27, roughness: 0.6, metalness: 0.2 }), -0.8));
  const sensorMat = new THREE.MeshStandardMaterial({ color: 0x1a3a30, emissive: o.accent, emissiveIntensity: 0.3 });
  scene.add(mk(new THREE.BoxGeometry(3, 1, 3), sensorMat, 0.5));
  scene.add(mk(new THREE.BoxGeometry(15, 7.4, 15), new THREE.MeshPhysicalMaterial({ color: 0xcfd6e0, transparent: true, opacity: 0.22, roughness: 0.15, depthWrite: false }), 4.3, false));
  const plateShape = rr(36, 36, 1.5);
  plateShape.holes.push(rr(15.4, 15.4, 0.6));
  const plateGeo = new THREE.ExtrudeGeometry(plateShape, { depth: 1.5, bevelEnabled: false });
  plateGeo.rotateX(-Math.PI / 2);
  scene.add(mk(plateGeo, new THREE.MeshStandardMaterial({ color: 0x3a3d44, metalness: 0.8, roughness: 0.35 }), 5));

  // Plano-guia do ponto de acionamento
  const guideMat = new THREE.MeshBasicMaterial({ color: o.accent, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false });
  const guidePlane = new THREE.PlaneGeometry(14.6, 14.6);
  guidePlane.rotateX(-Math.PI / 2);
  const guide = new THREE.Group();
  guide.add(new THREE.Mesh(guidePlane, guideMat));
  guide.add(new THREE.LineSegments(new THREE.EdgesGeometry(guidePlane), new THREE.LineBasicMaterial({ color: o.accent })));
  scene.add(guide);

  // Parte móvel: ímã + haste + keycap
  const mover = new THREE.Group();
  scene.add(mover);
  const mag = (c, y) => mk(new THREE.CylinderGeometry(2.2, 2.2, 1, 32), new THREE.MeshStandardMaterial({ color: c, metalness: 0.5, roughness: 0.35 }), y);
  mover.add(mag(0x4f86d6, 5.9), mag(0xd0584f, 6.9));
  mover.add(mk(new THREE.BoxGeometry(4, 5.1, 4), new THREE.MeshStandardMaterial({ color: 0xe2ddd2, roughness: 0.5 }), 9.95));
  const capGeo = new THREE.ExtrudeGeometry(rr(15.5, 15.5, 2.4), { depth: 6.2, bevelEnabled: true, bevelThickness: 1.3, bevelSize: 1.3, bevelSegments: 5, curveSegments: 10 });
  capGeo.rotateX(-Math.PI / 2);
  capGeo.computeBoundingBox();
  const { min, max } = capGeo.boundingBox, pos = capGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const t = (pos.getY(i) - min.y) / (max.y - min.y), s = 1 - 0.2 * t;
    pos.setX(i, pos.getX(i) * s); pos.setZ(i, pos.getZ(i) * s);
  }
  capGeo.translate(0, -min.y, 0);
  const capMat = new THREE.MeshPhysicalMaterial({ color: o.capColor, roughness: 0.55, clearcoat: 0.25, clearcoatRoughness: 0.6 });
  mover.add(mk(capGeo, capMat, 12.5));

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.ShadowMaterial({ opacity: 0.35 }));
  ground.rotation.x = -Math.PI / 2; ground.position.y = -1.7; ground.receiveShadow = true;
  scene.add(ground);

  // Estado + física de mola
  let actuation = o.actuation, pressed = false, target = actuation, x = 0, v = 0;
  let raf, last = performance.now(), sw = 0, sh = 0, lastTravel = -1, lastAct = null;
  let live = null, running = true;

  const api = {
    onUpdate: null, // ({ travel, actuated }) => {}
    setActuation(mm) {
      actuation = Math.max(0.1, Math.min(o.maxTravel, mm));
      if (!pressed) target = actuation;
    },
    getActuation: () => actuation,
    press() { pressed = true; target = o.maxTravel; },
    release() { pressed = false; target = actuation; },
    follow(mm, actuated) { live = { actuated }; target = Math.max(0, Math.min(o.maxTravel, mm)); },
    unfollow() { if (live) { live = null; target = pressed ? o.maxTravel : actuation; } },
    setMaxTravel(mm) { o.maxTravel = mm; api.setActuation(actuation); },
    pause() { if (running) { running = false; cancelAnimationFrame(raf); } },
    resume() { if (!running) { running = true; last = performance.now(); raf = requestAnimationFrame(loop); } },
    setShowGuide(b) { o.showGuide = b; },
    setCapColor(c) { capMat.color.set(c); },
    destroy() {
      cancelAnimationFrame(raf);
      renderer.dispose();
      renderer.domElement.remove();
    },
  };

  const loop = now => {
    raf = requestAnimationFrame(loop);
    const dt = Math.min(0.033, (now - last) / 1000); last = now;
    const cw = container.clientWidth, ch = container.clientHeight;
    if (cw > 0 && ch > 0 && (cw !== sw || ch !== sh)) {
      sw = cw; sh = ch;
      renderer.setSize(cw, ch); camera.aspect = cw / ch;
      if (o.offsetX) camera.setViewOffset(cw, ch, o.offsetX, 0, cw, ch); // abre espaco para a regua
      camera.updateProjectionMatrix();
    }
    const k = pressed || live ? 900 : 320, c = pressed || live ? 55 : 14;
    v += ((target - x) * k - v * c) * dt;
    x += v * dt;
    if (x < 0) { x = 0; v = 0; }
    if (x > o.maxTravel) { x = o.maxTravel; v = 0; }
    mover.position.y = -x;
    const q = x / o.maxTravel, actuated = live ? live.actuated : pressed && x >= actuation - 0.01;
    sensorMat.emissiveIntensity = 0.3 + 3 * q * q;
    guide.visible = o.showGuide;
    guide.position.y = 5.4 - actuation;
    guideMat.opacity = actuated ? 0.45 : 0.18;
    const travel = Math.round(x * 100) / 100;
    if (api.onUpdate && (travel !== lastTravel || actuated !== lastAct)) {
      lastTravel = travel; lastAct = actuated;
      api.onUpdate({ travel, actuated });
    }
    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(loop);
  return api;
}
