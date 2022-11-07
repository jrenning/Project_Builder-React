import React from 'react'
import Header from '../components/shared/Header'
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/Theme";
import RustForm from '../components/rust/RustForm';

function Rust() {
  return (
    <ThemeProvider theme={theme}>
      <Header name="Rust" arrow={true} link="/" />
      <RustForm />
    </ThemeProvider>
  );
}

export default Rust