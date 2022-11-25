import React, { useState } from 'react'
import Header from '../components/shared/Header'
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/Theme";
import TemplateForm from '../components/template/TemplateForm';
import SubHeader from '../components/home/SubHeader';
import TemplateView from '../components/shared/LanguageGridView';
import TemplateBox from '../components/template/TemplateBox';
import { useTemplates } from '../hooks/useTemplates';
import { ToastContainer } from 'react-toastify';

function TemplateSettings() {
  const [needToUpdateTemplates, setNeedToUpdateTemplates] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <div>
        <ToastContainer />
        <Header name="Template Settings" arrow={true} link="/" />
        <SubHeader name="Templates" />
        <TemplateView BoxViewComponent={TemplateBox} updater={needToUpdateTemplates} setUpdater={setNeedToUpdateTemplates}/>
        <TemplateForm setNeedToUpdateTemplates={setNeedToUpdateTemplates}/>
      </div>
    </ThemeProvider>
  );
}

export default TemplateSettings