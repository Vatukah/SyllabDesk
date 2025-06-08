import { useState } from "react";
import { API_URL } from "../../config/apiUrl";

export default function useUserApi(){
    
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(null);

    const updateUniversity = async (payload)=>{
    setError(null);
    setIsLoading(true);
    const response = await fetch(`${API_URL}user/update_university`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(payload),
        credentials: "include",
    })
    setIsLoading(false);

     const data = await response.json();

     if(!response.ok){
         setError(data.message);
     }
     
     return data.updatedProfile;
    }

    return {updateUniversity,isLoading,error};
}