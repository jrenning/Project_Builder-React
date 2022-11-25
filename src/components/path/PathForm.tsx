import { open } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api/tauri";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import FolderSelection from "../form_components/FolderSelection";
import { Form, useForm } from "../form_components/Form";
import { Input } from "../form_components/Input";
import SubmitButton from "../form_components/SubmitButton";
import FormButton from "../shared/FormButton";
import { SelectBox } from "../shared/SelectBox";

type Props = {
  names: string[];
  setUpdater: React.Dispatch<React.SetStateAction<boolean>>;
};

const formSchema = z.object({
  Language: z.enum(["Python", "Javascript", "Rust", "Select Language"]),
  Path: z.string(),
});

type FormData = z.infer<typeof formSchema>

function PathForm({ names, setUpdater }: Props) {
  const form = useForm({
    schema: formSchema,
  });

  const pathSubmit = async ({Language, Path}: FormData) => {
    await invoke("set_path_data", {name: `${Language}_path`, path: Path})
    toast(`Default path for ${Language} set successfully`, {
      type: "success",
      hideProgressBar: true
    })
    setUpdater((prevState)=> !prevState)
  };

  return (
    <Form form={form} onSubmit={pathSubmit}>
      <SelectBox
        select_name="Language"
        default_option="Select Language"
        options={names}
        control={form.control}
      />
      <FolderSelection form={form}/>
      <SubmitButton name="Set Path" />
    </Form>
  );
}

export default PathForm;
