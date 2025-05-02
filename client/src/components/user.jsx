import { useAuth } from "../contexts/authContext/authProvider"
import avatar from '../assets/avatar.svg';
import { useUtility } from "../contexts/utilityContext/utilityProvider";
export default function User(){
    const {user} = useAuth();
    const {setIsRightSideBar} = useUtility();
    return (
        <div className="flex items-center gap-2">
            
            <div className="w-8 h-8 p-2 rounded-full accent-light" onClick={()=>setIsRightSideBar(prev=> !prev)}>
            <img src={avatar} alt="user dp" className=" w-full mx-auto fill-red-500" />
            </div>
           
        </div>
    )
}