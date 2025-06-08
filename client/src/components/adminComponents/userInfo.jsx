import { useEffect } from "react"
import { useUtility } from "../../contexts/providers/utilityProvider"
import { API_URL } from "../../config/apiUrl"

export default function UserInfo(){
   
    const {currentUserInfo} = useUtility()

    useEffect(()=>{
       const fetchUser = async()=>{
        try{
            const response = await fetch(`${API_URL}`)
        }catch(error){

        }
       }
    },[currentUserInfo])
    return(
        <div>
    {currentUserInfo}
        </div>
    )
}