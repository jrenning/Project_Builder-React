#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[allow(non_snake_case)]

use std::fs::File;
use std::{fs::create_dir, path};
use std::path::Path;
use serde_derive::{Deserialize, Serialize};
mod storage;

// tauri and rust seem to have an error that doesn't allow underscore names to be passed
// to the frontend so camelcase is used 
#[allow(non_snake_case)]
#[tauri::command]
fn write_file(fileName: String, dir: String) -> bool {
  let file_path = format!("{}{}", dir, fileName);
  // if file already exists do nothing 
  if Path::new(&file_path).exists() {
    return false;
  }
  let _file = File::create(file_path).expect("File could not be created");
  return true;
}


#[tauri::command]
fn make_dir(dir: String, path: String) -> bool{
  let file_path = format!("{}{}", path, dir);
  // if file already exists do nothing 
  if Path::new(&file_path).exists() {
    return false;
  }
  create_dir(file_path).expect("Directory could not be created");
  return true;
}


pub fn initialize_settings_files() {
  // TODO add error checking
  let settings_dir = storage::get_settings_dir().unwrap().join("settings.json");
  // Pathbuf doesn't have copy so use clone here 
  let path_check = settings_dir.clone();
  // if file doesn't exist create it 
  if Path::new(&path_check.into_os_string().into_string().unwrap()).exists() {
    // consider creating settings file to fail to warrant a panic 
    File::create(&settings_dir);
  }

}

fn main() {
  //initialize_settings_files();


  tauri::Builder::default()
    // This is where you pass in your commands
    .invoke_handler(tauri::generate_handler![write_file, make_dir,storage::set_path_data,storage::get_path_data, storage::get_template_data, storage::set_template_data])
    .run(tauri::generate_context!())
    .expect("failed to run app");
}