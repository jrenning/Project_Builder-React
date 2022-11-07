import { overallFormSchemaJavascript } from "./JavascriptForm";
import { z } from "zod";
import { JavascriptProjectCommands } from "./JavascriptCommands";
import { handleError } from "../../utility/handleError";
import { toast, useToast } from "react-toastify";

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
}: Javascript) => {
  const project_toast = toast("Creating project...");
  const Project = new JavascriptProjectCommands(
    Project_Name,
    Path,
    project_toast
  );

  console.log(Framework);

  if (Template) {
    Project.useTemplate(Template, "Javascript");
  } else if (Project_Type == "New Project") {
    if (Framework == "React (CRA)") {
      await Project.CreateReactApp();
      return;
    }
    if (Framework == "Next") {
      await Project.createNextApp();
    }

    if (Framework == "Vanilla") {
      await Project.createProjectDirectory();

      await Project.createFile("app.js");
    }

    if (Git_Setup != "No Setup") {
      Project.GitSetup(Git_Setup);
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
