// Protocolo dos teclados Aula HERO ("kb_by_v3_wired"), reconstruido a partir do
// JavaScript publico de hero.aulastar.com. Fala com o teclado por um transporte (transport.js).
//
// Formato de todo pacote (63 bytes, report ID 9):
//   [0] comando   [1] subcomando/perfil   [2] 0
//   [3] total de pacotes   [4] indice do pacote   [5] tamanho dos dados
//   [6..61] dados          [62] checksum = 255 - ((9 + soma[0..61]) % 256)
// Leituras usam o comando com o bit 0x80 ligado (ex.: 0x84 le o que 0x04 grava).
// O teclado responde ecoando o cabecalho; casamos a resposta por [0], [3] e [4].
//
// De proposito NAO implementamos: firmware, reset de fabrica e macros.

const VENDOR_ID = 0x372e;
const PRODUCT_IDS = [0x103e, 0x10b0]; // cabo; 0x10B0 = HERO 68 HE wireless no cabo
const REPORT_ID = 9;
const LEN = 63;

// uuid devolvido pelo teclado -> modelo (tabela "t1" do app oficial)
const MODELS = {
  18691697672195: ["HERO 68 HE", "ARM32_HID_68"],
  18691697672212: ["HERO 68 AIR", "ARM32_HID_68"],
  18691697672213: ["WIN68HE Ultra", "ARM32_HID_68"],
  18691697672207: ["HERO 68 MINI", "ARM32_HID_68"],
  18691697672218: ["HERO 68 HE NEO", "ARM32_HID_68"],
  19791209299969: ["HERO 68 HE wireless", "ARM32_HID_68"],
  21990232555523: ["HERO 68 HE wireless", "ARM32_HID_68"],
  18691697672232: ["HERO 68 HE JIS", "ARM32_HID_68_JP"],
  18691697672197: ["HERO 84 HE", "AULA_2829"],
  18691697672245: ["HERO 84 HE JIS", "AULA_2829_JP"],
  18691697672210: ["HERO 99", "AULA_2836"],
  18691697672255: ["HERO 99 HE", "AULA_2836"],
  18691697672214: ["HERO 87 HE", "AULA_2837"],
  18691697672216: ["HERO 100", "AULA_2865"],
  21990232555521: ["HERO 100", "AULA_2865"],
};

// Curso maximo (micrometros) por tipo de switch magnetico (tabela "tl" do app)
const SWITCH_MAX = {
  0: 4000, 1: 3400, 2: 3700, 3: 3400, 4: 3400, 5: 3400, 6: 3700, 7: 3500, 8: 3400,
  9: 3400, 10: 3500, 11: 3400, 12: 3400, 13: 3400, 14: 3400, 15: 3400, 16: 3400,
  18: 3500, 20: 3400, 21: 3400, 22: 3400, 24: 3400, 25: 2800, 27: 3300, 28: 3000,
  32: 3000, 34: 3500, 37: 3400, 40: 3000, 59: 3400, 60: 3300, 61: 3400, 62: 3400,
  63: 3300, 64: 3400, 65: 3400,
};

const LIGHT_MODES = [
  [0, "Desligado"], [1, "Sempre aceso"], [2, "Respirando"], [3, "Neon"],
  [4, "Gatilho (acende ao tocar)"], [5, "Andando na chuva"], [6, "Roleta arco-iris"],
  [7, "Ondas ao digitar"], [8, "Estrelas"], [9, "Pegadas na neve"], [10, "Fluxo continuo"],
  [11, "Seguindo a onda"], [12, "Sombra"], [13, "Onda senoidal"], [14, "Varredura"],
  [15, "Cata-vento"], [16, "Cachoeira colorida"], [17, "Flores"], [18, "Tempestade"],
  [19, "Personalizado (cores por tecla)"],
];

// Efeitos da barra de luz (lista "io" do app oficial)
const SIDE_MODES = [[0, "Desligado"], [3, "Sempre acesa"], [1, "Fluxo contínuo"], [4, "Respirando"],
  [2, "Neon"], [5, "Corrida (luz andando)"]];

