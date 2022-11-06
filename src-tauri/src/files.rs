
use fs_extra::copy_items;
use fs_extra::dir;
use std::fs;


// copy directory to new location
#[allow(non_snake_case)]
#[tauri::command]
pub fn copy_directory(copyPath: String, destinationPath: String)-> bool {
    // TODO add a way to ignore big directories like node modules 
    let mut options = dir::CopyOptions::new();
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
    println!("{}, {}", path, newName);
    match fs::rename(path, newName) {
        Ok(_) => return true,
        Err(_) => return false
    }
}