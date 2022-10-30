use tauri::api::path::local_data_dir;
use serde_json::Value;
use serde_derive::{Deserialize, Serialize};
use std::fs;
use std::path::{Path, PathBuf};
use std::str;


#[derive(Deserialize, Debug, Serialize)]
pub struct PathData {
    pub data: serde_json::Value,
    pub status: bool,
}


pub fn get_settings_dir() -> Result<PathBuf, bool> {


    let storage_dir = match local_data_dir() {
        Some(dir) => Path::new(&dir).join("project_builder"),
        None => {
        return Err(false);
        }
    };

    if fs::create_dir_all(storage_dir.clone()).is_err() {
        return Err(false);
    };

    return Ok(storage_dir);
}


#[tauri::command]
pub async fn set_path_data(name: String, path: serde_json::Value) -> bool {
    // get local data directory and add on app name 
    // to create storage path
    let storage_dir = get_settings_dir().unwrap();

    let json_value = bincode::serialize(&serde_json::to_string_pretty(&path).unwrap()).unwrap();



    fs::write(storage_dir.join(name), json_value).unwrap();

    return true;

}


#[tauri::command]
pub fn get_path_data(key: &str) -> Result<PathData, String> {
    let storage_dir = get_settings_dir().unwrap();
    
    let bin_file = fs::read(storage_dir.join(key)).unwrap();

    let deser_data = bincode::deserialize(&bin_file).unwrap();

    let json_data = serde_json::from_str(deser_data).unwrap();

    return Ok(
        PathData { data: json_data, status: true }
    )
}