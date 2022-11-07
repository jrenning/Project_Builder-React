import { Command } from "@tauri-apps/api/shell";
import { BaseProjectCommands } from "../shared/sharedCommands";

export class JavascriptProjectCommands extends BaseProjectCommands {
  constructor(name: string, path: string, project_toast: any) {
    super(name, path, project_toast);
  }

  checkUppercase(): boolean {
    // check for uppercase in project name
    const upperCase = (string: string) => /[A-Z]/.test(string);

    if (upperCase(this.name)) {
      this.setToastError(
        "Name has a uppercase letter, not allowed in npm project name"
      );
      return false;
    }
    return true
  }
  async CreateReactApp(): Promise<boolean> {
    // check for uppercase in project name
    const upperCase = (string: string) => /[A-Z]/.test(string);

    this.setToastMessage("Creating CRA Project...");

    if (!this.checkUppercase) {
      return false
    }

    const react_command = await new Command(
      "cmd",
      ["/C", "npx", "create-react-app", this.name],
      { cwd: this.path }
    )
      .execute()
      .catch((err) => {
        this.setToastError(`Create react app failed, from ${err}`);
      });

    this.setToastSuccess("Created react app");
    return !!react_command;
  }

  async createNextApp(): Promise<boolean> {
    // assume typescript for now
    // ? add option for non typescript
    // check for uppercase name 
    if (!this.checkUppercase) {
      return false;
    }

    this.setToastMessage("Creating next app...");
    const next_command = await new Command(
      "cmd",
      ["/C", "npx", "create-next-app@latest", this.name, "--typescript", "--eslint", "--use-npm"],
      { cwd: this.path }
    )
      .execute()
      .catch((err) => {
        this.setToastError(`Next app couldn't be created, see ${err}`);
        return false;
      });
    this.setToastSuccess("Created next app");
    return true;
  }

  async AddPackage(package_name: string, package_manager: string): Promise<boolean> {
    const npm_command = await new Command(
      "cmd",
      ["/C", package_manager, "i", package_name],
      { cwd: this.path }
    )
      .execute()
      .catch((err) => {
        this.setToastError(`${package_name} couldn't be installed, see ${err}`);
        return false;
      });
    this.setToastSuccess(`${package_name} installed`);
    return true;
  }

  async initializeTailwind() {
    this.setToastMessage("Adding tailwind...")
    const tailwind_command = await new Command(
      "cmd",
      ["/C", "npm", "install", "-D", "tailwindcss", "postcss", "autoprefixer"],
      { cwd: this.path }
    )
      .execute()
      .catch((err) => {
        this.setToastError(`Tailwind couldn't be installed, see ${err}`);
        return false;
      });
    const tailwind_init = await new Command(
      "cmd",
      ["/C", "npx", "tailwindcss", "init", "-p"],
      { cwd: this.path }
    )
      .execute()
      .catch((err) => {
        this.setToastError(`Tailwind couldn't be installed, see ${err}`);
        return false;
      });
      this.setToastSuccess("Tailwind was added")
  }
}

// TODO add support for next and create react app templates
