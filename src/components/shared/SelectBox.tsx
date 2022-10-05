import React, { forwardRef } from 'react'


type Props = {
    default_option: string
    options: string[]
    select_name: string
}

type SelectProps = {
  select_name: string
  default_option: string
  options: string[]
}

export const SelectBox = forwardRef<HTMLSelectElement, SelectProps>(function SelectBox(
  {select_name,default_option,options}, ref
)  {
  return (
    <>
    <label>{select_name}</label>
    <select>
        <option>{default_option}</option>
        {options.map((option, index) => (
            <option key={index}>{option}</option>
        ))}
    </select>
    </>
  )
})