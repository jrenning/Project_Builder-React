import { Command } from "@tauri-apps/api/shell";
import { StringIndexedObject } from "../../schemas/ProjectTypes";
import { BaseProjectCommands } from "../shared/sharedCommands";

export class RustProjectCommands extends BaseProjectCommands {
  constructor(name: string, path: string, project_toast: any) {
    super(name, path, project_toast);
  }

  async runInitialChecks(package_manager: string, git_setup: string) {
    let check_names = [];
    let checks: Promise<boolean>[] = [];

    checks.push(this.runProjectCheck());
    check_names.push("Project already exists");
    checks.push(this.runSystemCheck(["rustc", "--version"]));
    check_names.push("Rust is not installed");

    if (package_manager == "Cargo") {
      checks.push(this.runSystemCheck(["cargo", "-V"]));
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

  async InitializeCargo(): Promise<boolean> {
    const cargo_command = await new Command("cargo-new", ["new", this.name], {
      cwd: this.path,
    })
      .execute()
      .catch(function (err) {
        console.log(err);
      });
    // alert if project not created
    //@ts-ignore
    if (cargo_command.code == 101) {
      this.setToastError(
        " Cargo project could not be created / Project already exists"
      );
      return false;
    }
    this.setToastSuccess("Cargo initialized correctly");
    // set class path as cargo creates an outer directory during initialization
    this.path = this.path + "\\" + this.name + "\\";
    return true;
  }

  async addCargoPackage(package_name: string) {
    let cargo_command = await new Command("cargo-add", ["add", package_name], {
      cwd: this.path,
    }).execute();
    //@ts-ignore
    if (cargo_command.code == 101) {
      this.setToastError(`Package ${package_name} could not be added`);
    } else {
      this.setToastSuccess(`Package ${package_name} added successfully`);
    }
  }
}
