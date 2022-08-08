import {invoke} from "@tauri-apps/api/tauri"
import {Command} from "@tauri-apps/api/shell"

type Javascript = {
    project_name: string
    github_link: string
    react: boolean
    git_setup: boolean
}

export const JavascriptSubmit = async (data: Javascript) => {
    console.log('Hello')
    const vscode_open = await new Command("vscode-open", [
      "-n",
      "C:Users\\jacka\\OneDrive\\Desktop\\JavaScript\\calculator",
    ])
    vscode_open.on("error", (error) => console.error(`vscode_open error: "${error}"`));
    vscode_open.stdout.on("data", (line) =>
      console.log(`vscode_open stdout: "${line}"`)
    );
    vscode_open.stderr.on("data", (line) =>
      console.log(`vscode_open stderr: "${line}"`)
    );
    console.log(vscode_open)

    const child = await vscode_open.spawn();
    console.log("pid:", child.pid);
}