// valor gravado -> Hz (opcoes do app para a linha v3)
const POLLING = [[3, "125 Hz"], [2, "250 Hz"], [1, "500 Hz"], [0, "1000 Hz"],
  [6, "2000 Hz"], [5, "4000 Hz"], [4, "8000 Hz"]];

// valor gravado = multiplos de 30 s; 0 = nunca
const SLEEP = [[1, "30 s"], [2, "1 min"], [3, "1 min 30 s"], [4, "2 min"], [6, "3 min"],
  [10, "5 min"], [20, "10 min"], [30, "15 min"], [40, "20 min"], [60, "30 min"],
  [120, "60 min"], [0, "Nunca"]];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const hex = (a) => a.map((b) => b.toString(16).padStart(2, "0")).join(" ");
const chunk = (arr, n) => { const o = []; for (let i = 0; i < arr.length; i += n) o.push(arr.slice(i, i + n)); return o; };
const pos16 = (p) => [(p >> 8) & 0xff, p & 0xff];

class AulaKeyboard {
  // transport: ver transport.js (WebHID no navegador, Rust/hidapi no app)
  constructor(transport, log = () => {}) {
    this.transport = transport;
    this.log = log;
    this.waiter = null;      // { match(pkt) -> bool, resolve }
    this.queue = Promise.resolve(); // fila: um comando por vez, sem travas aninhadas
    this.precision = 10;     // micrometros por unidade (lido do teclado)
    this.onLive = null;      // (lista de {pos, mm, pressed}) durante o modo "ao vivo"
    this.onCalibrate = null; // (lista de {pos, cur, finished}) durante a calibracao
    transport.onReport((pkt) => {
      this.stream(pkt);
      if (this.waiter && this.waiter.match(pkt)) {
        const w = this.waiter; this.waiter = null;
        this.log("rx", hex(pkt.slice(0, 24)));
        w.resolve(pkt);
      }
    });
  }

  build(head, data = []) {
    const p = new Array(LEN).fill(0);
    head.forEach((v, i) => (p[i] = v));
    data.forEach((v, i) => (p[6 + i] = v & 0xff));
    let sum = REPORT_ID;
    for (let i = 0; i < LEN - 1; i++) sum += p[i];
    p[LEN - 1] = 255 - (sum % 256);
    return p;
  }

  // Envia e espera a resposta com comando `expect`. Repete ate `tries` vezes.
  transact(packet, expect, { timeout = 400, tries = 3 } = {}) {
    const run = async () => {
      for (let t = 0; t < tries; t++) {
        const got = new Promise((resolve) => {
          this.waiter = { match: (r) => r[0] === expect && r[3] === packet[3] && r[4] === packet[4], resolve };
        });
        this.log("tx", hex(packet.slice(0, 24)));
        await this.transport.send(packet);
        const res = await Promise.race([got, sleep(timeout).then(() => null)]);
        if (res) return res;
        this.waiter = null;
      }
      throw new Error(`Sem resposta do teclado (cmd 0x${packet[0].toString(16)})`);
    };
    const p = this.queue.then(run, run);
    this.queue = p.catch(() => {});
    return p;
  }

  data(res) { return res.slice(6, LEN - 1); }

  // ---------- Identificacao ----------
  async uuid() {
    const d = this.data(await this.transact(this.build([0x82, 1, 0, 1, 0, 6]), 0x82));
    return d.slice(0, 6).reduce((a, b) => a * 256 + b, 0);
  }
  async firmware() {
    const d = this.data(await this.transact(this.build([0x82, 2, 0, 1, 0, 1, 0]), 0x82));
    return d[1] * 256 + d[0];
  }
  async loadPrecision() {
    const rt = this.data(await this.transact(this.build([0x82, 6, 0, 1, 0, 0, 0]), 0x82))[0];
    const dist = this.data(await this.transact(this.build([0x82, 8, 0, 1, 0, 0, 0]), 0x82))[0];
    this.precision = dist || rt || 10;
    return this.precision;
  }

  // ---------- Perfil (3 perfis no teclado) ----------
  async getProfile() { return (await this.transact(this.build([0x90, 0, 0, 1, 0, 1, 0]), 0x90))[6]; }
  async setProfile(i) { await this.transact(this.build([0x10, 0, 0, 1, 0, 1, i]), 0x10); }

