#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::fs::File;

use std::path::Path;
mod storage;
mod files;




pub fn initialize_settings_files() {
  let settings_dir = storage::get_settings_dir()
  .expect("Settings file couldn't be found")
  .join("settings.json");
  // Pathbuf doesn't have copy so use clone here 
  let path_check = settings_dir.clone();
  // if file doesn't exist create it 
  if Path::new(&path_check.into_os_string().into_string().expect("Settings path could not be found")).exists() {
    // consider creating settings file to fail to warrant a panic 
    File::create(&settings_dir).expect("Settings file could not be created");
  }

}

fn main() {
  //initialize_settings_files();


  tauri::Builder::default()
    // This is where you pass in your commands
    .invoke_handler(tauri::generate_handler![files::write_file,
       files::make_dir,storage::set_path_data,storage::get_path_data, storage::get_template_data,
        storage::set_template_data, files::copy_directory, storage::get_template_path,
        files::rename_directory, files::path_exist])
    .run(tauri::generate_context!())
    .expect("failed to run app");
}