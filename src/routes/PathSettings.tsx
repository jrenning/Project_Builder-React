import React, { useState } from 'react'
import Header from "../components/shared/Header";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/Theme";
import JavascriptForm from "../components/javascript/JavascriptForm";
import styled from 'styled-components';
import PathForm from '../components/path/PathForm';
import { FormLabel } from '../styles/FormStyles';
import TemplateView from '../components/shared/LanguageGridView';
import PathBox from '../components/path/PathBox';
import { ToastContainer } from 'react-toastify';


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

  const [needToUpdatePaths, setNeedToUpdatePaths] = useState(false)
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Header name="Path Settings" arrow={true} link="/"></Header>
      <TemplateView BoxViewComponent={PathBox} updater={needToUpdatePaths} setUpdater={setNeedToUpdatePaths} />
      <PathTitle>Choose Default Path</PathTitle>
      <PathDiv>
        <PathForm names={["Python", "Javascript", "Rust"]} setUpdater={setNeedToUpdatePaths} />
      </PathDiv>
    </ThemeProvider>
  );
}

export default PathSettings