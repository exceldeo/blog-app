import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import Routes from "./routes";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles"; // Removed CssBaseline import
import CssBaseline from "@mui/material/CssBaseline"; // Correct import for CssBaseline
import theme from "./themes";
import { BrowserRouter as Router } from "react-router-dom";
import SearchButton from "./ui-component/Button/SearchButton";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router>
              <SearchButton />
              <ToastContainer />
              <Routes />
            </Router>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
