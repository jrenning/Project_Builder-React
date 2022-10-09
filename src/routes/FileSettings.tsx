import React from 'react'
import Header from '../components/shared/Header'
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/Theme";
import TemplateForm from '../components/template/TemplateForm';

function FileSettings() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header name="Template Settings" arrow={true} link="/" />
        <TemplateForm />
      </div>
    </ThemeProvider>
  );
}

export default FileSettings