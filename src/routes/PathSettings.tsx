import React from 'react'
import Header from "../components/shared/Header";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/Theme";
import JavascriptForm from "../components/javascript/JavascriptForm";
import styled from 'styled-components';
import PathForm from '../components/path/PathForm';
import { FormLabel } from '../styles/FormStyles';
import TemplateView from '../components/template/TemplateView';
import PathBox from '../components/path/PathBox';


const PathDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const PathTitle = styled.h1`
  display: flex;
  justify-content: center;
  color: whitesmoke;
  align-items: center;
`

function PathSettings() {
  return (
    <ThemeProvider theme={theme}>
      <Header name="Path Settings" arrow={true} link="/"></Header>
      <TemplateView BoxViewComponent={PathBox} />
      <PathTitle>Choose Default Path</PathTitle>
      <PathDiv>
        <PathForm names={["Python", "Javascript", "Rust"]} />
      </PathDiv>
    </ThemeProvider>
  );
}

export default PathSettings