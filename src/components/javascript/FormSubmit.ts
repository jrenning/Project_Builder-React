import { formSchema } from "./JavascriptForm";
import { z } from "zod";
import { JavascriptProjectCommands } from "./JavascriptCommands";
import { handleError } from "../../utility/handleError";

type Javascript = z.infer<typeof formSchema>;

export const JavascriptSubmit = async ({
  Project_Name,
  Git_Setup,
  Github_Link,
  React,
}: Javascript, setPath: any) => {
  const Project = new JavascriptProjectCommands(
    Project_Name,
    "C:\\Projects\\Javascript\\"
  );

  if (React) {
    await handleError(Project.CreateReactApp(), "Yeah R", "Whoops R");
    return;
  }

  await handleError(Project.createProjectDirectory(), "Yeah", "Whoops");

  await handleError(Project.createFile("test.txt"), "Yeah", "Whoops");

  if (Git_Setup) {
    await handleError(Project.initializeGit(), "Git was initialized","git i err");
    await handleError(Project.createGitIgnore(), "Gitignore was created", "gitignore err");
  }

  if (Github_Link) {
    await handleError(Project.linkToExistingGithub(Github_Link),"Github was linked", "github err");
  }

  setPath(Project.path)

};
