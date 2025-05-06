import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./styles/index.css";
import App from "./App.jsx";
import ThemeProvider from "./contexts/ThemeContext/themeProvider.jsx";
import AuthProvider from "./contexts/authContext/authProvider.jsx";
import { UtilityProvider } from "./contexts/utilityContext/utilityProvider.jsx";
import SearchProvider from "./contexts/searchContext/searchProvider.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <UtilityProvider>
            <SearchProvider>
              <App />
              </SearchProvider>
          </UtilityProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
