
import React, { useState } from "react";
import { Form, useForm } from "../Form";
import { Input } from "../Input";
import { z } from "zod";
import { Checkbox } from "../Checkbox";
import SubmitButton from "../SubmitButton";
import { PythonSubmit } from "./PythonSubmit";
import VSCodeButton from "../VSCodeButton";
import {SelectBox} from "../shared/SelectBox";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form"

export const formSchema = z.object({
  Project_Name: z.string().min(1, "Please enter a name"),
  Github_Link: z.string().optional(),
  Env: z.string().optional(),
  Packages: z.string().optional(),
  Git_Setup: z.boolean().optional()
});



export const formSchema2 = z.object({
  Framework: z.string(),
  Package_Manager: z.string(),
  Packages: z.string(),
  Git_Setup: z.string(),

})

export type PythonFormState = {
  step1: boolean;
  step2: boolean;
  project_name: string;
  new_project: boolean;
  path: string;
  framework: "Django" | "Flask" | "Vanilla";
  package_manager: "Poetry" | "Venv" | "None";
  git_setup: "No Setup" | "Initialize Git" | "Create repo and connect" | "Connect to existing repo";
  packages: [""];
};

export default function PythonForm() {
  const form = useForm({
    schema: formSchema, });

  const [path, setPath] = useState("")
  const [formState, setFormState] = useState<PythonFormState>({
    step1: true,
    step2: false,
    project_name: "",
    new_project: false,
    path: "",
    framework: "Vanilla",
    package_manager: "None",
    git_setup: "No Setup",
    packages: [""]

  })
  const {step1, step2} = formState
  return (
    <>
    {console.log(formState)}
        {step1 ? <Step1Form setFormState={setFormState}/> : <div></div>}
        {step2 ? <Step2Form setFormState={setFormState} /> : <div></div>}
        

        {/* <Input
          label="Project Name"
          type="text"
          placeholder="Project Name"
          {...form.register("Project_Name")}
        />
        <Input
          label="Github Link"
          type="text"
          placeholder="Github Link"
          {...form.register("Github_Link")}
        ></Input>
        <SelectBox
          select_name="Env Handler"
          default_option="None"
          options={["Venv", "Poetry"]}
          {...form.register("Env")}
        ></SelectBox>
        <Input
          label="Packages"
          type="text"
          placeholder="Packages"
          {...form.register("Packages")}
        ></Input>
        <Checkbox
          label="Git Setup"
          type="checkbox"
          {...form.register("Git_Setup")}
        ></Checkbox>
        <SubmitButton name="Create Project" /> */}
      <VSCodeButton path={path}></VSCodeButton>
    </>
  );
}
