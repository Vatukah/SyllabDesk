import { useEffect } from "react";
import "./dashboard.css";
import WelcomeMessage from "../../components/welcomeMessage";
import banner from '../../assets/Learning-bro.svg';
import banner1 from '../../assets/Education-pana.svg';
import StatCard from "../../components/cards/statCard";
import { AcademicCapIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import CTA_btn from "../../components/buttons/CTA_btn";

const Dashboard = () => {
  
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));

    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken && refreshToken) {
      // Store both tokens
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      document.cookie = `access_token=${accessToken}; path=/; max-age=${
        60 * 60 * 24 * 7
      }; secure; samesite=strict`;
      document.cookie = `refresh_token=${refreshToken}; path=/; max-age=${
        60 * 60 * 24 * 30
      }; secure; samesite=strict`;

      // Clean URL
      window.history.replaceState(null, null, window.location.pathname);
    }
   
  }, []);
  
  return (
    <div className=" p-2">
      <div className="flex  justify-between w-full h-72 border border-[rgba(var(--accent-light),.8)] bg-[rgba(var(--accent-light),.5)] rounded-md overflow-hidden relative">
        <div className="absolute top-[50%] left-6 translate-y-[-50%]"> <WelcomeMessage/></div>
        <img src={banner1} alt="" className=" w-fit object-fit ml-auto " />
      </div>
       
       <div className="my-2 p-2 bg-[var(--bg-blur-color)]">
        <h2>Academic Details</h2>
        <div className="flex gap-md m-md">
          <div className="primary-bg p-sm rounded-md w-fit">
            <div className="flex gap-sm mb-sm">
              <AcademicCapIcon className="w-6 text-accent"/>
              <h3>University</h3>
            </div>
            {false?<div>ITM </div>: <CTA_btn text={"Select University"}/>}
          </div>
          <div className="primary-bg p-sm rounded-md w-fit">
            <div className="flex gap-sm mb-sm">
              <BookOpenIcon className="w-6 text-accent"/>
              <h3>Programme</h3>
            </div>
            {false?<div>ITM </div>: <CTA_btn text={"Select Programme"}/>}
          </div>
        </div>
        
       </div>
    
  
    </div>
  );
};

export default Dashboard;