  // ---------- Configuracoes simples (cmd 0x04 grava / 0x84 le) ----------
  async getSetting(sub) { return this.data(await this.transact(this.build([0x84, sub, 0, 1, 0, 0, 0]), 0x84)); }
  async setSetting(sub, values) { await this.transact(this.build([0x04, sub, 0, 1, 0, values.length], values), 0x04); }

  async getPolling() { return this.data(await this.transact(this.build([0x84, 23, 0, 1, 0, 1, 0]), 0x84))[0]; }
  async setPolling(v) { await this.transact(this.build([0x04, 23, 0, 1, 0, 1, v]), 0x04); }
  async getMacMode() { return (await this.getSetting(17))[0] === 1; }
  async setMacMode(on) { await this.setSetting(17, [on ? 1 : 0]); }
  async getWinLock() { return (await this.getSetting(21))[0] === 1; }
  async setWinLock(on) { await this.setSetting(21, [on ? 1 : 0]); }
  // O app oficial le a suspensao mandando um comando de ESCRITA (bug). Aqui lemos com 0x84.
  async getSleep() { return (await this.getSetting(19))[0]; }
  async setSleep(v) { await this.setSetting(19, [v]); }

  // ---------- Iluminacao ----------
  async getLight() {
    const d = await this.getSetting(1);
    return { mode: d[0], rainbow: d[1] === 7, r: d[2], g: d[3], b: d[4], bright: d[5], speed: d[6] };
  }
  async setLight({ mode, rainbow, r, g, b, bright, speed }) {
    await this.setSetting(1, [mode, rainbow ? 7 : 0, r, g, b, bright, speed]);
  }

  // Barra de luz (lateral): mesmo formato da luz das teclas, no subcomando 6.
  // Efeitos proprios (SIDE_MODES); brilho e velocidade vao de 0 a 4.
  async getSideLight() {
    const d = await this.getSetting(6);
    return { mode: d[0], rainbow: d[1] === 7, r: d[2], g: d[3], b: d[4], bright: d[5], speed: d[6] };
  }
  async setSideLight({ mode, rainbow, r, g, b, bright, speed }) {
    // o app oficial manda tamanho 4 quando e multicolorido e 7 quando tem cor; copiamos igual
    await this.transact(this.build([0x04, 6, 0, 1, 0, rainbow ? 4 : 7], [mode, rainbow ? 7 : 0, r, g, b, bright, speed]), 0x04);
  }

  // ---------- Switches magneticos: tipo, curso e Rapid Trigger ----------
  async getKeyTypes(positions) {
    const out = {};
    for (const part of chunk(positions.flatMap(pos16), 36)) {
      const res = await this.transact(this.build([0x95, 0, 0, 1, 0, part.length], part), 0x95);
      const d = res.slice(6, 6 + res[5]);
      for (let i = 0; i + 2 < d.length; i += 3) out[d[i] * 256 + d[i + 1]] = d[i + 2];
    }
    return out;
  }

  // curso de acionamento em mm por tecla
  async getTravel(positions) {
    const out = {};
    for (const part of chunk(positions.flatMap(pos16), 22)) {
      const d = this.data(await this.transact(this.build([0x93, 0, 0, 1, 0, part.length], part), 0x93, { timeout: 600 }));
      for (const k of chunk(d, 5).slice(0, part.length / 2)) {
        out[k[0] * 256 + k[1]] = { mm: ((k[2] * 256 + k[3]) * this.precision) / 1000, global: k[4] };
      }
    }
    return out;
  }
  // keys: [{ pos, mm, global }]  (global 0 = segue o grupo global do app, 1 = individual)
  async setTravel(keys) {
    const bytes = keys.flatMap(({ pos, mm, global }) => {
      const raw = Math.round((mm * 1000) / this.precision);
      return [...pos16(pos), (raw >> 8) & 0xff, raw & 0xff, global ?? 1];
    });
    for (const part of chunk(bytes, 55)) {
      await this.transact(this.build([0x13, 0, 0, 1, 0, part.length], part), 0x13, { timeout: 1000 });
    }
  }

