import { invoke } from "@tauri-apps/api";
import { Command } from "@tauri-apps/api/shell";

export class BaseProjectCommands {
  name: string;
  path: string;
  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
  }
  async createProjectDirectory() {
    // ? move project path to outside the function
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
      return false;
    }

    this.path = this.path + this.name + "\\";

    return !!dir_creation;
  }
  async createFile(file_name: string): Promise<boolean> {
    let file_creation = await invoke("write_file", {
      fileName: file_name,
      dir: this.path,
    })
      .then()
      .catch(function (err) {
        console.log(err);
      });

    return !!file_creation;
  }
  async initializeGit() {
    const git_command = await new Command("git", this.path, {
      cwd: this.path,
    })
      .execute()
      .catch(function (err) {
        console.log(err);
      });

    return !!git_command;
  }
  async createGitIgnore() {
    // TODO add ability to add content to the gitignore
    const gitignore = await invoke("write_file", {
      fileName: ".gitignore",
      dir: this.path,
    })
      .then()
      .catch(function (err) {
        console.log(err);
      });

    return !!gitignore;
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
    );

    return !!github_cli_comamnd;
  }
  async openVsCode() {
    // opens new vscode window in directory, uses path passed by function
    // TODO: add path checking to make sure its legit (could be higher up)
    const command: any = await new Command("cmd", ["/C", "code", "-n", "."], {
      cwd: this.path,
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
  }
}


