import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import Routes from "./routes";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./themes";
import { BrowserRouter as Router } from "react-router-dom";
import SearchButton from "./ui-component/Button/SearchButton";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// Removed imports related to @mui/x-date-pickers-pro and AdapterDayjs due to errors

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          {/* Removed LocalizationProvider due to errors */}
          <PersistGate loading={null} persistor={persistor}>
            <Router>
              <SearchButton />
              <ToastContainer />
              <Routes />
            </Router>
          </PersistGate>
          {/* End of removed LocalizationProvider */}
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
