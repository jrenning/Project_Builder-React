import React, { useEffect } from "react";
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
import { overallRustFormSchema, RustFormState } from "./RustForm";
import { RustSubmit } from "./RustSubmit";

type Props = {
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  setFormState: React.Dispatch<React.SetStateAction<any>>;
  formState: any;
  setPath: React.Dispatch<React.SetStateAction<any>>;
};

function Step2FormRust({
  setFormStep,
  setFormState,
  formState,
  setPath,
}: Props) {
  const formSchema = overallRustFormSchema.pick({
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

  // submits form when form state is updated
  useFormSubmit(RustSubmit, formState, setPath);

  const updateRustData = (data: Step2Data) => {
    // set the overall state
    setFormState((prevState: RustFormState) => ({
      ...prevState,
      ...data,
    }));
  };

  const goBack = (e: any) => {
    e.preventDefault();
    setFormStep(0);
  };

  const [Github, checkGithub] = useGithub();

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
      <Form form={form} onSubmit={updateRustData}>
        <SelectBox
          select_name="Framework"
          select_label="Framework"
          default_option="Vanilla"
          options={[""]}
          control={form.control}
        />
        <SelectBox
          default_option="Cargo"
          options={["None"]}
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

export default Step2FormRust;
