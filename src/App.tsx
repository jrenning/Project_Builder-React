
import "./components/Header";
import Header from "./components/Header";
import Language from "./components/Language";
import Settings from "./components/Settings";
import SubHeader from "./components/SubHeader";
import Themes from "./components/Themes";
import GlobalStyle from "./styles/globalStyles";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import {theme} from "./styles/Theme"



function App() {
  return (
    <>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Header name="Creation"/>
          <Themes />
          <SubHeader name="Language Selection" />
          <Language />
          <SubHeader name="Path Settings" />
          <Settings />
        </ThemeProvider>
    </>
  );
}

export default App;
