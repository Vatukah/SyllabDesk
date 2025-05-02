import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/authContext/authProvider";


export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>; // Or any loading UI

  return user ? (
    children
  ) : (
    <Navigate to="/auth/signin" replace state={{ from: location }} />
  );
}
