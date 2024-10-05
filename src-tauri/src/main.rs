// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod filesystem;
mod errors;

use filesystem::explorer::{open_file,open_directory};
use filesystem::volume::get_volumes;

#[tokio::main]
async fn main() {
    tauri::Builder
        ::default()
        .invoke_handler(tauri::generate_handler![get_volumes,open_file,open_directory])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
