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
  }: PythonFormState,
  setPath: any
) => {
  console.log("Submitted...")
  const project_toast = toast("Creating project...")
  const Project = new PythonProjectCommands(Project_Name, Path, project_toast);


  await handleError(Project.createProjectDirectory(), "Yeah", "Whoops");

  if (Template) {
    Project.useTemplate(Template, "python");
  } else {
    // create default main file
    await handleError(Project.createFile("main.py"), "Yeah", "Whoops");

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
      // TODO add framework code
    }

    if (Packages && Package_Manager == "Poetry") {
      let packages = Packages.split(",")
      packages = packages.map((pack)=> {
        return pack.trim()
      })
      packages.forEach(async (pack)=> {
        await Project.AddPoetryPackage(pack)
      })
    }

    Project.GitSetup(Git_Setup);

    setPath(Project.path);
    // final success message
    toast.update(project_toast, {
      type: toast.TYPE.SUCCESS,
      render: `Project ${Project_Name} created at ${Project.path}`,
      autoClose: 5000,
    })
  }
};
