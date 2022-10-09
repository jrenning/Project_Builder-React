import React from 'react'
import Header from "../components/shared/Header"
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/Theme";
import JavascriptForm from '../components/javascript/JavascriptForm';
function Javascript() {
  return (
    <ThemeProvider theme={theme}>
      <Header name="Javascript" arrow={true} link="/" ></Header>
      <JavascriptForm />
    </ThemeProvider>
  );
}

export default Javascript