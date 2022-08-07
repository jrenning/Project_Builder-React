import React from 'react'
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/Theme";
import Header from "../components/Header";
function Python() {
  return (
    <ThemeProvider theme={theme}>
      <Header name="Python"></Header>
    </ThemeProvider>
  );
}

export default Python