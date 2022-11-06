import React, { useState } from "react";
import { z } from "zod";
import { PythonSubmit } from "./PythonSubmit";
import VSCodeButton from "../form_components/VSCodeButton";
import Step1Form from "../form_components/Step1Form";
import Step2Form from "./Step2Form";
import { formSchema1 } from "../form_components/Step1Form";
import { useMultiStepForm } from "../../hooks/useMultiStepForm";

export const overallPythonFormSchema = z.object({
  Project_Name: z.string().min(1, "Please enter a name"),
  Project_Type: z.enum(["New Project", "Use Existing Template"]),
  Path: z.string(),
  Template: z.string().optional(),
  Framework: z.enum(["Django", "Flask", "Vanilla"]),
  Package_Manager: z.enum(["Venv", "Poetry", "None"]),
  Git_Setup: z.enum([
    "No Setup",
    "Initialize Git",
    "Create repo and connect",
    "Connect to existing repo",
  ]),
  Github_Repo: z.string().optional(),
  Packages: z.string(),
});

export type PythonFormState = z.infer<typeof overallPythonFormSchema>;

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

  const [path, setPath] = useState("")

  const { setFormState, setFormStep, formState, formStep, step1 } =
    useMultiStepForm(overallPythonFormSchema, initialState, "Python", PythonSubmit, setPath);


  return (
    <>
      {formStep == 0 ? (
        step1
      ) : (
        <Step2Form
          setFormState={setFormState}
          setFormStep={setFormStep}
          formState={formState}
          setPath={setPath}
        />
      )}

      <VSCodeButton path={path}></VSCodeButton>
    </>
  );
}
