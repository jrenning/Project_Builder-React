import { ComponentProps, forwardRef } from "react";
import styled from "styled-components";
import { FieldError } from "./Form";
import {FormLabel} from "../styles/FormStyles"

interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder: string
}

const FormStack = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    outline: none;
`
// export const FormLabel = styled.label`
//   align-self: flex-start;
//   color: ${(props) => props.theme.colors.text_color};
//   font-weight: 650;
//   font-size: larger;
// `;

const FormTextInput = styled.input`
    border-radius: 8px;
    margin-top: 1rem;
    font-size: large;
`
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, type = "text", ...props },
  ref
) {
  return (
    <FormStack>
      <FormLabel>{label}</FormLabel>
      <FormTextInput type={type} ref={ref} {...props} />
      <FieldError name={props.name} />
    </FormStack>
  );
});
