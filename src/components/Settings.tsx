import React from 'react'
import { Link } from 'react-router-dom';
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
      <Link to="/path_settings">
        <Button name="Path Settings" />
      </Link>
      <Link to="/file_settings">
        <Button name="File Settings" />
      </Link>
    </Controls>
  );
}
