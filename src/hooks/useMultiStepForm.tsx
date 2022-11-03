import React, { useState } from "react";
import { z, ZodSchema } from "zod";
import Step1Form from "../components/form_components/Step1Form";
import { overallPythonFormSchema } from "../components/python/PythonForm";
import { formSchema1 } from "../components/form_components/Step1Form";


const baseSchema = z.object({
  Project_Name: z.string().min(1, "Please enter a name"),
  Project_Type: z.enum(["New Project", "Existing Template"]),
  Path: z.string(),
  Template: z.string().optional(),
});

// breaks if you use import to get this 
const overallFormSchemaJavascript = z.object({
  Framework: z.enum(["Vanilla", "React (CRA)", "Next"]),
  Package_Manager: z.enum(["npm", "yarn"]),
  Git_Setup: z.enum([
    "No Setup",
    "Initialize Git",
    "Create repo and connect",
    "Connect to existing repo",
  ]),
  Github_Repo: z.string().optional(),
  Packages: z.string(),
  Project_Name: z.string().min(1, "Please enter a name"),
  Project_Type: z.enum(["New Project", "Existing Template"]),
  Path: z.string(),
  Template: z.string().optional(),
});



// combine options with all possible other schema options (set as optional)
export const overallFormOptions = z.object({
  Project_Name: z.string().min(1, "Please enter a name"),
  Project_Type: z.enum(["New Project", "Existing Template"]),
  Path: z.string(),
  Template: z.string().optional(),
  Framework: z.enum(["Django", "Flask", "Vanilla", "React (CRA)", "Next"]),
  Package_Manager: z.enum(["Venv", "Poetry", "npm", "yarn", "None"]),
  Git_Setup: z.enum([
    "No Setup",
    "Initialize Git",
    "Create repo and connect",
    "Connect to existing repo",
  ]),
  Github_Repo: z.string().optional(),
  Packages: z.string().optional(),
});


export type overallOptions = z.infer<typeof overallFormOptions>;




type Step1Schema = z.infer<typeof formSchema1>;

export function useMultiStepForm(formStateObject: ZodSchema<overallOptions>, initialState: any, language: string) {

  type FormState = z.infer<typeof formStateObject>
  const [formState, setFormState] = useState<FormState>(initialState);
  const [formStep, setFormStep] = useState(0);

  const Step1Submit = (data: Step1Schema) => {
    // if template wasn't selected update state and form step
    if (!data.Template) {
      setFormState((prevState: overallOptions) => ({
        ...prevState,
        ...data,
      }));
      setFormStep(1);
    }
  }

    const Step1 = (
      <Step1Form
        setFormState={setFormState}
        setFormStep={setFormStep}
        formData={formState}
        submitHandler={Step1Submit}
        language={language}
      ></Step1Form>
    );


    return {
      step1: Step1,
      formState: formState,
      setFormState: setFormState,
      formStep: formStep,
      setFormStep: setFormStep,
    };
}
