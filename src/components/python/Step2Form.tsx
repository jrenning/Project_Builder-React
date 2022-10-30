import React, { ChangeEvent, useEffect, useState } from "react";
import { z } from "zod";
import { Form, useForm } from "../form_components/Form";
import { SelectBox } from "../shared/SelectBox";
import SubmitButton from "../form_components/SubmitButton";
import { PythonFormState } from "./PythonForm";
import FormButton from "../shared/FormButton";
import { ButtonDiv } from "../../styles/FormStyles";
import { Input } from "../form_components/Input";

export const formSchema2 = z.object({
  Framework: z.enum(["Django", "Flask", "Vanilla"]),
  Package_Manager: z.enum(["Venv", "Poetry"]),
  Git_Setup: z.enum([
    "No Setup",
    "Initialize Git",
    "Create repo and connect",
    "Connect to existing repo",
  ]),
  Github_Repo: z.string().optional(),
  Packages: z.string().optional(),
});



type Step2Data = z.infer<typeof formSchema2>;

type Props = {
  setFormState: React.Dispatch<React.SetStateAction<any>>;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
};

function Step2Form({ setFormState, setFormStep }: Props) {
  const Step1Submit = (data: Step2Data) => {
    setFormState((prevState: PythonFormState) => ({
      ...prevState,
      ...data,
    }));
    console.log(data)
  };

  const goBack = () => {
    setFormStep(0);
  };

  const form = useForm({
    schema: formSchema2,
  });

  const checkGithub = (data: ChangeEvent<HTMLSelectElement>) => {
    if (data.target.value == "Create repo and connect" || data.target.value == "Connect to existing repo") {
        setGithub(true)
    }
    else {
        setGithub(false)
    }
  }

  const [Github, setGithub] = useState(false);


  return (
    <Form form={form} onSubmit={Step1Submit}>
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
      <SelectBox
        default_option="No Setup"
        options={[
          "Initialize Git",
          "Create repo and connect",
          "Connect to existing repo",
        ]}
        select_name="Git Setup"
        {...form.register("Git_Setup")}
        onChange={checkGithub}
      />
      {Github && (
        <Input
          label="Github Repo"
          type="text"
          placeholder="Github Repo"
          {...form.register("Github_Repo")}
        />
      )}

      <Input
        label="Packages"
        type="text"
        placeholder="Packages"
        {...form.register("Packages")}
      />
      <ButtonDiv>
        <FormButton name="Back" onClick={goBack} />
        <SubmitButton name="Create Project" />
      </ButtonDiv>
    </Form>
  );
}

export default Step2Form;
