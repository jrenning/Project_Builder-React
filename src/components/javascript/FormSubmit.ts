import { overallFormSchemaJavascript } from "./JavascriptForm";
import { z } from "zod";
import { JavascriptProjectCommands } from "./JavascriptCommands";
import { handleError } from "../../utility/handleError";
import {  toast, useToast } from "react-toastify";

type Javascript = z.infer<typeof overallFormSchemaJavascript>;

export const JavascriptSubmit = async ({
  Project_Name,
  Git_Setup,
  Github_Repo,
  Package_Manager,
  Framework,
  Path,
  Project_Type,
}: Javascript, setPath: any) => {
  const Project = new JavascriptProjectCommands(
    Project_Name,
    "C:\\Projects\\Javascript\\"
  );


  console.log("here")
  toast.success("This is good")

  return 

  if (Framework == "React (CRA)") {
    await handleError(Project.CreateReactApp(), "Yeah R", "Whoops R");
    return;
  }

  await handleError(Project.createProjectDirectory(), "Yeah", "Whoops");

  await handleError(Project.createFile("test.txt"), "Yeah", "Whoops");

  if (Git_Setup) {
    await handleError(Project.initializeGit(), "Git was initialized","git i err");
    await handleError(Project.createGitIgnore(), "Gitignore was created", "gitignore err");
  }

  if (Github_Repo) {
    await handleError(Project.linkToExistingGithub(Github_Repo),"Github was linked", "github err");
  }

  setPath(Project.path)

};
