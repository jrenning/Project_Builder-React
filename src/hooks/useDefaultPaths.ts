import { invoke } from "@tauri-apps/api"
import { useEffect, useState } from "react"

type PathResponseData = {
    data: string
    status: boolean
}


export const useDefaultPath = (language: string) => {

    const [defaultPath, setDefaultPath] = useState("")

    useEffect(()=> {
        async function fetchPaths() {
            let response: PathResponseData = await invoke("get_path_data", {key: `${language}_path`})
            setDefaultPath(response.data)
        }
        fetchPaths()
    }, [])



    return defaultPath

}