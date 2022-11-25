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
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { useIsMount} from "../../hooks/useIsMount";

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
  formState: any;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  setPath: React.Dispatch<React.SetStateAction<any>>;
};

function Step2Form({ setFormState, formState,  setFormStep, setPath }: Props) {
  const Step2Submit = (data: Step2Data) => {
    setFormState((prevState: PythonFormState) => ({
      ...prevState,
      ...data,
    }));
  };


  // submits form when state is updated
  // only call when state has been fully updated
  useFormSubmit(PythonSubmit,formState,setPath)

  const goBack = () => {
    setFormStep(0);
  };

  const form = useForm({
    schema: formSchema2,
  });

  const checkGithub = (data: ChangeEvent<HTMLSelectElement>) => {
    if (
      data.target.value == "Connect to existing repo"
    ) {
      setGithub(true);
    } else {
      setGithub(false);
    }
  };
  // avoid needed to update selections every reload
  useEffect(() => {
    form.reset({
      Framework: formState.Framework ? formState.Framework : "Vanilla",
      Package_Manager: formState.Package_Manager ? formState.Package_Manager : "None" ,
      Git_Setup: formState.Git_Setup ? formState.Git_Setup : "No Setup",
      Packages: formState.Packages ? formState.Packages : "",
    });
  }, []);

  const [Github, setGithub] = useState(false);

  return (
    <>
      <ToastContainer />
      <Form form={form} onSubmit={Step2Submit}>
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
