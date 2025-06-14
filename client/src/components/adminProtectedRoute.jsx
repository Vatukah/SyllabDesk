import { Navigate } from "react-router";
import { useAuth } from "../contexts/providers/authProvider";

export default function AdminProtectedRoute({ children }) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // return (
  //   <>
  //     {user?.role === "admin" && isAdmin ? (
  //       children
  //     ) : (
  //       <Navigate to={"/notAuthorized"} />
  //     )}
  //   </>
  // );
  return (<>{children}</>)
}
