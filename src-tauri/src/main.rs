#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::fs;

use std::path::Path;
use serde_derive::{Serialize};

use serde_json::{json, Value};
use tauri::Manager;
mod storage;
mod files;

#[derive(Clone,Serialize)]
struct Payload {
  message: String
}




pub fn initialize_settings_files() {
  let settings_dir = storage::get_settings_dir()
  .expect("Settings file couldn't be found")
  .join("settings.json");
  // Pathbuf doesn't have copy so use clone here 
  let path_check = settings_dir.clone();

  // if file doesn't exist create it 
  if !Path::new(&path_check.into_os_string().into_string().expect("Settings path could not be found")).exists() {
    let starter_json = json!({
        "python": {
          "templates": []
        },
        "javascript": {
          "templates": []
        },
        "rust": {
          "templates": []
        }
      });

      
      let write_data = serde_json::to_string_pretty(&starter_json).expect("Failed to make starter template data");


    // consider creating settings file to fail to warrant a panic 
    fs::write(&settings_dir, write_data).expect("Settings file could not be created");
  }

}

fn main() {
  // create json settings file 
  initialize_settings_files();


  tauri::Builder::default()
    // This is where you pass in your commands
    .invoke_handler(tauri::generate_handler![files::write_file,
       files::make_dir,storage::set_path_data,storage::get_path_data, storage::get_template_data,
        storage::set_template_data, storage::delete_template_data, files::copy_directory, storage::get_template_path,
        files::rename_directory, files::path_exist])
    .run(tauri::generate_context!())
    .expect("failed to run app");
}