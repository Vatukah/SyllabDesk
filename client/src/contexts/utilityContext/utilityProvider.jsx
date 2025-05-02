import { useContext, useState } from "react";
import utility from "./utility";

export const UtilityProvider=({children})=>{
     const [isLeftSideBar,setIsLeftSideBar] = useState(false);
     const [isRightSideBar,setIsRightSideBar] = useState(false);
     const [rightSideBarView,setRightSideBarView] = useState("home");
    return(
        <utility.Provider value={{isLeftSideBar,setIsLeftSideBar,isRightSideBar,setIsRightSideBar,rightSideBarView,setRightSideBarView}}>
            {children}
        </utility.Provider>
    )
}
export const useUtility=()=> useContext(utility);