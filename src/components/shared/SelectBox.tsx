import React, { forwardRef } from "react";
import styled from "styled-components";
import { FormLabel } from "../../styles/FormStyles";
import { UseFormReturn, useFormContext, Controller } from "react-hook-form";
import { FieldError } from "../form_components/Form";

type SelectProps = {
  select_name: string;
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

export const SelectBox = forwardRef<HTMLSelectElement, SelectProps>(
  function SelectBox({ select_name, default_option, options, control }, ref) {
    return (
      <Controller
        name={select_name}
        control={control}
        render={({ field: { onChange, ref } }) => (
          <SelectBoxDiv>
            <FormLabel>{select_name}</FormLabel>
            <Select ref={ref}>
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
);
