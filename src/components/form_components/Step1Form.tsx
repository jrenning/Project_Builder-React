import React, { useEffect, useState, ChangeEvent } from "react";
import { z } from "zod";
import { Form, useForm } from "./Form";
import { Input } from "./Input";
import { SelectBox } from "../shared/SelectBox";
import SubmitButton from "./SubmitButton";
import FormButton from "../shared/FormButton";
import {open} from "@tauri-apps/api/dialog"
import { overallOptions } from "../../hooks/useMultiStepForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FolderSelection from "./FolderSelection";

export const formSchema1 = z.object({
  Project_Name: z.string().min(1, "Please enter a name"),
  Project_Type: z.enum(["New Project", "Existing Template"]),
  Path: z.string({required_error: "Path is required"}),
  Template: z.string().optional(),
});

type Step1Data = z.infer<typeof formSchema1>;

type Props = {
  formData: overallOptions;
  setFormState: React.Dispatch<React.SetStateAction<any>>;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  submitHandler: ((data: any) => Promise<void>) | ((data: any) => void)
  children?: any
};

function Step1Form({ formData, setFormState, setFormStep, submitHandler, children }: Props) {
  const form = useForm({
    schema: formSchema1,
  });

  console.log(formData)

  // whether or not a template should be asked for
  const [templateEnter, setTemplateEnter] = useState(false);

  // TODO add default path here



  const checkTemplate = (data: ChangeEvent<HTMLSelectElement>) => {
    if (data.target.value == "Use Existing Template") {
      setTemplateEnter(true);
    } else {
      setTemplateEnter(false);
    }
  };


  // keep form data in case you click back
  useEffect(() => {
    form.reset({
      Project_Name: formData.Project_Name && formData.Project_Name,
      Path: formData.Path && formData.Path,
      Project_Type: formData.Project_Type && formData.Project_Type,
      Template: formData.Template && formData.Template
    });
  }, []);

  return (
    <>
      {children}
      <Form onSubmit={submitHandler} form={form}>
        <Input
          label="Project Name"
          type="text"
          placeholder="Project Name"
          {...form.register("Project_Name")}
        />
        <FolderSelection form={form} />
        <SelectBox
          default_option="New Project"
          options={["Use Existing Template"]}
          select_name="Type of Project"
          control={form.control}
        />
        {templateEnter && (
          <SelectBox
            default_option=""
            options={["Filler Template", "Filer Template"]}
            select_name="Template"
            control={form.control}
          />
        )}
        {templateEnter ? (
          <SubmitButton name="Create Project" />
        ) : (
          <SubmitButton name="Next Step" />
        )}
      </Form>
    </>
  );
}

export default Step1Form;