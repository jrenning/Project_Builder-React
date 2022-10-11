import React, { useEffect, useMemo, useState, ChangeEvent } from "react";
import { z } from "zod";
import { Form, useForm } from "../form_components/Form";
import { Input } from "../form_components/Input";
import { SelectBox } from "../shared/SelectBox";
import SubmitButton from "../form_components/SubmitButton";
import { PythonFormState } from "./PythonForm";
import { useForm as useHookForm } from "react-hook-form";
import FormButton from "../shared/FormButton";
import {open} from "@tauri-apps/api/dialog"

export const formSchema1 = z.object({
  Project_Name: z.string().min(1, "Please enter a name"),
  Project_Type: z.enum(["New Project", "Existing Template"]),
  Path: z.string(),
  Template: z.string().optional(),
});

type Step1Data = z.infer<typeof formSchema1>;

type Props = {
  formData: PythonFormState;
  setFormState: React.Dispatch<React.SetStateAction<PythonFormState>>;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
};

function Step1Form({ formData, setFormState, setFormStep }: Props) {
  const form = useForm({
    schema: formSchema1,
  });

  // whether or not a template should be asked for
  const [templateEnter, setTemplateEnter] = useState(false);

  // path from dialog selection
  // TODO add default path here
  const [path, setPath] = useState("")

  const Step1Submit = (data: Step1Data) => {
    // if template wasn't selected update state and form step
    if (!data.Template) {
      setFormState((prevState) => ({
        ...prevState,
        ...data,
      }));
      setFormStep(1);
    }

    // if template is chosen create project
    // TODO, call create project (template version?)
  };

  const checkTemplate = (data: ChangeEvent<HTMLSelectElement>) => {
    if (data.target.value == "Use Existing Template") {
      setTemplateEnter(true);
    } else {
      setTemplateEnter(false);
    }
  };

  const openFileSelection = async (e: any) => {
    // TODO add file selection
    e.preventDefault()
    let result = await open({
        defaultPath: '',
        directory: true,
        multiple: false
    })
    // if selection isn't null set as path
    if (result != null && !Array.isArray(result) ) {
        setPath(result)
        // add result to form page for easy reference 
        form.setValue("Path", result)
    }

  }

  // keep form data in case you click back
  useEffect(() => {
    form.reset({
      Project_Name: formData.Project_Name,
      Path: formData.Path,
      Project_Type: formData.Project_Type,
    });
  }, []);

  return (
    <Form onSubmit={Step1Submit} form={form}>
      <Input
        label="Project Name"
        type="text"
        placeholder="Project Name"
        {...form.register("Project_Name")}
      />
      <FormButton name="Choose Path" onClick={openFileSelection}/>
      <Input
        label="Path"
        type="text"
        placeholder="Path"
        
        {...form.register("Path", {disabled: true})}
      />
      <SelectBox
        default_option="New Project"
        options={["Use Existing Template"]}
        select_name="Type of Project"
        {...form.register("Project_Type")}
        onChange={checkTemplate}
      />
      {templateEnter && (
        <SelectBox
          default_option=""
          options={["Filler Template", "Filer Template"]}
          select_name="Template"
          {...form.register("Template")}
        />
      )}
      {templateEnter ? (
        <SubmitButton name="Create Project" />
      ) : (
        <SubmitButton name="Next Step" />
      )}
    </Form>
  );
}

export default Step1Form;
