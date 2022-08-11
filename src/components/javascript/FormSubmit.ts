import {invoke} from "@tauri-apps/api/tauri"
import {Command} from "@tauri-apps/api/shell"
import {formSchema} from "./JavascriptForm"
import { z } from "zod"


type Javascript = z.infer<typeof formSchema>

export const JavascriptSubmit = async (data: Javascript) => {

    const command: any = await new Command("cmd", ["/C","cod", "-n", "."], {
      cwd: "C:\\Projects\\Flutter\\learning_dart",
    })
      .execute(
      )
      .catch(function (err) {
        console.log(err);
      });;

    if (command["stderr"]) {
        alert("VSCode CLI wasn't found, make sure you can run the code command in your terminal")
    }

    

}


