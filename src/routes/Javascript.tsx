import React from 'react'
import Header from "../components/Header"
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/Theme";
function Javascript() {
  return (
    <ThemeProvider theme={theme}>
      <Header name="Javascript"></Header>
    </ThemeProvider>
  );
}

export default Javascript