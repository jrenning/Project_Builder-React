import React, { forwardRef } from "react";
import styled from "styled-components";
import { FormLabel } from "../../styles/FormStyles";
import { UseFormReturn } from "react-hook-form";

type SelectProps = {
  select_name: string;
  default_option: string;
  options: string[];
  onChange: any;
  form?: any;
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
  function SelectBox(
    { select_name, default_option, options, onChange, form },
    ref
  ) {
    return (
      <SelectBoxDiv>
        <FormLabel>{select_name}</FormLabel>
        <Select
          onChange={onChange}
          ref={ref}
          {...form.register(select_name, { onChange: onChange })}
        >
          <option>{default_option}</option>
          {options.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </Select>
      </SelectBoxDiv>
    );
  }
);
