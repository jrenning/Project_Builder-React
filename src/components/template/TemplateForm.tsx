import React, { ChangeEvent, useState } from "react";
import { z } from "zod";
import FolderSelection from "../form_components/FolderSelection";
import { Form, useForm } from "../form_components/Form";
import { Input } from "../form_components/Input";
import SubmitButton from "../form_components/SubmitButton";
import { SelectBox } from "../shared/SelectBox";

function TemplateForm() {
  const templateFormSchema = z.object({
    Template_Name: z.string().min(1, "Please enter a template name"),
    Path: z.string().optional(),
    Github_Link: z.string().optional(),
  });

  const form = useForm({
    schema: templateFormSchema,
  });

  const [templateType, settemplateType] = useState("Local Folder");

  const updateTemplateType = (e: ChangeEvent<HTMLSelectElement>) => {
    settemplateType(e.target.value);
  };

  const templateSubmit = (e: any) => {
    // TODO add adding templates
    console.log(e)
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
        select_name="Location of Template"
        options={["Github Link"]}
        default_option=" Local Folder"
        control={form.control}
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
