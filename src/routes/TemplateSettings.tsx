import React from 'react'
import Header from '../components/shared/Header'
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/Theme";
import TemplateForm from '../components/template/TemplateForm';
import SubHeader from '../components/home/SubHeader';
import TemplateView from '../components/template/TemplateView';

function TemplateSettings() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header name="Template Settings" arrow={true} link="/" />
        <TemplateForm />
        <SubHeader name="Templates"/>
        <TemplateView />
      </div>
    </ThemeProvider>
  );
}

export default TemplateSettings