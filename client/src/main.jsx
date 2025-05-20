import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./styles/index.css";
import App from "./App.jsx";
import AuthProvider from "./contexts/providers/authProvider.jsx";
import ThemeProvider from "./contexts/providers/themeProvider.jsx";
import { UtilityProvider } from "./contexts/providers/utilityProvider.jsx";
import CourseOutlineProvider from "./contexts/providers/CourseOutlineProvider.jsx";
import AdminProvider from "./contexts/providers/adminProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AdminProvider>
        <AuthProvider>
          <UtilityProvider>
            <CourseOutlineProvider>
              <App />
            </CourseOutlineProvider>
          </UtilityProvider>
        </AuthProvider>
        </AdminProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
