// Parte em Rust do app: fala com o teclado pelo USB (hidapi) e repassa os pacotes para a tela.
//
// A tela (web/) monta e entende os pacotes; aqui so tem o "cano":
//   connect()    acha o teclado, abre a interface de configuracao e comeca a escutar
//   send(pacote) manda um pacote de 63 bytes (report ID 9)
//   disconnect() solta o teclado
// Cada pacote que o teclado manda vira o evento "hid-report" na tela.

// Em modo release, nao abre uma janela de terminal junto com o app no Windows
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use hidapi::{DeviceInfo, HidApi, HidDevice};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::{Arc, Mutex};
use std::time::{Duration, Instant};
use tauri::{AppHandle, Emitter, State};

const VENDOR_ID: u16 = 0x372e;
const PRODUCT_IDS: [u16; 2] = [0x103e, 0x10b0];
const REPORT_ID: u8 = 9;
const LEN: usize = 63;

/// Conexao atual: um handle para escrever e uma flag para parar a thread que le.
#[derive(Default)]
struct Conn {
    writer: Mutex<Option<HidDevice>>,
    stop: Mutex<Option<Arc<AtomicBool>>>,
}

#[derive(serde::Serialize)]
struct Info {
    product: String,
    path: String,
    usage_page: u16,
}

/// Pacote com checksum, igual ao protocol.js: [62] = 255 - ((9 + soma[0..61]) % 256)
fn packet(head: &[u8]) -> Vec<u8> {
    let mut p = vec![0u8; LEN];
    p[..head.len()].copy_from_slice(head);
    let sum: u32 = REPORT_ID as u32 + p[..LEN - 1].iter().map(|&b| b as u32).sum::<u32>();
    p[LEN - 1] = (255 - (sum % 256)) as u8;
    p
}

/// No Windows, a escrita leva o report ID na frente: 1 + 63 bytes.
fn write(dev: &HidDevice, p: &[u8]) -> Result<(), String> {
    let mut buf = Vec::with_capacity(LEN + 1);
    buf.push(REPORT_ID);
    buf.extend_from_slice(&p[..p.len().min(LEN)]);
    buf.resize(LEN + 1, 0);
    dev.write(&buf).map(|_| ()).map_err(|e| e.to_string())
}

/// Le um pacote (ou nada, se passar o tempo). Tira o report ID da frente quando ele vem.
fn read(dev: &HidDevice, timeout_ms: i32) -> Result<Option<Vec<u8>>, String> {
    let mut buf = [0u8; LEN + 1];
    match dev.read_timeout(&mut buf, timeout_ms) {
        Ok(0) => Ok(None),
        Ok(n) if n == LEN + 1 && buf[0] == REPORT_ID => Ok(Some(buf[1..n].to_vec())),
        Ok(n) => Ok(Some(buf[..n].to_vec())),
        Err(e) => Err(e.to_string()),
    }
}

/// O teclado expoe varias interfaces HID. Testamos cada uma pedindo o uuid (cmd 0x82):
/// a de configuracao e a que responde.
fn answers(dev: &HidDevice) -> bool {
    if write(dev, &packet(&[0x82, 1, 0, 1, 0, 6])).is_err() {
        return false;
    }
    let t0 = Instant::now();
    while t0.elapsed() < Duration::from_millis(400) {
        match read(dev, 50) {
            Ok(Some(r)) if r.first() == Some(&0x82) => return true,
            Ok(_) => {}
            Err(_) => return false,
        }
    }
    false
}

fn stop_reader(conn: &Conn) {
    if let Some(flag) = conn.stop.lock().unwrap().take() {
        flag.store(true, Ordering::Relaxed);
    }
    *conn.writer.lock().unwrap() = None;
}

#[tauri::command]
fn connect(app: AppHandle, conn: State<Conn>) -> Result<Info, String> {
    stop_reader(&conn);
    let api = HidApi::new().map_err(|e| e.to_string())?;
    let mut found: Vec<&DeviceInfo> = api
        .device_list()
        .filter(|d| d.vendor_id() == VENDOR_ID && PRODUCT_IDS.contains(&d.product_id()))
        .collect();
    if found.is_empty() {
        return Err("Teclado Aula não encontrado. Ligue ele no cabo USB.".into());
    }
    // interfaces "do fabricante" (usage page 0xFF00 ou acima) primeiro: costuma ser a de configuracao
    found.sort_by_key(|d| if d.usage_page() >= 0xff00 { 0 } else { 1 });

    for d in found {
        let Ok(dev) = d.open_device(&api) else { continue };
        if !answers(&dev) {
            continue;
        }
        // Um segundo handle so para ler, numa thread propria. Cada handle recebe sua copia
        // dos pacotes, entao ler e escrever nao disputam o mesmo handle.
        let reader = d.open_device(&api).map_err(|e| e.to_string())?;
        let stop = Arc::new(AtomicBool::new(false));
        let stop_thread = stop.clone();
        let app_thread = app.clone();
        std::thread::spawn(move || {
            while !stop_thread.load(Ordering::Relaxed) {
                match read(&reader, 100) {
                    Ok(Some(data)) => {
                        let _ = app_thread.emit("hid-report", data);
                    }
                    Ok(None) => {}
                    Err(_) => {
                        if !stop_thread.load(Ordering::Relaxed) {
                            let _ = app_thread.emit("hid-disconnected", ());
                        }
                        break;
                    }
                }
            }
        });
        *conn.writer.lock().unwrap() = Some(dev);
        *conn.stop.lock().unwrap() = Some(stop);
        return Ok(Info {
            product: d.product_string().unwrap_or("Aula").to_string(),
            path: d.path().to_string_lossy().into_owned(),
            usage_page: d.usage_page(),
        });
    }
    Err("Achei o teclado, mas nenhuma interface respondeu. Feche o site oficial e tente de novo.".into())
}

#[tauri::command]
fn send(conn: State<Conn>, packet: Vec<u8>) -> Result<(), String> {
    let guard = conn.writer.lock().unwrap();
    let dev = guard.as_ref().ok_or_else(|| "Teclado não conectado".to_string())?;
    write(dev, &packet)
}

#[tauri::command]
fn disconnect(conn: State<Conn>) {
    stop_reader(&conn);
}

fn main() {
    tauri::Builder::default()
        .manage(Conn::default())
        .invoke_handler(tauri::generate_handler![connect, send, disconnect])
        .run(tauri::generate_context!())
        .expect("erro ao iniciar o app");
}
