import { useContext, useEffect, useState } from "react";
import authContext from "./auth";

export default function AuthProvider({children}){
       const [user,setUser] = useState(null);
       const [session,setSession] = useState(null)
    
        const getUser=async()=>{

           const response = await fetch('http://localhost:5000/dashboard',{method:"GET"});
           const data = response.text();
           console.log(data)
        }

       useEffect(()=>{
          getUser();
          console.log("auth provider")
       },[user,session])
    return(
        <authContext.Provider value={{user,session}}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth=()=> useContext(authContext);

