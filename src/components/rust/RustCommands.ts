import { Command } from "@tauri-apps/api/shell";
import { BaseProjectCommands } from "../shared/sharedCommands";

export class RustProjectCommands extends BaseProjectCommands {
  constructor(name: string, path: string, project_toast: any) {
    super(name, path, project_toast);
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
    return true;
  }

  async addCargoPackage(package_name: string) {
    await new Command("cargo-add", ["add", package_name], {
      cwd: this.path,
    })
      .execute()
      .then((_) => {
        this.setToastSuccess("Cargo initialized correctly");
        return true;
      })
      .catch((_err) => {
        this.setToastError(
          `Cargo package ${package_name} could not be installed`
        );
        return false;
      });
  }
}
