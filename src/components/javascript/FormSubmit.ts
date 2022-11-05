import { overallFormSchemaJavascript } from "./JavascriptForm";
import { z } from "zod";
import { JavascriptProjectCommands } from "./JavascriptCommands";
import { handleError } from "../../utility/handleError";
import { toast, useToast } from "react-toastify";

type Javascript = z.infer<typeof overallFormSchemaJavascript>;

export const JavascriptSubmit = async (
  {
    Project_Name,
    Git_Setup,
    Github_Repo,
    Package_Manager,
    Framework,
    Path,
    Project_Type,
    Template,
  }: Javascript,
  setPath: any
) => {
  const project_toast = toast("Creating project...");
  const Project = new JavascriptProjectCommands(
    Project_Name,
    Path,
    project_toast
  );

  if (Template) {
    Project.useTemplate(Template, "Javascript");
  } else if (Project_Type == "New Project") {
    if (Framework == "React (CRA)") {
      await handleError(Project.CreateReactApp(), "Yeah R", "Whoops R");
      return;
    }

    await handleError(Project.createProjectDirectory(), "Yeah", "Whoops");

    await handleError(Project.createFile("app.js"), "Yeah", "Whoops");

    if (Git_Setup != "No Setup") {
      Project.GitSetup(Git_Setup);
    }
  }

  

  setPath(Project.path);
};
