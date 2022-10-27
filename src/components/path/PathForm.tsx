import { open } from "@tauri-apps/api/dialog";
import React, { ChangeEvent, useState } from "react";
import { z } from "zod";
import { Form, useForm } from "../form_components/Form";
import { Input } from "../form_components/Input";
import SubmitButton from "../form_components/SubmitButton";
import FormButton from "../shared/FormButton";
import { SelectBox } from "../shared/SelectBox";

type Props = {
  names: string[];
};

const formSchema = z.object({
  Language: z.enum(["Python", "Javascript", "Rust", "Select Language"]),
  Path: z.string(),
});

function PathForm({ names }: Props) {
  const form = useForm({
    schema: formSchema,
  });

  const testSubmit = (e: any) => {
    console.log(e);
  };

  const [Language, setLanguage] = useState("");

  const changeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    // TODO update language path
  };

  const openFileSelection = async (e: any) => {
    e.preventDefault();
    // select directory
    let result = await open({
      defaultPath: "",
      directory: true,
      multiple: false,
    });
    // if selection isn't null set as path
    if (result != null && !Array.isArray(result)) {
      // add result to form page for easy reference
      form.setValue("Path", result);
    }
  };
  const t = ["Python", "Javascript"]
  return (
    <Form form={form} onSubmit={testSubmit}>
      <SelectBox
        select_name="Language"
        default_option="Select Language"
        options={names}
        {...form.register("Language", {onChange: changeLanguage})}
      />
      <FormButton name="Choose Path" onClick={openFileSelection} />
      <Input
        label="Path"
        type="text"
        placeholder="Path"
        {...form.register("Path", { disabled: true })}
      />
      <SubmitButton name="Set Path" />
    </Form>
  );
}

export default PathForm;
