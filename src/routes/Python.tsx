import React from 'react'
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/Theme";
import Header from "../components/shared/Header";
import PythonForm from '../components/python/PythonForm';
function Python() {
  return (
    <ThemeProvider theme={theme}>
      <Header name="Python" arrow={true} link="/"></Header>
      <PythonForm />
    </ThemeProvider>
  );
}

export default Python