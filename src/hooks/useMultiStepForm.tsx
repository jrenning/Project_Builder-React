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
  Project_Type: z.enum(["New Project", "Use Existing Template"]),
  Path: z.string(),
  Template: z.string().optional(),
});

// combine options with all possible other schema options (set as optional)
export const overallFormOptions = z.object({
  Project_Name: z.string().min(1, "Please enter a name"),
  Project_Type: z.enum(["New Project", "Use Existing Template"]),
  Path: z.string(),
  Template: z.string().optional(),
  Framework: z.enum(["Django", "Flask", "Vanilla", "React (CRA)", "Next"]),
  Package_Manager: z.enum(["Venv", "Poetry", "npm", "yarn", "None", "Cargo"]),
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

type Return<T> = {
  step1: JSX.Element
  formState: T
  setFormState: React.Dispatch<React.SetStateAction<T>>
  formStep: number
  setFormStep: React.Dispatch<React.SetStateAction<number>>
}

/**
 * 
 * @param formStateObject Zod schema of the form being created
 * @param initialState initial state of the form being created
 * @param language language the form is being created for 
 * @param submitHandler the submit handler for the first step of the form 
 * @param setPath handler that sets the overall path after a project is created, used for vscode button
 *
 * @returns step1 - the first step of the form being created (same for all languages)
 * formState: T - the form state of the form that was just created
 * setFormState: React.Dispatch<React.SetStateAction<T>> - setter for the form state
 * formStep: number - step the form is on
 * setFormStep: React.Dispatch<React.SetStateAction<number>> - setter for the form step
 */
export function useMultiStepForm(
  formStateObject: ZodSchema<overallOptions>,
  initialState: any,
  language: string,
  submitHandler: (data: any) => Promise<void>,
  setPath: React.Dispatch<React.SetStateAction<any>>
): Return<z.infer<typeof formStateObject>> {
  type FormState = z.infer<typeof formStateObject>;
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
    } else {
      // if template call overall submission handler
      submitHandler(data);
      setPath(data.Path + "\\" + data.Project_Name)
    }
  };

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
