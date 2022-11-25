import { PythonFormState } from "./PythonForm";
import { z } from "zod";
import { PythonProjectCommands } from "./PythonCommands";
import { handleError } from "../../utility/handleError";
import { invoke } from "@tauri-apps/api";
import { toast, useToast } from "react-toastify";
export const PythonSubmit = async ({
  Project_Name,
  Git_Setup,
  Path,
  Framework,
  Package_Manager,
  Project_Type,
  Packages,
  Template,
}: PythonFormState) => {
  const project_toast = toast("Creating project...");
  const Project = new PythonProjectCommands(Project_Name, Path, project_toast);

  // run checks to see if project should be created 
  let checks = await Project.runInitialChecks(Package_Manager, Git_Setup);

  // return if checks fail
  if (!checks) {
    return
  }


  if (Template) {
    await Project.useTemplate(Template, "python");
  } else {
    // create outer directory
    await Project.createProjectDirectory()
    // create default main file
    if (Framework != "Django") {
      await Project.createFile("main.py")
    }

    // set package manager
    if (Package_Manager) {
      if (Package_Manager == "Poetry") {
        await 
          Project.InitializePoetry()
      } else if (Package_Manager == "Venv") {
        await Project.CreateVenvEnv()
      }
    }

    if (Framework) {
      if (Framework == "Django") {
        await Project.createDjangoProject(Package_Manager);
      } else if (Framework == "Flask") {
        await Project.createFlaskProject(Package_Manager);
      }
    }

    if (Packages) {
      let packages = Packages.split(",");
      packages = packages.map((pack) => {
        return pack.trim();
      });

      if (Package_Manager == "Poetry") {
        packages.forEach(async (pack) => {
          await Project.AddPoetryPackage(pack);
        });
      }
      else if (Package_Manager == "Venv") {
        packages.forEach(async (pack) => {
          await Project.AddVenvPackage(pack);
        });
      }
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
  };
  await makeThisAsync();
};
