// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::io::{ErrorKind, Read};
use std::net::{IpAddr, Ipv4Addr, Shutdown, SocketAddr, TcpListener};
use std::thread;

use tauri::{App, Manager};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            start_server(app);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn start_server(app: &mut App) {
    let app_handle = app.app_handle();

    thread::spawn(move || {
        let port_number = 12345;
        let listener = TcpListener::bind(SocketAddr::new(
            IpAddr::V4(Ipv4Addr::new(0, 0, 0, 0)),
            port_number,
        ))
        .expect("Failed to bind to address");

        println!("Listening for connections on port {}", port_number);

        loop {
            match listener.accept() {
                Ok((mut socket, addr)) => {
                    println!("Accepted connection from {:?}", addr);

                    loop {
                        let mut buffer = [0; 1024];
                        match socket.read(&mut buffer) {
                            Ok(0) => {
                                println!("Client disconnected.");
                                break;
                            }
                            Ok(bytes_read) => {
                                let message = String::from_utf8_lossy(&buffer[..bytes_read]);
                                println!("Received message is \"{}\"", message);
                                app_handle.emit_all("socket", &message).unwrap();
                            }
                            Err(ref e) if e.kind() == ErrorKind::WouldBlock => {
                                continue;
                            }
                            Err(e) => {
                                eprintln!("Error reading from client: {}", e);
                                break;
                            }
                        }
                    }

                    // Close the connection if it's still open.
                    if let Err(e) = socket.shutdown(Shutdown::Both) {
                        eprintln!("Shutdown failed: {}", e);
                    }
                }
                Err(e) => {
                    eprintln!("Accept error: {}", e);
                    std::process::exit(1);
                }
            }
        }
    });
}
