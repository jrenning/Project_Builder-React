use tauri::api::path::local_data_dir;
use serde_json::Value;
use serde_derive::{Deserialize, Serialize};
use std::fs;
use std::path::{Path, PathBuf};
use std::ptr::read;
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

pub fn read_in_template_file() -> TemplateJSON {
    let settings_dir = get_settings_dir().unwrap().join("settings.json");

    let file = fs::read_to_string("C:\\Projects\\Tauri\\project-builder\\src-tauri\\src\\test.json").expect("Test JSON file wasn't found");

    let test: TemplateJSON = serde_json::from_str(&file).expect("JSON was not well-formatted");

    return test;
}


#[tauri::command]
pub fn get_template_data(language: String) -> Result<TemplateData, String> {

    // create settings file path
    // TODO error checking
    let test = read_in_template_file();

    let templates: &Vec<Template> = &test[&language].templates;

    let mut template_names = Vec::new();
    let mut template_locations = Vec::new();

    for template in templates {
        template_names.push(template.name.clone());
        template_locations.push(template.location.clone());
    }

    Ok(TemplateData { template_names, template_locations })

}

#[tauri::command]
pub fn set_template_data(language: String, name: String, location: String) -> Result<(), String> {
    
    let mut template_data: TemplateJSON = read_in_template_file();

    let templates: &mut Vec<Template> = &mut template_data[&language].templates;

    let new_key_value: Template = Template {
        name,
        location
    };

    templates.push(new_key_value);

    

    let json_data = serde_json::to_string(&template_data).unwrap();

    println!("{:?}", json_data);

    fs::write("test.json",json_data).unwrap();



    
    Ok(())
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
    
    let bin_file = match fs::read(storage_dir.join(key)) {
        Ok(file) => file,
        // if file not created yet 
        Err(error) => {
            let string: Value = json!("Unknown Path");
            return Ok(PathData { data: string, status: false })
        }
    };

    let deser_data = bincode::deserialize(&bin_file).unwrap();

    let json_data = serde_json::from_str(deser_data).unwrap();

    return Ok(
        PathData { data: json_data, status: true }
    )
}