import React from 'react'
import Header from "../components/shared/Header";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/Theme";
import JavascriptForm from "../components/javascript/JavascriptForm";
import styled from 'styled-components';
import PathForm from '../components/path/PathForm';


const PathDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: .3rem;
`

function PathSettings() {
  return (
    <ThemeProvider theme={theme}>
      <Header name="Path Settings" arrow={true} link="/"></Header>
      <PathDiv>
        <PathForm name="Python" />
      </PathDiv>
    </ThemeProvider>
  )
}

export default PathSettings