import { PythonFormState } from "./PythonForm";
import { z } from "zod";
import { PythonProjectCommands } from "./PythonCommands";
import { handleError } from "../../utility/handleError";

export const PythonSubmit = async (
  {
    Project_Name,
    Git_Setup,
    Path,
    Framework,
    Package_Manager,
    Project_Type,
    Packages,
  }: PythonFormState,
  setPath: any
) => {
  const Project = new PythonProjectCommands(
    Project_Name,
    "C:\\Projects\\Python\\"
  );

  if (Package_Manager) {
    if (Package_Manager == "Poetry") {
      await handleError(
        Project.InitialzePoetry(),
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

  if (Packages) {
    // TODO add split of packages and adding using poetry
  }

  await handleError(Project.createProjectDirectory(), "Yeah", "Whoops");

  await handleError(Project.createFile("test.txt"), "Yeah", "Whoops");

  if (Git_Setup == "Initialize Git") {
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

  // if (Git_Setup == "Connect to existing repo") {
  //   await handleError(
  //     Project.linkToExistingGithub(),
  //     "Github was linked",
  //     "github err"
  //   );
  }

  //setPath(Project.path);

