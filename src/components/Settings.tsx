import React from 'react'
import styled from 'styled-components';
import Button from './Button'

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 4rem;
`;

export default function Settings() {
  return (
    <Controls>
      <Button name="Path Settings" />
      <Button name="File Settings" />
    </Controls>
  );
}
