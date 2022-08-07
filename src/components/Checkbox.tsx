import { ComponentProps, forwardRef } from "react";
import styled from "styled-components";
import { FieldError } from "./Form";

interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
}

const FormLabel = styled.label`
  align-self: flex-start;
  color: ${(props) => props.theme.colors.text_color};
  font-weight: 650;
  font-size: larger;
`;

const FormCheckbox = styled.input`
    border-radius: 8px;
    margin-top: 1rem;
    font-size: large;
`

const CheckboxDiv = styled.div`
display: inline-block;
`
export const Checkbox = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, type = "text", ...props },
  ref
) {
  return (
    <CheckboxDiv>
      <FormLabel>{label}</FormLabel>
      <FormCheckbox type={type} ref={ref} {...props} />
      <FieldError name={props.name} />
    </CheckboxDiv>
  );
});