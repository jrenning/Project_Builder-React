import React, { forwardRef } from 'react'
import styled from "styled-components";
import { FormLabel } from "../../styles/FormStyles";

type Props = {
    default_option: string
    options: string[]
    select_name: string
}

type SelectProps = {
  select_name: string
  default_option: string
  options: string[]
  onChange: any
}

const SelectBoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  
`

const Select = styled.select`
  border-radius: 8px;
  margin-top: 1rem;
  font-size: large;
`;

export const SelectBox = forwardRef<HTMLSelectElement, SelectProps>(function SelectBox(
  {select_name,default_option,options, onChange}, ref
)  {
  return (
    <SelectBoxDiv>
    <FormLabel>{select_name}</FormLabel>
    <Select onChange={onChange}>
        <option>{default_option}</option>
        {options.map((option, index) => (
            <option key={index}>{option}</option>
        ))}
    </Select>
    </SelectBoxDiv>
  )
})