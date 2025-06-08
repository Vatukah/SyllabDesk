import { Route } from "react-router";
import Wrapper from "../components/Wrapper";
import Home from "../pages/home/home";
import CourseContent from "../pages/search/courseContent";
import PrivateRoute from "../components/privateRoute";
import Dashboard from "../pages/dashboard/dashboard";
import Notes from "../pages/notes/notes";
import adminRoute from "./admin.route";
const appRoute = (
  <Route path="/" element={<Wrapper />}>
    <Route path="/" element={<Home />} />
    <Route path="api/search/:course" element={<CourseContent />} />
    <Route
      path="dashboard"
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    />
    <Route path="notes" element={<Notes />} />
    {adminRoute}
  </Route>
);

export default appRoute;