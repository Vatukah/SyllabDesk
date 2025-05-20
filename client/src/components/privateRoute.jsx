import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/providers/authProvider";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>; // Or any loading UI
  if (!user){
    return <Navigate to="/auth/signin" replace state={{ from: location }} />;
  }
  
  return <>{children}</>;
}
