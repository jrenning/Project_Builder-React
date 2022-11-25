import { Command } from "@tauri-apps/api/shell";
import { toast } from "react-toastify";
import { GitSetup, StringIndexedObject } from "../../schemas/ProjectTypes";
import { BaseProjectCommands } from "../shared/sharedCommands";

type PythonPackageManager = "Venv" | "Poetry" | "None";
export class PythonProjectCommands extends BaseProjectCommands {
  constructor(name: string, path: string, project_toast: any) {
    super(name, path, project_toast);
  }

  async runInitialChecks(
    package_manager: PythonPackageManager,
    git_setup: GitSetup
  ): Promise<boolean> {
    let check_names = [];
    let checks: Promise<boolean>[] = [];

    checks.push(this.runProjectCheck());
    check_names.push("Project already exists");
    checks.push(this.runSystemCheck(["python", "-V"]));
    check_names.push("Python is not installed");

    if (package_manager == "Poetry") {
      checks.push(this.runSystemCheck(["poetry", "--version"]));
      check_names.push("Poetry is not installed");
    }
    if (git_setup != "No Setup") {
      checks.push(this.runSystemCheck(["git", "--version"]));
      check_names.push("Git is not installed");
    }
    if (git_setup == "Create repo and connect") {
      checks.push(this.runSystemCheck(["gh"]));
      check_names.push("Github cli is not installed");
    }

    let values = await Promise.all(checks);

    let result: StringIndexedObject<boolean> = Object.assign(
      //@ts-ignore
      ...check_names.map((k, i) => ({ [k]: values[i] }))
    );


    for (const [key, value] of Object.entries(result)) {
      if (!value) {
        this.setToastError(`${key}`);
        return false;
      }
    }
    return true;
  }

  async CreateVenvEnv(): Promise<boolean> {
    // creates env in python using venv
    this.setToastMessage("Creating venv...");
    const env_command = await new Command("make_env", this.path, {
      cwd: this.path,
    })
      .execute()
      .catch((err) => {
        this.setToastError(err);
      });

    this.setToastSuccess("Venv was created successfully");

    return !!env_command;
  }

  async InitializePoetry() {
    // initializes poetry
    this.setToastMessage("Adding Poetry...");
    const poetry_command = await new Command(
      "cmd",
      ["/C", "poetry", "init", "-n"],
      { cwd: this.path }
    )
      .execute()
      .catch((err) => {
        this.setToastError("Poetry couldn't be initialized");
      });

    this.setToastSuccess("Poetry was initialized");

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
      .then((_) => this.setToastSuccess(`${package_name} installed`))
      .catch((err) => {
        this.setToastError(`${package_name} could not be installed`);
      });
  }

  async AddVenvPackage(package_name: string) {
    console.log("In venv add");
    const venv_pack = await new Command(
      "cmd",
      [
        "/C",
        "env\\Scripts\\activate.bat",
        "&&",
        "pip",
        "install",
        package_name,
      ],
      {
        cwd: this.path,
      }
    )
      .execute()
      .then((_) => this.setToastSuccess(`${package_name} installed`))
      .catch((err) => {
        this.setToastError(`${package_name} could not be installed`);
      });
  }

  async createDjangoProject() {
    // TODO make work with venv
    this.setToastMessage("Creating django project...");
    // add django package
    await this.AddPoetryPackage("django");

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
    console.log(django_command);
    this.setToastSuccess(`Django project created`);
  }

  async createFlaskProject() {
    // TODO add general template?
    this.setToastMessage("Creating flask project...");
    await this.AddPoetryPackage("Flask").catch((err) => {
      this.setToastError("Flask project couldn't be created");
      return;
    });
    this.setToastSuccess("Flask project created");
  }
}
