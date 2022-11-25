import React, { ChangeEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { useDefaultPath } from "../../hooks/useDefaultPaths";
import { overallOptions } from "../../hooks/useMultiStepForm";
import { useTemplates } from "../../hooks/useTemplates";
import { SelectBox } from "../shared/SelectBox";
import FolderSelection from "./FolderSelection";
import { Form, useForm } from "./Form";
import { Input } from "./Input";
import SubmitButton from "./SubmitButton";

export const formSchema1 = z.object({
  Project_Name: z.string().min(1, "Please enter a name"),
  Project_Type: z.enum(["New Project", "Use Existing Template"]),
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
  language: string
};

function Step1Form({ formData, setFormState, setFormStep, submitHandler, children, language }: Props) {
  const form = useForm({
    schema: formSchema1,
  });


  // whether or not a template should be asked for
  const [templateEnter, setTemplateEnter] = useState(false);

  // add default path here
  const default_path = useDefaultPath(language);
  form.setValue("Path", default_path)


  const {template_names, template_locations} = useTemplates(language);



  const checkTemplate = (data: ChangeEvent<HTMLSelectElement>) => {
    if (data.target.value == "Use Existing Template") {
      setTemplateEnter(true);
    } else {
      setTemplateEnter(false);
      // set template back to empty avoids accidental template creation
      form.setValue("Template", "")
    }
  };


  // keep form data in case you click back
  useEffect(() => {
    form.reset({
      Project_Name: formData.Project_Name && formData.Project_Name,
      Project_Type: formData.Project_Type && formData.Project_Type,
      Template: formData.Template && formData.Template,
      Path: formData.Path && formData.Path
    });
    form.setValue("Path", formData.Path)
  }, []);

  return (
    <>
    <ToastContainer />
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
          select_name="Project_Type"
          select_label="Type of Project"
          control={form.control}
          onChangeEvent={checkTemplate}
        />
        {templateEnter && (
          <SelectBox
            default_option=""
            options={template_names}
            select_name="Template"
            select_label="Template"
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
