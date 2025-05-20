import { useEffect } from "react"
import { useUtility } from "../../contexts/providers/utilityProvider"

export default function UserInfo(){
   
    const {currentUserInfo} = useUtility()

    useEffect(()=>{
    
    },[currentUserInfo])
    return(
        <div>
    {currentUserInfo}
        </div>
    )
}