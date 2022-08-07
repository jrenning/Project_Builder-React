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
  pointer-events: none;
  height: 7px;
  width: 7px;
`

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
            <BackLink>
              <div
                style={{
                  width: "7px",
                  height: "7px",
                  color: "white",
                  backgroundColor: "white",
                }}
              />
            </BackLink>
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