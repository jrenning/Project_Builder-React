import React from "react";
import { Form, useForm } from "../Form";
import { Input } from "../Input";
import { z } from "zod";
import { Checkbox } from "../Checkbox";
import SubmitButton from "../SubmitButton";
import { JavascriptSubmit } from "./FormSubmit";

const formSchema = z.object({
  Project_Name: z.string().min(1, "Please enter a name"),
  Github_Link: z.string().optional(),
  React: z.boolean().optional(),
  Git_Setup: z.boolean().optional()
});

export default function JavascriptForm() {
  const form = useForm({
    schema: formSchema,
  });
  return (
    <Form form={form} onSubmit={JavascriptSubmit}>
      <Input
        label="Project Name"
        type="text"
        placeholder="Project Name"
        {...form.register("Project_Name")}
      />
      <Input
        label="Github Link"
        type="text"
        placeholder="Github Link"
        {...form.register("Github_Link")}
      ></Input>
      <Checkbox label="React" type="checkbox" {...form.register("React")}></Checkbox>
      <Checkbox label="Git Setup" type="checkbox" {...form.register("Git_Setup")}></Checkbox>
      <SubmitButton name="Submit Me" />
    </Form>
  );
}