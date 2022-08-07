import React from "react";
import { Form, useForm } from "../Form";
import { Input } from "../Input";
import { z } from "zod";
import { Checkbox } from "../Checkbox";
import SubmitButton from "../SubmitButton";

const formSchema = z.object({
  Project_Name: z.string().min(1, "Please enter a name"),
  Github_Link: z.string().optional(),
  React: z.string().optional(),
});

export default function JavascriptForm() {
  const form = useForm({
    schema: formSchema,
  });
  return (
    <Form form={form} onSubmit={(values) => console.log(values)}>
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
      <SubmitButton name="Submit Me" />
    </Form>
  );
}
