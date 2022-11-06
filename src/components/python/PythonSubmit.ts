import { PythonFormState } from "./PythonForm";
import { z } from "zod";
import { PythonProjectCommands } from "./PythonCommands";
import { handleError } from "../../utility/handleError";
import { invoke } from "@tauri-apps/api";
import { toast, useToast } from "react-toastify";
export const PythonSubmit = async (
  {
    Project_Name,
    Git_Setup,
    Path,
    Framework,
    Package_Manager,
    Project_Type,
    Packages,
    Template,
  }: PythonFormState
) => {
  console.log("Submitted...");
  const project_toast = toast("Creating project...");
  const Project = new PythonProjectCommands(Project_Name, Path, project_toast);


  
  if (Template) {
    await Project.useTemplate(Template, "python");
  } else {
    // create outer directory
    await handleError(Project.createProjectDirectory(), "Yeah", "Whoops");
    // create default main file
    if (Framework != "Django") {
      await handleError(Project.createFile("main.py"), "Yeah", "Whoops");
    }

    // set package manager
    if (Package_Manager) {
      if (Package_Manager == "Poetry") {
        await handleError(
          Project.InitializePoetry(),
          "Poetry initialized...",
          "Poetry failed to initialize..."
        );
      } else if (Package_Manager == "Venv") {
        await handleError(
          Project.CreateVenvEnv(),
          "Venv env created...",
          "Venv env could not be created..."
        );
      }
    }

    if (Framework) {
      if (Framework == "Django") {
        await Project.createDjangoProject()
      }
      else if (Framework == "Flask") {
        await Project.createFlaskProject()
      }
    }

    if (Packages && Package_Manager == "Poetry") {
      let packages = Packages.split(",");
      packages = packages.map((pack) => {
        return pack.trim();
      });
      packages.forEach(async (pack) => {
        await Project.AddPoetryPackage(pack);
      });
    }

    Project.GitSetup(Git_Setup);
  }

  // final success message, made async to avoid it happening out of order
  const makeThisAsync = async () => {
      toast.update(project_toast, {
        type: toast.TYPE.SUCCESS,
        render: `Project ${Project_Name} created at ${Project.path}`,
        autoClose: 5000,
      });
  }
  await makeThisAsync()

};
