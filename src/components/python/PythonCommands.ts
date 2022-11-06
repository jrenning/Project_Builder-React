import { Command } from "@tauri-apps/api/shell";
import { toast } from "react-toastify";
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

  async InitializePoetry() {
    // initializes poetry
    this.setToastMessage("Adding Poetry...")
    const poetry_command = await new Command(
      "cmd",
      ["/C", "poetry", "init", "-n"],
      { cwd: this.path }
    )
      .execute()
      .catch((err) => {
        this.setToastError("Poetry couldn't be initialized")
      });

      this.setToastSuccess("Poetry was initialized")

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
      .catch((err) => {
        this.setToastError(`${package_name} could nor be installed`)
      });
      this.setToastSuccess(`${package_name} installed`)
    return !!install_command;
  };


  async createDjangoProject() {
    // TODO make work with venv 
    this.setToastMessage("Creating django project...")
    // add django package 
    await this.AddPoetryPackage("django")


    const django_command = await new Command(
      "cmd",
      ["/C", "poetry", "run", "django-admin", "startproject", this.name],
      {
        cwd: this.path,
      }
    )
      .execute()
      .catch((err) => {
        this.setToastError(`Django project could not be created`);
      });
      console.log(django_command)
    this.setToastSuccess(`Django project created`);

  }

  async createFlaskProject() {
    // TODO add general template?
    this.setToastMessage("Creating flask project...")
    await this.AddPoetryPackage("Flask").catch((err)=> {
      this.setToastError("Flask project couldn't be created")
      return
    })
    this.setToastSuccess("Flask project created")
  }
}




