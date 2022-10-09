
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import Button from './Button'

const LanguageDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 4rem;
`;

function Language() {
  return (
    <LanguageDiv>
      <Link to="/javascript">
        <Button name="Javascript" />
      </Link>
      <Link to="/python">
        <Button name="Python" />
      </Link>
      <Link to="/rust">
        <Button name="Rust" />
      </Link>
    </LanguageDiv>
  );
}

export default Language