import { Route } from "react-router";
import Login from '../pages/login/login';
import ErrorPage from '../pages/statusPage/error';
import SuccessPage from '../pages/statusPage/success';
import GetEmail from '../pages/passwordReset/getEmail';
import ResetPassword from '../pages/passwordReset/resetPassword';
import AuthCallback from '../components/authCallback';

const authRoutes = (
  <>
    <Route path="/auth/callback" element={<AuthCallback />} />
    <Route path="/auth/:type" element={<Login />} />
    <Route path="/Error/:type" element={<ErrorPage />} />
    <Route path="/success/:type" element={<SuccessPage />} />
    <Route path="/getEmail" element={<GetEmail />} />
    <Route path="/resetPassword" element={<ResetPassword />} />
    <Route path="*" element={<h1> page not found!!!</h1>} />
  </>
);

export default authRoutes