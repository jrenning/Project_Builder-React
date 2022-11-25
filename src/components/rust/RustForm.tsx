import React, { useState } from "react";
import { z } from "zod";
import { useMultiStepForm } from "../../hooks/useMultiStepForm";
import VSCodeButton from "../form_components/VSCodeButton";
import { RustSubmit } from "./RustSubmit";
import Step2FormRust from "./Step2FormRust";

export const overallRustFormSchema = z.object({
  Project_Name: z.string().min(1, "Please enter a name"),
  Project_Type: z.enum(["New Project", "Use Existing Template"]),
  Path: z.string(),
  Template: z.string().optional(),
  Framework: z.enum(["Vanilla"]),
  Package_Manager: z.enum(["Cargo"]),
  Git_Setup: z.enum([
    "No Setup",
    "Initialize Git",
    "Create repo and connect",
    "Connect to existing repo",
  ]),
  Github_Repo: z.string().optional(),
  Packages: z.string().optional(),
});

export type RustFormState = z.infer<typeof overallRustFormSchema>;

function RustForm() {
  const initialState = {
    Project_Name: "",
    Project_Type: "New Project",
    Path: "",
    Framework: "",
    Package_Manager: "Cargo",
    Git_Setup: "No Setup",
    Packages: [""],
  };

  const [path, setPath] = useState("");

    const { setFormState, setFormStep, formState, formStep, step1 } =
      useMultiStepForm(
        overallRustFormSchema,
        initialState,
        "Rust",
        RustSubmit,
        setPath
      );

  return (
    <>
      {formStep == 0 ? (
        step1
      ) : (
        <Step2FormRust
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

export default RustForm;
