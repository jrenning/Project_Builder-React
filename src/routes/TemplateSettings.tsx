import React, { useState } from 'react'
import Header from '../components/shared/Header'
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/Theme";
import TemplateForm from '../components/template/TemplateForm';
import SubHeader from '../components/home/SubHeader';
import TemplateView from '../components/shared/LanguageGridView';
import TemplateBox from '../components/template/TemplateBox';

function TemplateSettings() {
  const [needToUpdateTemplates, setNeedToUpdateTemplates] = useState(false)
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header name="Template Settings" arrow={true} link="/" />
        <SubHeader name="Templates" />
        <TemplateView BoxViewComponent={TemplateBox}/>
        <TemplateForm setNeedToUpdateTemplates={setNeedToUpdateTemplates}/>
      </div>
    </ThemeProvider>
  );
}

export default TemplateSettings