import React, { ChangeEvent, useEffect, useState } from "react";
import { z } from "zod";
import { Form, useForm } from "../form_components/Form";
import { SelectBox } from "../shared/SelectBox";
import SubmitButton from "../form_components/SubmitButton";
import { PythonFormState } from "./PythonForm";
import FormButton from "../shared/FormButton";
import { ButtonDiv } from "../../styles/FormStyles";
import { Input } from "../form_components/Input";
import { PythonSubmit } from "./PythonSubmit";
import { ToastContainer } from "react-toastify";

export const formSchema2 = z.object({
  Framework: z.enum(["Django", "Flask", "Vanilla"]),
  Package_Manager: z.enum(["Venv", "Poetry", "None"]),
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
  formState: any
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
};

function Step2Form({ setFormState, formState,  setFormStep }: Props) {

  const [path, setPath] = useState("")
  const Step2Submit = (data: Step2Data) => {
    setFormState((prevState: PythonFormState) => ({
      ...prevState,
      ...data,
    }));

    PythonSubmit(formState, setPath)
    
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
    <>
    <ToastContainer />
      <Form form={form} onSubmit={Step2Submit}>
        <SelectBox
          select_name="Framework"
          default_option="Vanilla"
          options={["Django", "Flask", "Vanilla"]}
          control={form.control}
        />
        <SelectBox
          default_option="None"
          options={["Poetry", "Venv"]}
          select_name="Package_Manager"
          select_label="Package Manager"
          control={form.control}
        />
        <SelectBox
          default_option="No Setup"
          options={[
            "Initialize Git",
            "Create repo and connect",
            "Connect to existing repo",
          ]}
          select_name="Git_Setup"
          select_label="Git Setup"
          control={form.control}
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
    </>
  );
}

export default Step2Form;
