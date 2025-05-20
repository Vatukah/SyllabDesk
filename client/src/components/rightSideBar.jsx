import { useEffect } from "react";
import { useUtility } from "../contexts/providers/utilityProvider";
import UserNav from "./navbar/userNav";
import UserInfo from "./adminComponents/userInfo";

export default function RightSideBar({ children }) {
  const { isRightSideBar, rightNavRef, leftNavRef, setIsRightSideBar ,rightSideBarView} =
    useUtility();

  useEffect(() => {
    const handleCloseRightNav = (event) => {
      if (!isRightSideBar) return;

      if (
        event.target !== rightNavRef.current &&
        !rightNavRef.current.contains(event.target)
      ) {
        // Close the sidebar here
        setIsRightSideBar(false);
      }
    };
    document.addEventListener("click", handleCloseRightNav);

    return () => {
      document.removeEventListener("click", handleCloseRightNav);
    };
  });
  return (
    <div
      className={`${
        !isRightSideBar ? "w-0" : "w-[16rem] px-2 py-2"
      } overflow-hidden transition-[width]  rounded-tl-xl ${
        isRightSideBar ? "ml-2" : "ml-4"
      } 
      ${rightSideBarView==="home"?"accent-light":"primary-bg"} `}
      ref={rightNavRef}
    >
   
      {rightSideBarView === "home"?<UserNav/>:<UserInfo/>}
    </div>
  );
}
