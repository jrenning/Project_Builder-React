import { invoke } from "@tauri-apps/api"
import { useEffect, useState } from "react"

type PathResponseData = {
    data: string
    status: boolean
}

/**
 * 
 * @param language the programming language the path is being set for 
 * @param updater an updater that should change when the paths need to be updated, 
 * ex. called when using the update default path form 
 * @returns 
 *          defaultPath = the default path for the language 
 * 
 */
export const useDefaultPath = (language: string, updater?: boolean) => {

    const [defaultPath, setDefaultPath] = useState("")

    useEffect(()=> {
        async function fetchPaths() {
            let response: PathResponseData = await invoke("get_path_data", {key: `${language}_path`})
            setDefaultPath(response.data)
        }
        fetchPaths()
    }, [updater])



    return defaultPath

}