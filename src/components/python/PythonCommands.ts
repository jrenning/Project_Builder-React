import { Command } from "@tauri-apps/api/shell";
import { BaseProjectCommands } from "../shared/sharedCommands";

export class PythonProjectCommands extends BaseProjectCommands {
  constructor(name: string, path: string, project_toast: any) {
    super(name, path, project_toast);
  }
  async CreateVenvEnv(): Promise<boolean> {
    // creates env in python using venv
    // TODO add check for not having venv
    this.setToastMessage("Creating venv...")
    const env_command = await new Command("make_env", this.path, {
      cwd: this.path,
    })
      .execute()
      .catch((err) => {
        this.setToastError(err)
      });

      this.setToastSuccess("Venv was created successfully")


    return !!env_command;
  }

  async InitialzePoetry() {
    // initializes poetry
    const poetry_command = await new Command(
      "cmd",
      ["/C", "poetry", "init", "-n"],
      { cwd: this.path }
    )
      .execute()
      .catch(function (err) {
        console.log(err);
      });

    return !!poetry_command;
  }
  async AddPoetryPackage(package_name: string) {
    // TODO add multiple packages at once to speed it up
    const install_command = await new Command(
      "cmd",
      ["/C", "poetry", "add", package_name],
      {
        cwd: this.path,
      }
    )
      .execute()
      .catch(function (err) {
        console.log(err);
      });

    return !!install_command;
  };
}




