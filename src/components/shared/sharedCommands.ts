import { invoke } from "@tauri-apps/api";
import { Command } from "@tauri-apps/api/shell";
import { toast, useToast } from "react-toastify";
import { GitSetup } from "../../schemas/ProjectTypes";
import { handleError } from "../../utility/handleError";



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

  setToastMessage(message: string, noProgress?: boolean) {
    toast.update(this.project_toast, {
      render: message,
      type: toast.TYPE.INFO,
      hideProgressBar: noProgress && true,
      autoClose: noProgress && false
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

  async runProjectCheck (): Promise<boolean> {
    // return false if project already exists, true if it doesn't
    return !await invoke("path_exist",{path: this.path + "\\" + this.name})
  }

  async runSystemCheck(program_commands: string[]): Promise<boolean> {
    // check if program exists in command prompt
    let system_command = await new Command("cmd", ["/C", ...program_commands], {
      cwd: this.path,
    })
      .execute()

    // 0 code is good 1 is fail 
    let result = system_command.code == 1 ? false : true
    return result 
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
    this.setToastMessage("Copying template project...",true)

    // get last part of copy path
    let trailing = path.match(/[^\\]+$/)
    //@ts-ignore
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
      // done here to give git an empty dir to copy into
      await this.createProjectDirectory();
      await this.cloneGitRepo(template_path)
        .then(() => (status = true))
        .catch((err) => (status = false));
    } else {
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

    this.setToastMessage("Cloning template from github...")

    const git_clone = await new Command("git-clone", ["clone", link, "."], {
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
      await this.initializeGit()
      await this.createGitIgnore()
    }
    if (Git_Setup == "Create repo and connect") {
      // TODO add auto push here after gitignore can be updated 
      await this.initializeGit()
      await this.createGithubRepo()
    }
    if (Git_Setup == "Connect to existing repo") {
      //await this.linkToExistingGithub()
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
    const github_cli_command = await new Command(
      "cmd",
      [
        "/C",
        "gh",
        "repo",
        "create",
        this.name,
        "--private",
        "--source=.",
        "--remote=upstream",
      ],
      { cwd: this.path }
    )
      .execute()
      // .then(()=> this.setToastSuccess("New Github repo created successfully."))
      // .catch((err) => {
      //   this.setToastError(`Error: ${err}`);
      // });

    console.log(github_cli_command)

  }

  async linkToExistingGithub(github_link: string) {
    const github_rename = await new Command(
      "github-branch-rename",
      ["branch", "-M", "main"],
      { cwd: this.path }
    )
      .execute()
      .catch((err) => {
        this.setToastError(`Error: ${err}`);
      });

    const link = await new Command(
      "github-link",
      ["remote", "add", "origin", github_link],
      { cwd: this.path }
    )
      .execute()
      .catch((err) => {
        this.setToastError(`Error: ${err}`);
      });

    const push_content = await new Command(
      "github-push-initial",
      ["push", "-u", "origin", "main"],
      { cwd: this.path }
    )
    .execute()
    .then(()=>this.setToastSuccess(`Connected to repo at ${github_link}`))
    .catch((err) => {
      this.setToastError(`Error: ${err}`);
    });

    
  }
}

export const openVsCode = async (path: string) => {
  // opens new vscode window in directory, uses path passed by function
  const command: any = await new Command("cmd", ["/C", "code", "-n", "."], {
    cwd: path,
  })
    .execute()
  // if theres an error show popup error message
  if (command["stderr"]) {
    toast(
      `${command["stderr"]}`
    );
  }
};
