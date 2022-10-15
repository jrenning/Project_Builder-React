import { Input } from "../form_components/Input";
import React, { ChangeEvent, useState } from "react";
import { ButtonDiv } from "../../styles/FormStyles";
import { Form, useForm } from "../form_components/Form";
import SubmitButton from "../form_components/SubmitButton";
import FormButton from "../shared/FormButton";
import { SelectBox } from "../shared/SelectBox";
import { JavascriptSubmit } from "./FormSubmit";
import { overallFormSchemaJavascript } from "./JavascriptForm";

type Props = {
  setFormStep: any
  setFormState: any
}

function Step2FormJavascript({setFormStep}: Props) {
  const formSchema = overallFormSchemaJavascript.pick({
    Framework: true,
    Package_Manager: true,
    Git_Setup: true,
    Github_Repo: true,
    Packages: true,
  });

  const form = useForm({
    schema: formSchema,
  });


  const goBack = () => {
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
    <Form form={form} onSubmit={(e) => JavascriptSubmit(e, setPath)}>
      <SelectBox
        select_name="Framework"
        default_option="Vanilla"
        options={["React (CRA)", "Next"]}
        {...form.register("Framework")}
      />
      <SelectBox
        default_option="Venv"
        options={["npm", "yarn"]}
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

export default Step2FormJavascript;
