import { open } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api/tauri";
import React, { ChangeEvent, useState } from "react";
import { z } from "zod";
import FolderSelection from "../form_components/FolderSelection";
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

type FormData = z.infer<typeof formSchema>

function PathForm({ names }: Props) {
  const form = useForm({
    schema: formSchema,
  });

  const testSubmit = ({Language, Path}: FormData) => {
    console.log(Language)
    //invoke("set_path_data", {name: `${Language}_path`, path: Path})
    console.log("path is added")
  };

  const [Language, setLanguage] = useState("");

  const changeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    // TODO update language path
  };

  const {register} = form


  return (
    <Form form={form} onSubmit={testSubmit}>
      <SelectBox
        select_name="Language"
        default_option="Select Language"
        options={names}
        onChange={changeLanguage}
        form={form}
      />
      <FolderSelection form={form}/>
      <SubmitButton name="Set Path" />
    </Form>
  );
}

export default PathForm;
