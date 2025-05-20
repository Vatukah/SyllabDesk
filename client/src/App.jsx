import { Routes, Route } from "react-router";
import Dashboard from "./pages/dashboard/dashboard";
import Home from "./pages/home/home";
import "./App.css";
import PrivateRoute from "./components/privateRoute";
import Login from "./pages/login/login";
import ErrorPage from "./pages/statusPage/error";
import { ToastContainer } from "react-toastify";
import SuccessPage from "./pages/statusPage/success";
import Wrapper from "./components/Wrapper";
import ResetPassword from "./pages/passwordReset/resetPassword";
import GetEmail from "./pages/passwordReset/getEmail";
import { useTheme } from "./contexts/providers/themeProvider";
import AdminDash from "./adminpages/adminDashboard";
import AdminWrapper from "./components/adminWrapper";
import Universities from "./adminpages/universities";
import Courses from "./adminpages/courses";
import Users from "./adminpages/users";
import AdminProtectedRoute from "./components/adminProtectedRoute";
import AuthCallback from "./components/authCallback";
import CourseContent from "./pages/search/courseContent";

function App() {
  const { choosenTheme } = useTheme();

  return (
    <>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="api/search/:subject" element={<CourseContent />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="admin"
            element={
              <AdminProtectedRoute>
                <AdminWrapper />
              </AdminProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDash />} />
            <Route path="universities" element={<Universities />} />
            <Route path="courses" element={<Courses />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Route>
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/auth/:type" element={<Login />} />
        <Route path="/Error/:type" element={<ErrorPage />} />
        <Route path="/success/:type" element={<SuccessPage />} />
        <Route path="/getEmail" element={<GetEmail />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="*" element={<h1> page not found!!!</h1>} />
      </Routes>
      <ToastContainer limit={3} theme={choosenTheme} />
    </>
  );
}

export default App;
