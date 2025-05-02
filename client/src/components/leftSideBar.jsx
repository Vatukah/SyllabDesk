import { useUtility } from "../contexts/utilityContext/utilityProvider"

export default function LeftSideBar({children}){
 const {isLeftSideBar}=useUtility();
    return(
        <div className={`${!isLeftSideBar?"w-0":"w-[16rem] px-2 py-2"} overflow-hidden transition-[width] primary-bg-blur rounded-tl-xxl ${isLeftSideBar?"ml-2":"ml-4"}  `}>
            {children}
        </div>
    )
}