  async getRT(positions) {
    const out = {};
    for (const part of chunk(positions.flatMap(pos16), 12)) {
      const n = part.length / 2;
      const d = this.data(await this.transact(this.build([0x99, 0, 0, 1, 0, part.length], part), 0x99)).slice(0, n * 8);
      for (const k of chunk(d, 8)) {
        out[k[0] * 256 + k[1]] = {
          on: k[2] === 1,
          press: ((k[3] * 256 + k[4]) * this.precision) / 1000,
          release: ((k[5] * 256 + k[6]) * this.precision) / 1000,
          global: k[7],
        };
      }
    }
    return out;
  }
  // keys: [{ pos, on, press, release, global }]  (press/release em mm)
  async setRT(keys) {
    const u = (mm) => Math.round((mm * 1000) / this.precision);
    const bytes = keys.flatMap(({ pos, on, press, release, global }) => [
      ...pos16(pos), on ? 1 : 0, (u(press) >> 8) & 0xff, u(press) & 0xff,
      (u(release) >> 8) & 0xff, u(release) & 0xff, global ?? 1,
    ]);
    for (const part of chunk(bytes, 48)) {
      await this.transact(this.build([0x19, 0, 0, 1, 0, part.length], part), 0x19, { timeout: 1000 });
    }
  }

  // ---------- Funcao das teclas (aba Botao) ----------
  // Camadas: 0 = normal, 1 = segurando Fn, 2 = segurando Fn1.
  // Cada tecla: pos16 + codigo de 4 bytes (ver keycodes.js). Leitura 0x83, gravacao 0x03, 9 teclas por pacote.
  // Se o 3o byte da resposta for 3, a tecla tem um macro (o ultimo byte e o numero do macro).
  async getKeymap(layer, positions) {
    const out = {};
    for (const part of chunk(positions.flatMap(pos16), 18)) {
      const d = this.data(await this.transact(this.build([0x83, layer, 0, 1, 0, part.length], part), 0x83, { timeout: 500 }));
      for (let i = 0; i < part.length / 2; i++) {
        const k = d.slice(i * 6, i * 6 + 6);
        const pos = k[0] * 256 + k[1];
        if (pos !== part[i * 2] * 256 + part[i * 2 + 1]) continue;
        out[pos] = { value: ((k[2] << 24) | (k[3] << 16) | (k[4] << 8) | k[5]) >>> 0, macro: k[2] === 3 ? k[5] : null };
      }
    }
    return out;
  }
  // keys: [{ pos, value }]
  async setKeymap(layer, keys) {
    const bytes = keys.flatMap(({ pos, value }) => [...pos16(pos), (value >>> 24) & 0xff, (value >>> 16) & 0xff, (value >>> 8) & 0xff, value & 0xff]);
    for (const part of chunk(bytes, 54)) {
      await this.transact(this.build([0x03, layer, 0, 1, 0, part.length], part), 0x03, { timeout: 500 });
    }
  }
  // Volta a camada inteira para o padrao de fabrica (so as funcoes das teclas dessa camada).
  async resetLayer(layer) {
    await this.transact(this.build([0x11, layer, 0, 1, 0, 1, 1]), 0x11, { timeout: 1500, tries: 3 });
  }

  // ---------- Zona morta ----------
  // Por tecla: zona morta de cima (evita toque acidental) e de baixo (evita a tecla "soltar" no fundo).
  // 8 bytes por tecla: pos16, cima16, baixo16 (em unidades de precisao), global, ligado.
  async getDeadZone(positions) {
    const out = {};
    for (const part of chunk(positions.flatMap(pos16), 12)) {
      const n = part.length / 2;
      const d = this.data(await this.transact(this.build([0x96, 0, 0, 1, 0, part.length], part), 0x96)).slice(0, n * 8);
      for (const k of chunk(d, 8)) {
        if (k.length < 8) continue;
        out[k[0] * 256 + k[1]] = { top: ((k[2] * 256 + k[3]) * this.precision) / 1000,
          bottom: ((k[4] * 256 + k[5]) * this.precision) / 1000, global: k[6], on: k[7] === 1 };
      }
    }
    return out;
  }
  // keys: [{ pos, on, top, bottom, global }]  (top/bottom em mm)
  async setDeadZone(keys) {
    const u = (mm) => Math.round((mm * 1000) / this.precision);
    const bytes = keys.flatMap(({ pos, on, top, bottom, global }) => [
      ...pos16(pos), (u(top) >> 8) & 0xff, u(top) & 0xff, (u(bottom) >> 8) & 0xff, u(bottom) & 0xff, global ?? 1, on ? 1 : 0,
    ]);
    for (const part of chunk(bytes, 48)) {
      await this.transact(this.build([0x16, 0, 0, 1, 0, part.length], part), 0x16, { timeout: 1000 });
    }
  }

