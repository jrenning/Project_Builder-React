import React, { useState } from "react";
import { z } from "zod";
import { PythonSubmit } from "./PythonSubmit";
import VSCodeButton from "../form_components/VSCodeButton";
import Step1Form from "../form_components/Step1Form";
import Step2Form from "./Step2Form";
import { formSchema1 } from "../form_components/Step1Form";
import { useMultiStepForm } from "../../hooks/useMultiStepForm";


export interface PythonFormState extends Object {
  Project_Name: string;
  Project_Type: "New Project" | "Existing Template";
  Path: string;
  Framework: "Django" | "Flask" | "Vanilla";
  Package_Manager: "Poetry" | "Venv" | "None";
  Git_Setup:
    | "No Setup"
    | "Initialize Git"
    | "Create repo and connect"
    | "Connect to existing repo";
  Github_Repo?: string;
  Packages: string | string[];
}


export const overallPythonFormSchema = z.object({
  Project_Name: z.string().min(1, "Please enter a name"),
  Project_Type: z.enum(["New Project", "Existing Template"]),
  Path: z.string(),
  Template: z.string().optional(),
  Framework: z.enum(["Django", "Flask", "Vanilla"]),
  Package_Manager: z.enum(["Venv", "Poetry"]),
  Git_Setup: z.enum([
    "No Setup",
    "Initialize Git",
    "Create repo and connect",
    "Connect to existing repo",
  ]),
  Github_Repo: z.string().optional(),
  Packages: z.string(),
});

export default function PythonForm() {
  const initialState = {
    Project_Name: "",
    Project_Type: "New Project",
    Path: "",
    Framework: "Vanilla",
    Package_Manager: "None",
    Git_Setup: "No Setup",
    Packages: [""],
  };

  const { setFormState, setFormStep, formState, formStep, step1 } =
    useMultiStepForm(overallPythonFormSchema, initialState);




  return (
    <>
      {formStep == 0 ? step1 : <Step2Form setFormState={setFormState} setFormStep={setFormStep}/>}

      <VSCodeButton path={formState.Path}></VSCodeButton>
    </>
  );
}
