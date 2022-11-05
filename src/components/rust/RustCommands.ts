import { Command } from "@tauri-apps/api/shell";
import { BaseProjectCommands } from "../shared/sharedCommands";


export class RustProjectCommands extends BaseProjectCommands {
  constructor(name: string, path: string, project_toast: any) {
    super(name, path, project_toast);
  }
  async InitializeCargo() {
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
      alert(" Cargo project could not be created / Project already exists");
      return;
    }
  };
}



