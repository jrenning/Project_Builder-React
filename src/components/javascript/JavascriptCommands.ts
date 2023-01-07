import { Command } from "@tauri-apps/api/shell";
import { GitSetup, StringIndexedObject } from "../../schemas/ProjectTypes";
import { BaseProjectCommands } from "../shared/sharedCommands";

type JavascriptPackageManager = "npm" | "yarn" | "None";

export class JavascriptProjectCommands extends BaseProjectCommands {
  constructor(name: string, path: string, project_toast: any) {
    super(name, path, project_toast);
  }

  async runInitialChecks(
    package_manager: JavascriptPackageManager,
    git_setup: GitSetup
  ): Promise<boolean> {
    let check_names = [];
    let checks: Promise<boolean>[] = [];

    checks.push(this.runProjectCheck());
    check_names.push("Project already exists");

    if (package_manager == "npm") {
      checks.push(this.runSystemCheck(["poetry", "--version"]));
      check_names.push("npm is not installed");
    }
    if (package_manager == "yarn") {
      checks.push(this.runSystemCheck(["yarn", "-V"]));
      check_names.push("Yarn is not installed");
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

  checkUppercase(): boolean {
    // check for uppercase in project name
    const upperCase = (string: string) => /[A-Z]/.test(string);

    if (upperCase(this.name)) {
      this.setToastError(
        "Name has a uppercase letter, not allowed in npm project name"
      );
      return false;
    }
    return true;
  }
  async CreateReactApp(): Promise<boolean> {
    this.setToastMessage("Creating CRA Project...");

    // check for uppercase letter
    if (!this.checkUppercase) {
      return false;
    }

    await new Command("cmd", ["/C", "npx", "create-react-app", this.name], {
      cwd: this.path,
    })
      .execute()
      .catch((err) => {
        this.setToastError(`Create react app failed, from ${err}`);
        return false;
      });

    this.setToastSuccess("Created react app");

    //set new path
    this.path = this.path + "\\" + this.name + "\\";
    return true;
  }

  async createNextApp(): Promise<boolean> {
    // assume typescript for now
    // ? add option for non typescript
    // check for uppercase name
    if (!this.checkUppercase()) {
      return false;
    }

    this.setToastMessage("Creating next app...");
    let test = await new Command(
      "cmd",
      [
        "/C",
        "npx",
        "create-next-app@latest",
        this.name,
        "--typescript",
        "--eslint",
        "--use-npm",
      ],
      { cwd: this.path }
    )
      .execute()
      .catch((err) => {
        this.setToastError(`Next app couldn't be created, see ${err}`);
        return false;
      });

    this.setToastSuccess("Created next app");

    // set new path
    this.path = this.path + "\\" + this.name + "\\";
    return true;
  }

  async createT3App(
    Package_Manager: JavascriptPackageManager
  ): Promise<boolean> {
    // check for uppercase name
    if (!this.checkUppercase()) {
      return false;
    }

    this.setToastMessage("Creating T3 app...");
    if (Package_Manager == "npm") {
      let test = await new Command(
        "cmd",
        ["/C", "npm", "create-t3-app@latest", this.name, "-y"],
        { cwd: this.path }
      )
        .execute()
        .catch((err) => {
          this.setToastError(`T3 app couldn't be created, see ${err}`);
          return false;
        });
    } else if (Package_Manager == "yarn") {
      let test = await new Command(
        "cmd",
        ["/C", "yarn", "create", "t3-app", this.name, "-y"],
        { cwd: this.path }
      )
        .execute()
        .catch((err) => {
          this.setToastError(`T3 app couldn't be created, see ${err}`);
          return false;
        });
    }

    this.setToastSuccess("Created T3 app");

    // set new path
    this.path = this.path + "\\" + this.name + "\\";
    return true;
  }
  async AddPackage(
    package_name: string,
    package_manager: string
  ): Promise<boolean> {
    // run init command with no input (won't do anything on project that already has a package.json)
    await new Command("cmd", ["/C", package_manager, "init", "-y"], {
      cwd: this.path,
    })
      .execute()
      .then(() => console.log("In first"))
      .catch((err) => {
        this.setToastError(
          `${package_manager} couldn't be initialized, see ${err}`
        );
        return false;
      });

    await new Command("cmd", ["/C", package_manager, "i", package_name], {
      cwd: this.path,
    })
      .execute()
      .then(() => console.log("In second"))
      .catch((err) => {
        this.setToastError(`${package_name} couldn't be installed, see ${err}`);
        return false;
      });
    this.setToastSuccess(`${package_name} installed`);
    return true;
  }

  async initializeTailwind(Package_Manager: JavascriptPackageManager) {
    this.setToastMessage("Adding tailwind...");
    await new Command(
      "cmd",
      [
        "/C",
        Package_Manager,
        "install",
        "-D",
        "tailwindcss",
        "postcss",
        "autoprefixer",
      ],
      { cwd: this.path }
    )
      .execute()
      .catch((err) => {
        this.setToastError(`Tailwind couldn't be installed, see ${err}`);
        return false;
      });
    await new Command("cmd", ["/C", "npx", "tailwindcss", "init", "-p"], {
      cwd: this.path,
    })
      .execute()
      .catch((err) => {
        this.setToastError(`Tailwind couldn't be installed, see ${err}`);
        return false;
      });
    this.setToastSuccess("Tailwind was added");
  }
}
