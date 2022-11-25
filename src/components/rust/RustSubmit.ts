import { toast } from "react-toastify";
import { RustProjectCommands } from "./RustCommands";
import { RustFormState } from "./RustForm";

export const RustSubmit = async ({
  Project_Name,
  Git_Setup,
  Path,
  Framework,
  Package_Manager,
  Project_Type,
  Packages,
  Template,
}: RustFormState) => {
  const project_toast = toast("Creating project...");
  const Project = new RustProjectCommands(Project_Name, Path, project_toast);

  const checks = await Project.runInitialChecks(Package_Manager, Git_Setup)

  if (!checks) {
    return
  }

  if (Template) {
    await Project.useTemplate(Template, "rust");
  } else {
    // create outer directory
    if (Package_Manager == "Cargo") {
          await Project.InitializeCargo();
    }
    else {
         await Project.createProjectDirectory();
    }
    

    if (Framework) {
      // TODO rust framework?
    }



    if (Packages && Package_Manager == "Cargo") {
      let packages = Packages.split(",");
      packages = packages.map((pack) => {
        return pack.trim();
      });
      packages.forEach(async (pack) => {
        await Project.addCargoPackage(pack);
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
  };
  await makeThisAsync();
};
