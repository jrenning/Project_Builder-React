import React from "react";
import { z } from "zod";
import { Form, useForm } from "../form_components/Form";
import {SelectBox} from "../shared/SelectBox";
import SubmitButton from "../form_components/SubmitButton";
import { PythonFormState } from "./PythonForm";
import styled from "styled-components";
import FormButton from "../shared/FormButton";

export const formSchema2 = z.object({
  Framework: z.enum(["Django", "Flask", "Vanilla"]),
  Package_Manager: z.enum(["Venv", "Poetry"]),
  Git_Setup: z.enum([ "No Setup",
    "Initialize Git"
    ,"Create repo and connect"
    ,"Connect to existing repo"]),
  Packages: z.string(),
});

const ButtonDiv = styled.div`
    display: flex;
    justify-content: space-between;
    padding: .5rem ;
    align-items: center;
    
`

type Step2Data = z.infer<typeof formSchema2>;

type Props = {
  setFormState: React.Dispatch<React.SetStateAction<PythonFormState>>;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
};

function Step2Form({ setFormState, setFormStep }: Props) {
  const Step1Submit = (data: Step2Data) => {
    setFormState(prevState => ({
        ...prevState,
        ...data
    }))
  };

  const goBack = () => {
    setFormStep(0)
  }

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
      <ButtonDiv>
        <FormButton name="Back" onClick={goBack}/>
        <SubmitButton name="Create Project" />
      </ButtonDiv>
    </Form>
  );
}

export default Step2Form;
