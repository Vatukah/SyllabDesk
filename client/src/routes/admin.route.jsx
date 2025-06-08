import { Route } from "react-router";
import AdminWrapper from "../components/adminWrapper";
import AdminProtectedRoute from "../components/adminProtectedRoute";
import AdminDash from "../adminpages/adminDashboard";
import Universities from "../components/university";
import Users from "../adminpages/users";
import courseRoute from "./course.route";


const adminRoute =(<Route
      path="admin"
      element={
        <AdminProtectedRoute>
          <AdminWrapper />
        </AdminProtectedRoute>
      }
    >
      <Route path="dashboard" element={<AdminDash />} />
      <Route path="universities" element={<Universities />} />
      <Route path="users" element={<Users />} />
      {courseRoute}
    </Route>)
export default adminRoute;