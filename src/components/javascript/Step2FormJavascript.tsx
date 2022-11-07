import { Input } from "../form_components/Input";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ButtonDiv } from "../../styles/FormStyles";
import { Form, useForm } from "../form_components/Form";
import SubmitButton from "../form_components/SubmitButton";
import FormButton from "../shared/FormButton";
import { SelectBox } from "../shared/SelectBox";
import { JavascriptSubmit } from "./FormSubmit";
import { overallFormSchemaJavascript, OverallJavascriptObject } from "./JavascriptForm";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify"
import { z } from "zod";
import { useFormSubmit } from "../../hooks/useFormSubmit";

type Props = {
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  setFormState: React.Dispatch<React.SetStateAction<any>>;
  formState: any;
  setPath: React.Dispatch<React.SetStateAction<any>>;
};

function Step2FormJavascript({setFormStep, setFormState, formState, setPath}: Props) {
  const formSchema = overallFormSchemaJavascript.pick({
    Framework: true,
    Package_Manager: true,
    Git_Setup: true,
    Github_Repo: true,
    Packages: true,
  });

  type Step2Data = z.infer<typeof formSchema>;

  const form = useForm({
    schema: formSchema,
  });

  const createJavascriptProject = (data: Step2Data) => {
    // set the overall state
    setFormState((prevState: OverallJavascriptObject) => ({
      ...prevState,
      ...data,
    }));
  };

  // submits form when form state is updated
  useFormSubmit(JavascriptSubmit, formState, setPath);

  const goBack = (e: any) => {
    e.preventDefault();
    setFormStep(0);
  };

  const checkGithub = (data: ChangeEvent<HTMLSelectElement>) => {
    if (
      data.target.value == "Create repo and connect" ||
      data.target.value == "Connect to existing repo"
    ) {
      setGithub(true);
    } else {
      setGithub(false);
    }
  };

  const [Github, setGithub] = useState(false);

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
      <Form form={form} onSubmit={createJavascriptProject}>
        <SelectBox
          select_name="Framework"
          select_label="Framework"
          default_option="Vanilla"
          options={["React (CRA)", "Next"]}
          control={form.control}
        />
        <SelectBox
          default_option="npm"
          options={["None", "yarn"]}
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
          onChangeEvent={checkGithub}
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

export default Step2FormJavascript;
