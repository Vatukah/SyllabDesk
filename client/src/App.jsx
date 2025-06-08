import { Routes } from "react-router";
import './App.css'
import allRoutes from "./routes/index";
import { useTheme } from "./contexts/providers/themeProvider";
import { ToastContainer } from "react-toastify";

function App() {
  const { choosenTheme } = useTheme();

  return (
    <>
      <Routes>{allRoutes}</Routes>
      <ToastContainer limit={3} theme={choosenTheme} />
    </>
  );
}

export default App;
