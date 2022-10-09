import React from 'react'
import styled from 'styled-components'

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
}


function SubmitButton({name}: Props) {
  return (
    <SubmitDiv>
        <Button type='submit'>{name}</Button>
    </SubmitDiv>
  )
}

export default SubmitButton