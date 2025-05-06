import { Navigate } from "react-router";
import { useAuth } from "../contexts/authContext/authProvider";

export default function AdminProtectedRoute({ children }) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {user?.user_metadata?.role === "admin" && isAdmin ? (
        children
      ) : (
        <Navigate to={"/notAuthorized"} />
      )}
    </>
  );
}
