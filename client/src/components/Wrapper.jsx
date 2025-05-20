import TitleBar from "./titleBar";
import Navbar from "./navbar/navBar";
import MainContent from "./contentArea/mainContent";
import { Outlet } from "react-router";
import UserNav from "./navbar/userNav";
import { useUtility } from "../contexts/providers/utilityProvider";
import LeftSideBar from "./leftSideBar";
import RightSideBar from "./rightSideBar";
export default function Wrapper(){
 const{isUserNav}=useUtility();
     return (
        <div className="wrapper grid grid-col-1 grid-rows-[min-content_1fr] h-[100vh] ">
          <TitleBar/>
          <div className="main ">
          <LeftSideBar/>
            {/*main content area */}
            <MainContent  children={<Outlet/>}/>
          <RightSideBar><UserNav/></RightSideBar>
            {/* <Sidebar/> */}
          </div>
        </div>
      );
}