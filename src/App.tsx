
import "./components/shared/Header";
import Header from "./components/shared/Header";
import Language from "./components/home/Language";
import Settings from "./components/home/Settings";
import SubHeader from "./components/home/SubHeader";
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
          <SubHeader name="Extra Settings" />
          <Settings />
        </ThemeProvider>
    </>
  );
}

export default App;
