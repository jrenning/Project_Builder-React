import { invoke } from "@tauri-apps/api";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import FolderSelection from "../form_components/FolderSelection";
import { Form, useForm } from "../form_components/Form";
import { Input } from "../form_components/Input";
import SubmitButton from "../form_components/SubmitButton";
import { SelectBox } from "../shared/SelectBox";

type Props = {
  setNeedToUpdateTemplates: React.Dispatch<React.SetStateAction<boolean>>;
};

function TemplateForm({setNeedToUpdateTemplates}: Props) {
  const templateFormSchema = z.object({
    Template_Name: z.string().min(1, "Please enter a template name"),
    Language: z.enum(["Python", "Javascript", "Rust"]),
    Path: z.string().optional(),
    Github_Link: z.string().optional(),
  });

  type templateData = z.infer<typeof templateFormSchema>;

  const form = useForm({
    schema: templateFormSchema,
  });

  const [templateType, setTemplateType] = useState("Local Folder");

  const updateTemplateType = (e: ChangeEvent<HTMLSelectElement>) => {
    setTemplateType(e.target.value);
  };

  const templateSubmit = async ({
    Path,
    Template_Name,
    Github_Link,
    Language,
  }: templateData) => {
    // lowercase language name to avoid key error
    Path
      ? await invoke("set_template_data", {
          language: Language.toLowerCase(),
          name: Template_Name,
          location: Path,
        })
          .then(() =>
            toast(`Template ${Template_Name} added`, {
              type: "success",
              hideProgressBar: true,
            })
          )
          .catch((err) => {
            toast(`${err}`, {
              type: "error",
              hideProgressBar: true,
            });
          })
      : Github_Link
      ? await invoke("set_template_data", {
          language: Language.toLowerCase(),
          name: Template_Name,
          location: Github_Link,
        })
          .then(() =>
            toast(`Template ${Template_Name} added`, {
              type: "success",
              hideProgressBar: true,
            })
          )
          .catch((err) => {
            toast(`${err}`, {
              type: "error",
              hideProgressBar: true,
            });
          })
      : "";

      setNeedToUpdateTemplates((prevState)=> !prevState);

  };

  return (
    <Form form={form} onSubmit={templateSubmit}>
      <Input
        label="Template Name"
        type="text"
        placeholder="Template Name"
        {...form.register("Template_Name")}
      />
      <SelectBox
        select_label="Template Language"
        select_name="Language"
        options={["Python", "Javascript", "Rust"]}
        default_option="Select Language"
        control={form.control}
      />
      <SelectBox
        select_label="Location of Template"
        select_name=""
        options={["Github Link"]}
        default_option=" Local Folder"
        control={form.control}
        onChangeEvent={updateTemplateType}
      />
      {templateType == "Local Folder" ? (
        <FolderSelection form={form} />
      ) : (
        <>
          <br />
          <Input
            label="Github Link"
            type="text"
            placeholder="Github Link"
            {...form.register("Github_Link")}
          />
        </>
      )}

      <SubmitButton name="Add Template" />
    </Form>
  );
}

export default TemplateForm;
