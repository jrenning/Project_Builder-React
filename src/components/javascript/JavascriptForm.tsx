import React, { useState } from "react";
import { z } from "zod";
import { JavascriptSubmit } from "./FormSubmit";
import VSCodeButton from "../form_components/VSCodeButton";
import { useMultiStepForm } from "../../hooks/useMultiStepForm";
import Step2FormJavascript from "./Step2FormJavascript";

export const overallFormSchemaJavascript = z.object({
  Framework: z.enum(["Vanilla", "React (CRA)", "Next"], {
    required_error: "Framework is required",
    invalid_type_error: "Invalid Framework",
  }),
  Package_Manager: z.enum(["npm", "yarn", "None"], {
    required_error: "Package Manager is required",
    invalid_type_error: "Invalid Package Manager"
  }),
  Git_Setup: z.enum([
    "No Setup",
    "Initialize Git",
    "Create repo and connect",
    "Connect to existing repo",
  ], {
    required_error: "Git Setup choice is required",
    invalid_type_error: "Invalid git setup choice",
  }),
  Github_Repo: z.string().optional(),
  Packages: z.string().optional(),
  Project_Name: z.string().min(1, "Please enter a name"),
  Project_Type: z.enum(["New Project", "Existing Template"]),
  Path: z.string(),
  Template: z.string().optional(),
});

export default function JavascriptForm() {
  const initialState = {
    Framework: "Vanilla",
    Package_Manager: "npm",
    Git_Setup: "No Setup",
    Github_Repo: "",
    Packages: "",
    Project_Name: "",
    Project_Type: "New Project",
    Path: "",
    Template: "",
  };

  const { setFormState, setFormStep, formState, formStep, step1 } =
    useMultiStepForm(overallFormSchemaJavascript, initialState);

  const [path, setPath] = useState("");

  return (
    <>
      {formStep == 0 ? (
        step1
      ) : (
        <Step2FormJavascript
          setFormState={setFormState}
          setFormStep={setFormStep}
        />
      )}
      <VSCodeButton path={path}></VSCodeButton>
    </>
  );
}
