import React from "react";
import { z } from "zod";
import { Form, useForm } from "../form_components/Form";
import { Input } from "../form_components/Input";

function TemplateForm() {
  const templateFormSchema = z.object({
    Template_Name: z.string().min(1, "Please enter a template name"),
    Template_Location: z.string(),
  });

  const form = useForm({
    schema: templateFormSchema,
  });

  const templateSubmit = () => {};

  return (
    <Form form={form} onSubmit={templateSubmit}>
      <Input
        label="Template Name"
        type="text"
        name="Template Name"
        placeholder="Template Name"
      />

      
    </Form>
  );
}

export default TemplateForm;
