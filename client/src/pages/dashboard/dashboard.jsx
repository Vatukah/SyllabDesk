import { useEffect } from "react";
import MainContent from "../../components/contentArea/mainContent";
import Navbar from "../../components/navbar/navBar";
import TitleBar from "../../components/titleBar";
import "./dashboard.css"

const Dashboard = () => {

  useEffect(()=>{
   
  },[])
  return (
    <div className="dashboard grid grid-col-1 grid-rows-[min-content_1fr] h-full ">
      <TitleBar role={'dashboard'} />
      <div className="wrapper  ">
        <Navbar />
        {/*main content area */}
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;
