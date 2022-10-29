import React, { Component } from 'react'
import styled from 'styled-components'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from 'react-router-dom';


const LandingHeader = styled.header`
  background-color: ${(props) => props.theme.colors.secondary_color};
  font-size: large;
  width: 100%;
`;

const LandingText = styled.div`
  color: white;
  font-size: xx-large;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackLink = styled.div`
  cursor: pointer;
  text-decoration: none;
  color: whitesmoke;
  font-size: 16pt;
  padding-right: 1rem;

`

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`


type Props = {
  name: string
  arrow?: boolean
  link?: string
}





function Header({name, arrow, link}: Props) {
  return (
    <LandingHeader>
      <HeaderDiv>
        {arrow && link ? (
          <Link to={link}>
            <BackLink>&#8592;</BackLink>
          </Link>
        ) : (
          ""
        )}
        <LandingText> {name} </LandingText>
      </HeaderDiv>
    </LandingHeader>
  );
}

export default Header