import { invoke } from "@tauri-apps/api";
import { Command } from "@tauri-apps/api/shell";
import { toast, useToast } from "react-toastify";
import { handleError } from "../../utility/handleError";

type GitSetup =
  | "No Setup"
  | "Initialize Git"
  | "Create repo and connect"
  | "Connect to existing repo";

export class BaseProjectCommands {
  name: string;
  path: string;
  project_toast: any;
  constructor(name: string, path: string, project_toast: any) {
    this.name = name;
    this.path = path;
    this.project_toast = project_toast;
  }

  /* Toast Update Methods*/

  setToastMessage(message: string) {
    toast.update(this.project_toast, {
      render: message,
      type: toast.TYPE.INFO,
    });
  }

  setToastSuccess(message?: string) {
    toast.update(this.project_toast, {
      type: toast.TYPE.SUCCESS,
      render: message && message,
    });
  }

  setToastError(message?: string) {
    toast.update(this.project_toast, {
      type: toast.TYPE.ERROR,
      render: message && message,
    });
  }

  async createProjectDirectory() {
    // makes project directory and returns new path to it
    const dir_creation = await invoke("make_dir", {
      dir: this.name,
      path: this.path,
    })
      .then()
      .catch(function (err) {
        console.log(err);
      });

    if (!!dir_creation == false) {
      this.setToastError("Project directory couldn't be created");
      return false;
    }

    this.path = this.path + "\\" + this.name + "\\";
    console.log(this.path);
    this.setToastMessage("Project Directory created successfully...");

    return !!dir_creation;
  }
  async createFile(file_name: string): Promise<unknown> {
    let file_creation = await invoke("write_file", {
      fileName: file_name,
      dir: this.path,
    })
      .then()
      .catch(function (err) {
        console.log(err);
      });

    file_creation
      ? this.setToastMessage(`${file_name} was created...`)
      : this.setToastError(`${file_name} couldn't be created`);

    //rust returns true or false, no !! needed
    return file_creation;
  }

  async copyDirectory(path: string): Promise<boolean> {
    // copy directory to chosen path location

    // get last part of copy path
    let trailing = path.match(/[^\\]+$/)
    let path_to_rename = trailing[0]

    await invoke("copy_directory", {
      copyPath: path,
      destinationPath: this.path,
    })
      .then()
      .catch((_err) => {
        return false;
      });
    // rename copied directory to project name
    await new Command("cmd", ["/C", "ren", path_to_rename, this.name], {
      cwd: this.path,
    })
      .execute()
      .catch((err) => {
        this.setToastError(`Error: ${err}`);
      });
    return true;
  }

  async useTemplate(template: string, language: string): Promise<boolean> {
    let template_path: string = await invoke("get_template_path", {
      name: template,
      language: language,
    });
    console.log(template_path)
    let status: boolean = false;
    if (template_path.includes("https://github.com")) {
      await this.cloneGitRepo(template_path)
        .then(() => (status = true))
        .catch((err) => (status = false));
    } else {
      console.log("got to copy")
      await this.copyDirectory(template_path)
        .then(() => (status = true))
        .catch((err) => {
          status = false
          console.log(err)
        });
    }

    status
      ? this.setToastSuccess(`Template ${template} successfully copied`)
      : this.setToastError(`Template ${template} could not be copied`);

    return status;
  }

  async cloneGitRepo(link: string): Promise<boolean> {
    const git_clone = await new Command("git-clone", ["clone", link], {
      cwd: this.path,
    })
      .execute()
      .catch((err) => {
        this.setToastError(`Error: ${err}`);
        return false;
      });
    this.setToastSuccess(`Repo from ${link} successfully cloned`);
    return true;
  }

  async initializeGit() {
    const git_command = await new Command("git", this.path, {
      cwd: this.path,
    })
      .execute()
      .catch((err) => {
        this.setToastError(`Error: ${err}`);
      });

    this.setToastSuccess("Git initialized");

    return !!git_command;
  }
  async createGitIgnore() {
    // TODO add ability to add content to the gitignore
    const gitignore = await invoke("write_file", {
      fileName: ".gitignore",
      dir: this.path,
    })
      .then()
      .catch((err) => {
        this.setToastError("Git ignore could not be created");
      });
    this.setToastSuccess("Git ignore created");
    return !!gitignore;
  }

  async GitSetup(Git_Setup: GitSetup) {
    if (Git_Setup == "Initialize Git") {
      await handleError(
        this.initializeGit(),
        "Git was initialized",
        "git i err"
      );
      await handleError(
        this.createGitIgnore(),
        "Gitignore was created",
        "gitignore err"
      );
    }
    if (Git_Setup == "Create repo and connect") {
      // TODO
    }
    if (Git_Setup == "Connect to existing repo") {
    }
  }

  async addCommitGit() {
    const git_add_command = await new Command(
      "git-add-all-commit",
      ["commit", "-am", "Initial commit from Project Builder"],
      {
        cwd: this.path,
      }
    )
      .execute()
      .catch(function (err) {
        console.log(err);
      });

    return !!git_add_command;
  }
  async createGithubRepo() {
    const github_cli_comamnd = await new Command(
      "github_cli_comamnd",
      [
        "create",
        "repo",
        this.name,
        "--private",
        "--source=.",
        "--remote=upstream",
      ],
      { cwd: this.path }
    )
      .execute()
      .catch(function (err) {
        console.log(err);
      });

    return !!github_cli_comamnd;
  }

  async linkToExistingGithub(github_link: string) {
    const github_rename = await new Command(
      "github-branch-rename",
      ["branch", "-M", "main"],
      { cwd: this.path }
    )
      .execute()
      .catch(function (err) {
        console.log(err);
      });

    const link = await new Command(
      "github-link",
      ["remote", "add", "origin", github_link],
      { cwd: this.path }
    )
      .execute()
      .catch(function (err) {
        console.log(err);
      });

    const push_content = await new Command(
      "github-push-initial",
      ["push", "-u", "origin", "main"],
      { cwd: this.path }
    )
      .execute()
      .catch(function (err) {
        console.log(err);
      });

    return !!push_content;
  }
}

export const openVsCode = async (path: string) => {
  // opens new vscode window in directory, uses path passed by function
  // TODO: add path checking to make sure its legit (could be higher up)
  const command: any = await new Command("cmd", ["/C", "code", "-n", "."], {
    cwd: path,
  })
    .execute()
    .catch(function (err) {
      console.log(err);
    });
  // if theres an error show popup error message
  // TODO change alert to a proper popup
  if (command["stderr"]) {
    alert(
      "VSCode CLI wasn't found, make sure you can run the code command in your terminal"
    );
  }
};
