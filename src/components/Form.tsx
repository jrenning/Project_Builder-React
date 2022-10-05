
import styled from 'styled-components'

import React from "react";

//reference https://omkarkulkarni.vercel.app/blog/reusable-form-component-in-react-using-react-hook-form-and-zod

// function to resolve zod schema we provide
import { zodResolver } from "@hookform/resolvers/zod";

// We will fully type `<Form />` component by providing component props and fwding // those
import { ComponentProps } from "react";

import {
  // we import useForm hook as useHookForm
  useForm as useHookForm,
  // typescript types of useHookForm props
  UseFormProps as UseHookFormProps,
  // context provider for our form
  FormProvider,
  // return type of useHookForm hook
  UseFormReturn,
  // typescript type of form's field values
  FieldValues,
  // type of submit handler event
  SubmitHandler,
  // hook that would return errors in current instance of form
  useFormContext,
} from "react-hook-form";

// Type of zod schema
import { ZodSchema, TypeOf } from "zod";

const ProjectForm: any = styled.form`
  background-color: ${(props) => props.theme.colors.secondary_color};
  padding: 2rem;
  border-radius: 8px;
`;
const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
  width: auto;
`;

const FieldSet = styled.fieldset`
    outline: none;
    border: none;
    display: flex;
    flex-direction: column;
    input {
      margin-bottom: 2rem;
    }
`

interface FormProps<T extends FieldValues = any>
  extends Omit<ComponentProps<"form">, "onSubmit"> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
}


// We provide additional option that would be our zod schema.
interface UseFormProps<T extends ZodSchema<any>>
  extends UseHookFormProps<TypeOf<T>> {
  schema: T;
}

// applies schema to the form and returns the methods 
export const useForm = <T extends ZodSchema<any>>({
  schema,
  ...formConfig
}: UseFormProps<T>) => {
  return useHookForm({
    ...formConfig,
    resolver: zodResolver(schema),
  });
};

export const Form = <T extends FieldValues>({
	form,
	onSubmit,
	children,
	...props
}: FormProps<T>) => {
	return (
    <FormDiv>
      <FormProvider {...form}>
        {/* the `form` passed here is return value of useForm() hook */}
        <ProjectForm onSubmit={form.handleSubmit(onSubmit)} {...props}>
          <FieldSet disabled={form.formState.isSubmitting}>{children}</FieldSet>
        </ProjectForm>
      </FormProvider>
    </FormDiv>
  );
}

export function FieldError({ name }: { name?: string }) {
  // the useFormContext hook returns the current state of hook form.
  const {
    formState: { errors }
  } = useFormContext<any>();

  if (!name) return null;

  const error = errors[name];

  if (!error) return null;
  //@ts-ignore
  return <span>{error.message}</span>;
}
