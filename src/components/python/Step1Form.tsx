import React, { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Form, useForm } from "../form_components/Form";
import { Input } from "../form_components/Input";
import { SelectBox } from "../shared/SelectBox";
import SubmitButton from "../form_components/SubmitButton";
import { PythonFormState } from "./PythonForm";
import { useForm as useHookForm } from "react-hook-form";

export const formSchema1 = z.object({
  Project_Name: z.string().min(1, "Please enter a name"),
  Project_Type: z.enum(["New Project", "Existing Template"]),
  Path: z.string(),
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


  const Step1Submit = (data: Step1Data) => {
    setFormState((prevState) => ({
      ...prevState,
      ...data,
    }));
    setFormStep(1);
}




useEffect(()=> {
    console.log('here')
    console.log(formData)
    form.reset({
        Project_Name: formData.Project_Name,
        Path: formData.Path,
        Project_Type: formData.Project_Type
    })
},[])

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
        options={["Use Existing Template"]}
        select_name="Type of Project"
        {...form.register("Project_Type")}
      />
      <SubmitButton name="Next Step" />
    </Form>
  );
}

export default Step1Form;
