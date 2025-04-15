import { Routes, Route } from "react-router";
import Dashboard from "./pages/dashboard/dashboard";
import Home from "./pages/home/home";
import "./App.css";
import PrivateRoute from "./components/privateRoute";
import Login from "./pages/login/login";


function App() {
  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth/:type" element={<Login/>}/>
        <Route path="*" element={<h1> page not found!!!</h1>} />
      </Routes>
  
  );
}

export default App;
