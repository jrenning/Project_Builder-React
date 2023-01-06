import React, { ChangeEvent, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { z } from "zod";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { useGithub } from "../../hooks/useGithub";
import { ButtonDiv } from "../../styles/FormStyles";
import { Form, useForm } from "../form_components/Form";
import { Input } from "../form_components/Input";
import SubmitButton from "../form_components/SubmitButton";
import FormButton from "../shared/FormButton";
import { SelectBox } from "../shared/SelectBox";
import { PythonFormState, overallPythonFormSchema } from "./PythonForm";
import { PythonSubmit } from "./PythonSubmit";




type Props = {
  setFormState: React.Dispatch<React.SetStateAction<any>>;
  formState: any;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  setPath: React.Dispatch<React.SetStateAction<any>>;
};

function Step2Form({ setFormState, formState, setFormStep, setPath }: Props) {
  
  const formSchema2 = overallPythonFormSchema.pick({
    Framework: true,
    Package_Manager: true,
    Git_Setup: true,
    Github_Repo: true,
    Packages: true,
  });

  type Step2Data = z.infer<typeof formSchema2>;

  const form = useForm({
    schema: formSchema2,
  });

  const PythonStep2Submit = (data: Step2Data) => {
    setFormState((prevState: PythonFormState) => ({
      ...prevState,
      ...data,
    }));
  };

  // submits form when state is updated
  // only call when state has been fully updated
  useFormSubmit(PythonSubmit, formState, setPath);

  const goBack = (e: any) => {
    e.preventDefault()
    setFormStep(0);
  };

  const [Github, checkGithub] = useGithub()
  // avoid needed to update selections every reload
  useEffect(() => {
    form.reset({
      Framework: formState.Framework ? formState.Framework : "Vanilla",
      Package_Manager: formState.Package_Manager
        ? formState.Package_Manager
        : "None",
      Git_Setup: formState.Git_Setup ? formState.Git_Setup : "No Setup",
      Packages: formState.Packages ? formState.Packages : "",
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <Form form={form} onSubmit={PythonStep2Submit}>
        <SelectBox
          select_name="Framework"
          select_label="Framework"
          default_option="Vanilla"
          options={["Django", "Flask"]}
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
          onChangeEvent={checkGithub}
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
