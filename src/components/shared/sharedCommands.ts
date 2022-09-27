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
  async createFile(file_name: string): Promise<unknown>  {
    let file_creation = invoke("write_file", {
      fileName: file_name,
      dir: this.path,
    }).then().catch(function(err) {console.log(err)})

    //rust returns true or false, no !! needed
    return file_creation
    
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
    )
      .execute()
      .catch(function (err) {
        console.log(err);
      });;

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

      const link = await new Command("github-link", [
        "remote",
        "add",
        "origin",
        github_link,
      ], {cwd: this.path})
        .execute()
        .catch(function (err) {
          console.log(err);
        });

    const push_content = await new Command("github-push-initial", [
      "push",
      "-u",
      "origin",
      "main",
    ], {cwd: this.path})
      .execute()
      .catch(function (err) {
        console.log(err);
      });

      return !!push_content
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
  }
