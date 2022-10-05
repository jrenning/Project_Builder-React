import React from "react";
import { z } from "zod";
import { Form, useForm } from "../Form";
import { Input } from "../Input";
import {SelectBox} from "../shared/SelectBox";
import SubmitButton from "../SubmitButton";
import { PythonFormState } from "./PythonForm";
import {useForm as useHookForm} from "react-hook-form"

export const formSchema1 = z.object({
  Project_Name: z.string().min(1, "Please enter a name"),
  Project_Type: z.string().optional(),
  Path: z.string(),
});

type Step1Data = z.infer<typeof formSchema1>;

type Props = {
  setFormState: React.Dispatch<React.SetStateAction<PythonFormState>>;
};

function Step1Form({setFormState}: Props) {
  const Step1Submit = ({Project_Name, Project_Type, Path}: Step1Data ) => {
    console.log(Project_Name)
    let updated_state = {
        "step1": false,
        "step2": true,
    }
    setFormState(prevState => ({
        ...prevState,
        ...updated_state
    }))
  };
  const form = useForm({
    schema: formSchema1,
  });

  return (
    <Form onSubmit={Step1Submit} form={form}>
      <Input
        label="Project Name"
        type="text"
        placeholder="Project Name"
        {...form.register("Project_Name")}
      />
      <Input
        label="Path"
        type="text"
        placeholder="Path"
        {...form.register("Path")}
      />
      <SelectBox
        default_option="New Project"
        options={["New Project", "Use Existing Template"]}
        select_name="Type of Project"
        {...form.register("Project_Type")}
      />
      <SubmitButton name="Next Step" />
    </Form>
  );
}

export default Step1Form;
