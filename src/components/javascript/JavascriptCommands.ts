import { Command } from "@tauri-apps/api/shell";
import { BaseProjectCommands } from "../shared/sharedCommands";

export class JavascriptProjectCommands extends BaseProjectCommands {
  constructor(name: string, path: string, project_toast: any) {
    super(name, path, project_toast);
  }
  async CreateReactApp(): Promise<boolean> {
    // check for uppercase in project name
    const upperCase = (string: string) => /[A-Z]/.test(string);

    if (upperCase(this.name)) {
      //TODO add proper alert
      alert("Name has a uppercase letter, not allowed in react project name");
      return false;
    }

    const react_command = await new Command(
      "cmd",
      ["/C", "npx", "create-react-app", this.name],
      { cwd: this.path }
    )
      .execute()
      .catch(function (err) {
        console.log(err);
      });

    return !!react_command;
  }

  async AddNPMPackage(
    package_name: string,
  ): Promise<boolean> {
    const npm_command = await new Command("cmd", [
      "/C",
      "npm",
      "i",
      package_name,
    ], {cwd: this.path})
      .execute()
      .catch(function (err) {
        console.log(err);
      });

    return !!npm_command;
  };
}


// TODO add next app, tailwind, etc
// TODO add support for next and create react app templates
