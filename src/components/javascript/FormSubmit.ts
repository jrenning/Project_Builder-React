import {invoke} from "@tauri-apps/api/tauri"
import {Command} from "@tauri-apps/api/shell"
import {formSchema} from "./JavascriptForm"
import { z } from "zod"



type Javascript = z.infer<typeof formSchema>

export const JavascriptSubmit = async (data: Javascript) => {




    

}


