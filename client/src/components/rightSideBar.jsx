import { useUtility } from "../contexts/utilityContext/utilityProvider"

export default function RightSideBar({children}){
   const {isRightSideBar}=useUtility();
    return(
        <div className={`${!isRightSideBar?"w-0":"w-[16rem] px-2 py-2"} overflow-hidden transition-[width] primary-bg-blur rounded-tl-xxl ${isRightSideBar?"ml-2":"ml-4"}  `}>
            {children}
        </div>
    )
}