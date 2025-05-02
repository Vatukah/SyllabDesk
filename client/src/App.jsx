import { Routes, Route } from "react-router";
import Dashboard from "./pages/dashboard/dashboard";
import Home from "./pages/home/home";
import "./App.css";
import PrivateRoute from "./components/privateRoute";
import Login from "./pages/login/login";
import ErrorPage from "./pages/statusPage/error";

import SuccessPage from "./pages/statusPage/success";
import Wrapper from "./components/Wrapper";
import ResetPassword from "./pages/passwordReset/resetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Wrapper />} >
       <Route path="/" element={<Home/>}/>
       <Route path="dashboard" element={<PrivateRoute children={<Dashboard />}/>}/>
      </Route>
      
      <Route path="/auth/:type" element={<Login />} />
      <Route path="/Error/:type" element={<ErrorPage />} />
      <Route path="/success/:type" element={<SuccessPage />} />
      <Route path="/resetPassword" element={<ResetPassword/>}/>
      <Route path="*" element={<h1> page not found!!!</h1>} />
    </Routes>
  );
}

export default App;
