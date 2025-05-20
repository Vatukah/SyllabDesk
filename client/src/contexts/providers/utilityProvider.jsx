import { useContext, useRef, useState } from "react";
import {utility} from "../allContexts.js";

export const UtilityProvider=({children})=>{
     const [isLeftSideBar,setIsLeftSideBar] = useState(false);
     const [isRightSideBar,setIsRightSideBar] = useState(false);
     const [rightSideBarView,setRightSideBarView] = useState("home");
     const [currentUserInfo,setCurrentUserInfo] = useState("");
     const rightNavRef = useRef(null);
     const leftNavRef = useRef(null);
    return(
        <utility.Provider value={{isLeftSideBar,setIsLeftSideBar,isRightSideBar,setIsRightSideBar,rightSideBarView,setRightSideBarView,rightNavRef,leftNavRef,currentUserInfo,setCurrentUserInfo}}>
            {children}
        </utility.Provider>
    )
}
export const useUtility=()=> useContext(utility);