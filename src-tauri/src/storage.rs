use tauri::api::path::local_data_dir;
use serde_json::Value;
use serde_derive::{Deserialize, Serialize};
use std::fs;
use std::path::{Path, PathBuf};
use std::str;
use serde_json::json;
use std::ops::{Index, IndexMut};



#[derive(Deserialize, Debug, Serialize)]
pub struct PathData {
    pub data: serde_json::Value,
    pub status: bool,
}

#[derive(Deserialize, Debug, Serialize)]
pub struct TemplateData {
    pub template_names: Vec<String>,
    pub template_locations: Vec<String>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Template {
    name: String,
    location: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct TemplateList {
    templates: Vec<Template>
}

#[derive(Debug, Deserialize, Serialize)]
pub struct TemplateJSON {
    python: TemplateList,
    javascript: TemplateList,
    rust: TemplateList,
}

// allows for indexing of path settings
impl Index<&'_ str> for TemplateJSON {
  type Output = TemplateList;
  fn index(&self, s: &str) -> &TemplateList {
    match s {
      "python" => &self.python,
      "javascript" => &self.javascript,
      "rust" => &self.rust,
      _ => panic!("unknown field: {}", s),
    }
  }
}

// allows for mutations using indexes of settings 
impl IndexMut<&'_ str> for TemplateJSON {
  fn index_mut(&mut self, s: &str) -> &mut TemplateList {
    match s {
      "python" => &mut self.python,
      "javascript" => &mut self.javascript,
      "rust" => &mut self.rust,
      _ => panic!("unknown field: {}", s),
    }
  }
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

pub fn read_in_template_file() -> Result<TemplateJSON,String> {
    let settings_dir = get_settings_dir().unwrap().join("settings.json");

    let file = fs::read_to_string("C:\\Projects\\Tauri\\project-builder\\src-tauri\\src\\test.json").expect("Test JSON file wasn't found");

    match serde_json::from_str(&file) {
        Ok(result) => return result,
        Err(err) => return Err("Template file was not formatted well".to_string())
    }
}


#[tauri::command]
pub fn get_template_data(language: String) -> Result<TemplateData, String> {

    // create settings file path
    let test = match read_in_template_file() {
        Ok(result) => result,
        Err(err) => return Err(err)
    };


    let templates: &Vec<Template> = &test[&language].templates;


    let mut template_names = Vec::new();
    let mut template_locations = Vec::new();

    for template in templates {
        template_names.push(template.name.clone());
        template_locations.push(template.location.clone());
    }
    let mut final_template_names = Vec::new();

    // replace backslashes in urls
    for name in template_names {
        if name.contains("https:") {
            final_template_names.push(name.replace("\\", ""));
        }
        final_template_names.push(name)
    }

    Ok(TemplateData { template_names:final_template_names, template_locations })

}

#[tauri::command]
pub fn set_template_data(language: String, name: String, location: String) -> Result<(), String> {
    
    let mut template_data: TemplateJSON =  match read_in_template_file() {
        Ok(result) => result,
        Err(err) => return Err(err),
    };

    let templates: &mut Vec<Template> = &mut template_data[&language].templates;

    let new_key_value: Template = Template {
        name,
        location
    };

    templates.push(new_key_value);

    

    let json_data = match serde_json::to_string(&template_data) {
        Ok(result) => result,
        Err(err) => return Err(err.to_string())
    };

    // TODO update this directory
    fs::write("C:\\Projects\\Tauri\\project-builder\\src-tauri\\src\\test.json",json_data).unwrap();

    Ok(())
}

#[tauri::command]
pub fn get_template_path(name: String, language: String) -> String {
    let template_data: TemplateData = match get_template_data(language) {
        Ok(result) => result,
        Err(_err) => return "Template data not found".to_string()
    };
    let names = template_data.template_names;
    let locations = template_data.template_locations;

    // get index of matching name 
    let index = match names.iter().position(|r| r == &name) {
        Some(result) => result,
        None => return "Template name not found in data".to_string()
    };

    // if website link replace backslashes
    let mut result = locations[index].clone();
    if locations[index].contains("https:") {
        result = result.replace("\\", "")
    }

    return result;
}


#[tauri::command]
pub async fn set_path_data(name: String, path: serde_json::Value) -> bool {
    // get local data directory and add on app name 
    // to create storage path
    let storage_dir = match get_settings_dir() {
        Ok(result) => result,
        Err(_) => return false
    };

    // convert json to bincode value
    let json_value = bincode::serialize(&serde_json::to_string_pretty(&path).unwrap()).unwrap();

    // write to file 
    match fs::write(storage_dir.join(name), json_value) {
        Ok(_result) => return true,
        Err(_err) => return false,
    };

}


#[tauri::command]
pub fn get_path_data(key: &str) -> Result<PathData, String> {
    let storage_dir = match get_settings_dir() {
        Ok(result) => result,
        Err(_) => return Err("Path settings directory not found".to_string())
    };
    
    let bin_file = match fs::read(storage_dir.join(key)) {
        Ok(file) => file,
        // if file not created yet 
        Err(_error) => {
            let string: Value = json!("Unknown Path");
            return Ok(PathData { data: string, status: false })
        }
    };

    let deser_data = match bincode::deserialize(&bin_file) {
        Ok(result) => result,
        Err(_err) => return Err("Path data could not be deserialized".to_string())
    };

    let json_data = match serde_json::from_str(deser_data) {
        Ok(result) => result,
        Err(_err) => return Err("Path data could not be converted to JSON".to_string())
    };

    return Ok(
        PathData { data: json_data, status: true }
    )
}