// Transporte: o jeito de mandar e receber os pacotes de 63 bytes.
// O protocolo (protocol.js) e a tela nao sabem se estao no navegador ou no app; so usam:
//   t.send(pacote)        manda um pacote (array de 63 bytes)
//   t.onReport(cb)        cb(pacote) para cada pacote que o teclado manda
//   t.onDisconnect(cb)    cb() quando o teclado e desligado
//   t.close()             solta o teclado
//
// - No app (Tauri): a parte em Rust (src-tauri/src/main.rs) fala com o USB pela hidapi.
// - No navegador (Chrome/Edge): WebHID.

// (nao use o nome "isTauri": o Tauri 2 ja cria uma variavel global com esse nome)
const runningInApp = !!window.__TAURI__;

async function openTransport() {
  return runningInApp ? openTauri() : openWebHID();
}

async function openTauri() {
  const { invoke } = window.__TAURI__.core;
  const { listen } = window.__TAURI__.event;
  let onReport = () => {}, onDisconnect = () => {};
  // Escuta antes de conectar, para nao perder a primeira resposta
  const unReport = await listen("hid-report", (e) => onReport(e.payload));
  const unGone = await listen("hid-disconnected", () => onDisconnect());
  let info;
  try { info = await invoke("connect"); } catch (e) { unReport(); unGone(); throw new Error(String(e)); }
  return {
    kind: "app", name: info.product,
    send: (p) => invoke("send", { packet: Array.from(p) }),
    onReport: (cb) => (onReport = cb),
    onDisconnect: (cb) => (onDisconnect = cb),
    close: async () => { unReport(); unGone(); await invoke("disconnect").catch(() => {}); },
  };
}

async function openWebHID() {
  if (!navigator.hid) throw new Error("Este navegador não tem WebHID. Use Chrome ou Edge, ou o app.");
  const filters = PRODUCT_IDS.map((productId) => ({ vendorId: VENDOR_ID, productId }));
  const devices = await navigator.hid.requestDevice({ filters });
  // o teclado expoe varias interfaces HID; a de configuracao tem output report 9
  const dev = devices.find((d) => d.collections.some((c) => c.outputReports.some((r) => r.reportId === REPORT_ID)));
  if (!dev) throw new Error("Nenhuma interface de configuração encontrada. Use o cabo USB.");
  if (!dev.opened) await dev.open();
  let onReport = () => {}, onDisconnect = () => {};
  const handler = (e) => {
    if (e.reportId !== REPORT_ID) return;
    onReport(Array.from(new Uint8Array(e.data.buffer, e.data.byteOffset, e.data.byteLength)));
  };
  const gone = (e) => { if (e.device === dev) onDisconnect(); };
  dev.addEventListener("inputreport", handler);
  navigator.hid.addEventListener("disconnect", gone);
  return {
    kind: "webhid", name: dev.productName,
    send: (p) => dev.sendReport(REPORT_ID, new Uint8Array(p)),
    onReport: (cb) => (onReport = cb),
    onDisconnect: (cb) => (onDisconnect = cb),
    close: async () => { dev.removeEventListener("inputreport", handler); navigator.hid.removeEventListener("disconnect", gone); },
  };
}
