
use fs_extra::copy_items;
use std::{fs::create_dir};
use fs_extra::dir;
use std::fs;
use std::path::Path;
use std::fs::File;


// copy directory to new location
#[allow(non_snake_case)]
#[tauri::command]
pub fn copy_directory(copyPath: String, destinationPath: String)-> bool {
    let options = dir::CopyOptions::new();
    // skip copying outside directory
    let mut from_path = Vec::new();
    from_path.push(copyPath);
    match copy_items(&from_path, &destinationPath, &options) {
        Ok(_result) => return true,
        Err(_e) => return false
    }

}

#[allow(non_snake_case)]
#[tauri::command]
pub fn rename_directory(path: String, newName: String) -> bool {
    match fs::rename(path, newName) {
        Ok(_) => return true,
        Err(_) => return false
    }
}

#[tauri::command]
pub fn path_exist(path: String)-> bool {
    return Path::new(&path).exists()
}

// tauri and rust seem to have an error that doesn't allow underscore names to be passed
// to the frontend so camelcase is used 
#[allow(non_snake_case)]
#[tauri::command]
pub fn write_file(fileName: String, dir: String) -> bool {
  let file_path = format!("{}{}", dir, fileName);
  // if file already exists do nothing 
  if Path::new(&file_path).exists() {
    return false;
  }
  match File::create(&file_path) {
    Ok(_result) => return true,
    Err(_err) => return false
  }
}


#[tauri::command]
pub fn make_dir(dir: String, path: String) -> bool{
  let file_path = format!("{}//{}", path, dir);
  // if file already exists do nothing 
  if Path::new(&file_path).exists() {
    return false;
  }
  match create_dir(file_path) {
    Ok(_result) => return true,
    Err(_err) => return false,
  }
}

