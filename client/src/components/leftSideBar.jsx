import { useEffect } from "react";
import { useLocation } from "react-router";
import { useUtility } from "../contexts/utilityContext/utilityProvider";
import Navbar from "./navbar/navBar";
import SubjectNav from "./navbar/subjectNav";


export default function LeftSideBar({ children }) {
  const { isLeftSideBar, setIsLeftSideBar, leftNavRef } = useUtility();
  const location = useLocation();

  // 👉 Update sidebar visibility based on path
  useEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      setIsLeftSideBar(true);
    } else if (location.pathname.startsWith("/api/search")) {
      setIsLeftSideBar(true);
    } else {
      setIsLeftSideBar(false);
    }
  }, [location.pathname, setIsLeftSideBar]);

  // 👉 Render sidebar component based on path
  const renderSidebar = () => {
    if (location.pathname.startsWith("/admin")) {
      return <Navbar />;
    } else if (location.pathname.startsWith("/api/search")) {
      return <SubjectNav />;
    } else {
      return null;
    }
  };

  return (
    <div
      className={`${!isLeftSideBar ? "w-0" : "w-fit"} max-w-[15rem] overflow-hidden transition-all duration-500 rounded-tr-xxl ${
        isLeftSideBar ? "" : "mr-4"
      }`}
      ref={leftNavRef}
    >
      {renderSidebar()}
    </div>
  );
}
