import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";

type TemplateResponseData = {
  template_names: string[];
  template_locations: string[];
};

export const useTemplates = (language: string): TemplateResponseData => {
  const [templateNames, setTemplateNames] = useState([""]);
  const [templateLocations, setTemplateLocations] = useState([""]);

  useEffect(() => {
    async function fetchTemplates() {
        // to lowercase to avoid key error 
      let response: TemplateResponseData = await invoke("get_template_data", {
        language: language.toLowerCase(),
      });
      setTemplateNames(response.template_names);
      setTemplateLocations(response.template_locations);
    }
    fetchTemplates();
  }, []);

  return {
    template_names: templateNames,
    template_locations: templateLocations,
  };
};


