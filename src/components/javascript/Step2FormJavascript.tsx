import { Input } from "../form_components/Input";
import React, { ChangeEvent, useState } from "react";
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

type Props = {
  setFormStep: any
  setFormState: React.Dispatch<React.SetStateAction<any>>
  formState: any
}

function Step2FormJavascript({setFormStep, setFormState, formState}: Props) {
  const formSchema = overallFormSchemaJavascript.pick({
    Framework: true,
    Package_Manager: true,
    Git_Setup: true,
    Github_Repo: true,
    Packages: true,
  });

  type Step2Data = z.infer<typeof formSchema>

 

  const form = useForm({
    schema: formSchema,
  });

  const createJavascriptProject = (data: Step2Data) => {
    // set the overall state
    setFormState((prevState: OverallJavascriptObject ) => ({
      ...prevState,
      ...data,
    }));
    // make the project
    JavascriptSubmit(formState, setPath)

  }


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
  const [path, setPath] = useState("");

  return (
    <>
    <ToastContainer />
      <Form form={form} onSubmit={createJavascriptProject}>
        <SelectBox
          select_name="Framework"
          default_option="Vanilla"
          options={["React (CRA)", "Next"]}
          control={form.control}
        />
        <SelectBox
          default_option="npm"
          options={["None", "yarn"]}
          select_name="Package Manager"
          control={form.control}
        />
        <SelectBox
          default_option="No Setup"
          options={[
            "Initialize Git",
            "Create repo and connect",
            "Connect to existing repo",
          ]}
          select_name="Git Setup"
          control={form.control}
          // onChange={checkGithub}
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
