export type GitSetup =
  | "No Setup"
  | "Initialize Git"
  | "Create repo and connect"
  | "Connect to existing repo";


export type StringIndexedObject<T> = {
  [key: string]: T
}

