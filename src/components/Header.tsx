import React, { Component } from 'react'
import styled from 'styled-components'


const LandingHeader = styled.header`
  background-color: ${(props) => props.theme.colors.secondary_color};
  font-size: large;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const LandingText = styled.div`
  color: white;
  font-size: xx-large;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: 65px;
`;

type Props = {
  name: string
}

function Header({name}: Props) {
  return (
    <LandingHeader>
      <div>
        <LandingText> {name} </LandingText>
      </div>
    </LandingHeader>
  );
}

export default Header