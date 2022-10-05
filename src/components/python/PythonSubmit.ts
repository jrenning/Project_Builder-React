import { formSchema } from "./PythonForm";
import { z } from "zod";
import { PythonProjectCommands } from "./PythonCommands";
import { handleError } from "../../utility/handleError";

type Python = z.infer<typeof formSchema>;



export const PythonSubmit = async (
  { Project_Name, Git_Setup, Github_Link, Env, Packages }: Python,
  setPath: any
) => {

  console.log(Env)
  return;
  const Project = new PythonProjectCommands(
    Project_Name,
    "C:\\Projects\\Python\\"
  );

  if (Env) {
    if (Env == "Poetry") {
      await handleError(Project.InitialzePoetry(), "Poetry initialized...", "Poetry failed to initialize...")
    }
    else if (Env == "Venv") {
      await handleError(Project.CreateVenvEnv(), "Venv env created...", "Venv env could not be created...")
    }
  }

  if (Packages) {
    // TODO add split of packages and adding using poetry
  }

  await handleError(Project.createProjectDirectory(), "Yeah", "Whoops");

  await handleError(Project.createFile("test.txt"), "Yeah", "Whoops");

  if (Git_Setup) {
    await handleError(
      Project.initializeGit(),
      "Git was initialized",
      "git i err"
    );
    await handleError(
      Project.createGitIgnore(),
      "Gitignore was created",
      "gitignore err"
    );
  }

  if (Github_Link) {
    await handleError(
      Project.linkToExistingGithub(Github_Link),
      "Github was linked",
      "github err"
    );
  }

  setPath(Project.path);
};
