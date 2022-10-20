
import "./components/shared/Header";
import Header from "./components/shared/Header";
import Language from "./components/home/Language";
import Settings from "./components/home/Settings";
import SubHeader from "./components/home/SubHeader";
import Themes from "./components/Themes";
import GlobalStyle from "./styles/globalStyles";
import { ThemeProvider } from "styled-components";
import {theme} from "./styles/Theme"
import {ToastContainer, toast} from "react-toastify"



function App() {
  return (
    <>
    <ToastContainer />
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
