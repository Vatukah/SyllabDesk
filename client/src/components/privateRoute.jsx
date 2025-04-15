import { Navigate } from "react-router";

export default function PrivateRoute ({children}){
  
    const user =true;

   return(<> {user?children:<Navigate to={'/'}/>}</>)
}