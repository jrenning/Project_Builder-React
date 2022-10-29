import React from 'react'
import Header from '../components/shared/Header'
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/Theme";

function Rust() {
  return (
    <ThemeProvider theme={theme}>
      <Header name="Rust" arrow={true} link="/" />
    </ThemeProvider>
  );
}

export default Rust