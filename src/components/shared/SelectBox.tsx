import React, { forwardRef } from "react";
import styled from "styled-components";
import { FormLabel } from "../../styles/FormStyles";
import { UseFormReturn, useFormContext, Controller } from "react-hook-form";
import { FieldError } from "../form_components/Form";

type SelectProps = {
  select_name: string;
  select_label?: string;
  default_option: string;
  options: string[];
  control: any
};

const SelectBoxDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Select = styled.select`
  border-radius: 8px;
  margin-top: 1rem;
  font-size: large;
`;

export const SelectBox = ({ select_name, select_label, default_option, options, control }: SelectProps) => {
    return (
      <Controller
        name={select_name}
        control={control}
        render={({ field}) => (
          <SelectBoxDiv>
            <FormLabel>{select_label}</FormLabel>
            <Select {...field} onChange={(e)=> field.onChange(e.target.value)}>
              <option>{default_option}</option>
              {options.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </Select>
          </SelectBoxDiv>
        )}
      />
    );
  }
