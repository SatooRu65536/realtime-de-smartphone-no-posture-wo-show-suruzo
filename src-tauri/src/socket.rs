use std::io::{ErrorKind, Read};
use std::net::{IpAddr, Ipv4Addr, Shutdown, SocketAddr, TcpListener};
use std::thread;

use serde::{Deserialize, Serialize};
use tauri::{App, AppHandle, Manager};

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
pub enum SocketState {
    Started,
    Connected,
    Disconnected,
    Received,
    Error,
}

#[derive(Debug, Serialize, Clone)]
pub struct SocketPayload {
    state: SocketState,
    data: String,
}

pub fn start_server(app: &mut App) {
    let app_handle = app.app_handle();

    thread::spawn(move || {
        let port_number = 12345;
        let listener = TcpListener::bind(SocketAddr::new(
            IpAddr::V4(Ipv4Addr::new(0, 0, 0, 0)),
            port_number,
        ))
        .expect("Failed to bind to address");

        emit_socket_payload(
            &app_handle,
            SocketState::Started,
            "Server started".to_string(),
        );

        recv(listener, app_handle);
    });
}

fn recv(listener: TcpListener, app_handle: AppHandle) {
    loop {
        match listener.accept() {
            Ok((mut socket, addr)) => {
                emit_socket_payload(
                    &app_handle,
                    SocketState::Connected,
                    format!("Accepted connection from {:?}", addr),
                );
                read(&mut socket, &app_handle);
            }
            Err(e) => {
                eprintln!("Accept error: {}", e);
                std::process::exit(1);
            }
        }
    }
}

fn read(socket: &mut std::net::TcpStream, app_handle: &AppHandle) {
    loop {
        let mut buffer = [0; 1024];
        match socket.read(&mut buffer) {
            Ok(0) => {
                emit_socket_payload(
                    app_handle,
                    SocketState::Disconnected,
                    "Client disconnected".to_string(),
                );

                break;
            }
            Ok(bytes_read) => {
                let message = String::from_utf8_lossy(&buffer[..bytes_read]);
                emit_socket_payload(app_handle, SocketState::Received, message.to_string());
            }
            Err(ref e) if e.kind() == ErrorKind::WouldBlock => {
                continue;
            }
            Err(e) => {
                emit_socket_payload(
                    app_handle,
                    SocketState::Error,
                    format!("Error reading from client: {}", e).to_string(),
                );
                break;
            }
        }
    }

    // Close the connection if it's still open.
    if let Err(e) = socket.shutdown(Shutdown::Both) {
        emit_socket_payload(
            app_handle,
            SocketState::Error,
            format!("Shutdown failed: {}", e).to_string(),
        );
    }
}

fn emit_socket_payload(app_handle: &AppHandle, state: SocketState, data: String) {
    println!("{:?}: {}", state, data);
    let payload = SocketPayload { state, data };

    app_handle.emit_all("socket", payload.clone()).unwrap();
}
