import React, { useState } from "react";
import { Form, useForm } from "../form_components/Form";
import { Input } from "../form_components/Input";
import { z } from "zod";
import { Checkbox } from "../form_components/Checkbox";
import SubmitButton from "../form_components/SubmitButton";
import { PythonSubmit } from "./PythonSubmit";
import VSCodeButton from "../form_components/VSCodeButton";
import { SelectBox } from "../shared/SelectBox";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";


export const formSchema2 = z.object({
  Framework: z.string(),
  Package_Manager: z.string(),
  Packages: z.string(),
  Git_Setup: z.string(),
});

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
  Packages: string | string[];
};

const callSubmit = () => {};

export default function PythonForm() {

  const [formState, setFormState] = useState<PythonFormState>({
    Project_Name: "",
    Project_Type: "New Project",
    Path: "",
    Framework: "Vanilla",
    Package_Manager: "None",
    Git_Setup: "No Setup",
    Packages: [""],
  });

  const [formStep, setFormStep] = useState(0);

  const steps = [
    <Step1Form formData={formState} setFormState={setFormState} setFormStep={setFormStep} />,
    <Step2Form setFormState={setFormState} setFormStep={setFormStep}/>,
  ];
  

  return (
    <>
        {steps[formStep]}

      <VSCodeButton path={formState.Path}></VSCodeButton>
    </>
  );
}
