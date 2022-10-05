import React from "react";
import { z } from "zod";
import { Form, useForm } from "../Form";
import { Input } from "../Input";
import {SelectBox} from "../shared/SelectBox";
import SubmitButton from "../SubmitButton";
import { PythonFormState } from "./PythonForm";

export const formSchema2 = z.object({
  Framework: z.string().min(1, "Please enter a name"),
  Package_Manager: z.string().optional(),
  Git_Setup: z.string().optional(),
  Packages: z.string(),
});

type Step2Data = z.infer<typeof formSchema2>;

type Props = {
  setFormState: React.Dispatch<React.SetStateAction<PythonFormState>>;
};

function Step2Form({ setFormState }: Props) {
  const Step1Submit = (data: Step2Data) => {
    console.log(data);
  };
  const form = useForm({
    schema: formSchema2,
  });
  return (
    <Form form={form} onSubmit={(e) => Step1Submit(e)}>
      <SelectBox
        select_name="Framework"
        default_option="Vanilla"
        options={["Django", "Flask", "Vanilla"]}
        {...form.register("Framework")}
      />
      <SelectBox
        default_option="Venv"
        options={["Poetry", "Venv", "None"]}
        select_name="Package Manager"
        {...form.register("Package_Manager")}
      />

      <SubmitButton name="Create Project" />
    </Form>
  );
}

export default Step2Form;
