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
    await new Command("make_env", this.path, {
      cwd: this.path,
    })
      .execute()
      .catch((err) => {
        this.setToastError(err);
        return false;
      });

    this.setToastSuccess("Venv was created successfully");

    return true;
  }

  async InitializePoetry() {
    // initializes poetry
    this.setToastMessage("Adding Poetry...");
    await new Command("cmd", ["/C", "poetry", "init", "-n"], { cwd: this.path })
      .execute()
      .catch((err) => {
        this.setToastError("Poetry couldn't be initialized");
        return false;
      });

    this.setToastSuccess("Poetry was initialized");

    return true;
  }
  async AddPoetryPackage(package_name: string): Promise<boolean> {
    // TODO add multiple packages at once to speed it up
    await new Command("cmd", ["/C", "poetry", "add", package_name], {
      cwd: this.path,
    })
      .execute()
      .then((_) => this.setToastSuccess(`${package_name} installed`))
      .catch((_err: any) => {
        this.setToastError(`${package_name} could not be installed`);
        return false;
      });
    return true;
  }

  async AddVenvPackage(package_name: string): Promise<boolean> {
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
        return false;
      });
    return true;
  }

  async createDjangoProject(
    package_manager: PythonPackageManager
  ): Promise<boolean> {
    this.setToastMessage("Creating django project...");
    if (package_manager == "Poetry") {
      await this.AddPoetryPackage("django");

      await new Command(
        "cmd",
        ["/C", "poetry", "run", "django-admin", "startproject", this.name],
        {
          cwd: this.path,
        }
      )
        .execute()
        .catch((err) => {
          this.setToastError(`Django project could not be created`);
          return false;
        });
    }
    if (package_manager == "Venv") {
      await this.AddVenvPackage("django");
      await new Command(
        "cmd",
        [
          "/C",
          "env\\Scripts\\activate.bat",
          "&&",
          "django-admin",
          "startproject",
          this.name,
        ],
        {
          cwd: this.path,
        }
      )
        .execute()
        .catch((err) => {
          this.setToastError(`Django project could not be created`);
          return false;
        });
    }

    this.setToastSuccess(`Django project created`);
    return true;
  }

  async createFlaskProject(package_manager: PythonPackageManager): Promise<boolean> {
    this.setToastMessage("Creating flask project...");
    if (package_manager == "Poetry") {
      await this.AddPoetryPackage("Flask").catch((err) => {
        this.setToastError("Flask project couldn't be created");
        return false;
      });
    }
    else if (package_manager == "Venv") {
      await this.AddVenvPackage("Flask").catch((_err) => {
        this.setToastError("Flask project couldn't be created");
        return false;
      })
    }
    this.setToastSuccess("Flask project created");
    return true;
  }
}
