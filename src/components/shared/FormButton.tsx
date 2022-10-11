import React from 'react'
import styled from "styled-components";

export const SubmitDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;

`

export const Button = styled.button`
border-radius: 8px;
padding: .25rem .75rem;
&:hover {
    background-color: darkblue;
    color: white;
}
    
`
type Props = {
    name: string
    onClick: any
}

function FormButton({name, onClick}: Props) {
  return (
    <SubmitDiv>
        <Button onClick={onClick}>{name}</Button>
    </SubmitDiv>
  )
}

export default FormButton