
use fs_extra::copy_items;
use fs_extra::dir;


// copy directory to new location
#[allow(non_snake_case)]
#[tauri::command]
pub fn copy_directory(copyPath: String, destinationPath: String)-> bool {

    let options = dir::CopyOptions::new();
    let mut from_path = Vec::new();
    from_path.push(copyPath);
    match copy_items(&from_path, &destinationPath, &options) {
        Ok(_result) => return true,
        Err(_e) => return false
    }

}