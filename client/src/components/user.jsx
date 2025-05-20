import { useAuth } from "../contexts/providers/authProvider"
import avatar from '../assets/avatar.svg';
import { useUtility } from "../contexts/providers/utilityProvider";
export default function User(){
    const {user} = useAuth();
    const {setIsRightSideBar,setRightSideBarView} = useUtility();
    return (
        <div className="flex items-center gap-2 select-none">
            
            <div className="w-8 h-8 p-2 rounded-full accent-light" onClick={(e)=>{
                e.stopPropagation();
                setRightSideBarView("home")
                setIsRightSideBar(prev=> !prev)}
                }>
            <img src={avatar} alt="user dp" className=" w-full mx-auto fill-red-500" />
            </div>
           
        </div>
    )
}