  // ---------- Pacotes que o teclado manda sozinho ----------
  // 0x98 sub 1: curso ao vivo. 6 bytes por tecla: pos16, curso16 (em unidades de precisao),
  //             ad16 (leitura do sensor; bit 15 = tecla acionada).
  // 0x94 sub 2: calibracao. 6 bytes por tecla: pos16, cur16 (bit 15 desligado = tecla ja
  //             calibrada), min16.
  stream(pkt) {
    const d = pkt.slice(6, 6 + pkt[5]);
    if (pkt[0] === 0x98 && pkt[1] === 1 && this.onLive) {
      const keys = [];
      for (let i = 0; i + 5 < d.length; i += 6) {
        const ad = d[i + 4] * 256 + d[i + 5];
        keys.push({ pos: d[i] * 256 + d[i + 1], mm: ((d[i + 2] * 256 + d[i + 3]) * this.precision) / 1000,
          ad: ad & 0x7fff, pressed: (ad & 0x8000) !== 0 });
      }
      this.onLive(keys);
    } else if (pkt[0] === 0x94 && pkt[1] === 2 && this.onCalibrate) {
      const keys = [];
      for (let i = 0; i + 5 < d.length; i += 6) {
        const cur = d[i + 2] * 256 + d[i + 3];
        keys.push({ pos: d[i] * 256 + d[i + 1], cur: cur & 0x7fff, finished: (cur & 0x8000) === 0 });
      }
      this.onCalibrate(keys);
    }
  }

  // ---------- Curso ao vivo (mostra quanto cada tecla afundou) ----------
  // So le: nao grava nada no teclado.
  async liveStart() { await this.transact(this.build([0x98, 0, 0, 1, 0, 0, 0]), 0x98, { timeout: 300, tries: 2 }); }
  // Diz ao teclado quais teclas acompanhar. O app oficial reenvia a cada 100 ms, sem esperar resposta.
  async liveWatch(positions) {
    const bytes = positions.slice(0, 28).flatMap(pos16);
    await this.transport.send(this.build([0x98, 1, 0, 1, 0, bytes.length], bytes));
  }
  async liveStop() { await this.transact(this.build([0x98, 2, 0, 1, 0, 0, 0]), 0x98, { timeout: 300, tries: 2 }); }

  // ---------- Calibracao ----------
  // Faixa do sensor (max = solta, min = no fundo) gravada para cada tecla.
  async calibrationRange(positions) {
    const out = {};
    for (const part of chunk(positions.flatMap(pos16), 18)) {
      const res = await this.transact(this.build([0x94, 5, 0, 1, 0, part.length], part), 0x94, { timeout: 500 });
      const d = res.slice(6, 6 + res[5]);
      for (let i = 0; i + 5 < d.length; i += 6) {
        out[d[i] * 256 + d[i + 1]] = { max: d[i + 2] * 256 + d[i + 3], min: d[i + 4] * 256 + d[i + 5] };
      }
    }
    return out;
  }
  // Entra no modo de calibracao. O app oficial repete este comando a cada 1 s enquanto calibra.
  async calibrationStart() { await this.transact(this.build([0x94, 0, 0, 1, 0, 0, 0]), 0x94, { timeout: 300, tries: 2 }); }
  // Sai do modo (o app oficial manda 3 vezes, com 100 ms entre elas).
  async calibrationStop() {
    let ok = false;
    for (let i = 0; i < 3; i++) {
      try { await this.transact(this.build([0x94, 4, 0, 1, 0, 0, 0]), 0x94, { timeout: 500, tries: 1 }); ok = true; } catch {}
      await sleep(100);
    }
    if (!ok) throw new Error("o teclado nao confirmou a saida da calibracao");
  }
}
