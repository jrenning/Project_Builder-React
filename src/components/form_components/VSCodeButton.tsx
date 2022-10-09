import React from 'react'
import styled from 'styled-components'
import { openVsCode } from '../shared/sharedCommands'

type Props = {
    path: string
}

const VSCodeDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    padding: 5px;
    border-radius: 8px;
`

const VSCode = styled.button`
  font-size: large;
  background-color: ${(props) => props.theme.colors.secondary_color};
  padding: .5rem;
  border-radius: 8px;
  :hover {
    opacity: .75;
  }
`;

function VSCodeButton({path}: Props) {
  return (
    <VSCodeDiv>
    <VSCode onClick={(e) => openVsCode(path)}>Open VSCode</VSCode>
    </VSCodeDiv>
  )
}

export default VSCodeButton