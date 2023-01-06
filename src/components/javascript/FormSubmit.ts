import { overallFormSchemaJavascript } from "./JavascriptForm";
import { z } from "zod";
import { JavascriptProjectCommands } from "./JavascriptCommands";
import { handleError } from "../../utility/handleError";
import { toast, useToast } from "react-toastify";
import { unstable_composeClasses } from "@mui/material";

type Javascript = z.infer<typeof overallFormSchemaJavascript>;

export const JavascriptSubmit = async ({
  Project_Name,
  Git_Setup,
  Github_Repo,
  Package_Manager,
  Framework,
  Path,
  Project_Type,
  Template,
  Packages,
  CSS,
}: Javascript) => {
  // initial notification
  const project_toast = toast("Creating project...");
  const progress_toast = toast("Project being created...", {
    hideProgressBar: true,
    autoClose: false,
  });

  const Project = new JavascriptProjectCommands(
    Project_Name,
    Path,
    project_toast
  );

  // run checks to see if project should be created
  let checks = await Project.runInitialChecks(Package_Manager, Git_Setup);

  // return if checks fail
  if (!checks) {
    return;
  }

  // Handle Templates
  if (Template) {
    Project.useTemplate(Template, "javascript");
  } else if (Project_Type == "New Project") {
    if (Framework == "React (CRA)") {
      let result = await Project.CreateReactApp();
      if (!result) {
        return;
      }
    }
    if (Framework == "Next") {
      let result = await Project.createNextApp();
      if (!result) {
        return;
      }
    }

    if (Framework == "Vanilla") {
      await Project.createProjectDirectory();
      await Project.createFile("app.js");
    }

    if (Git_Setup != "No Setup") {
      Project.GitSetup(Git_Setup, Github_Repo);
    }

    if (Packages) {
      let packages = Packages.split(",");
      packages = packages.map((pack) => {
        return pack.trim();
      });
      packages.forEach(async (pack) => {
        await Project.AddPackage(pack, Package_Manager);
      });
    }

    // handle css
    if (CSS) {
      if (CSS == "Tailwind") {
        await Project.initializeTailwind(Package_Manager);
      } else if (CSS == "Styled Components") {
        await Project.AddPackage("styled-components", Package_Manager);
      }
    }
  }
  // final success message, made async to avoid it happening out of order
  toast.update(progress_toast, {
    type: toast.TYPE.SUCCESS,
    render: `Project ${Project_Name} created at ${Project.path}`,
    autoClose: 5000,
  });
};
