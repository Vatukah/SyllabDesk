import { useEffect } from "react";
import MainContent from "../../components/contentArea/mainContent";
import Navbar from "../../components/navbar/navBar";
import TitleBar from "../../components/titleBar";
import "./dashboard.css";
import Sidebar from "../../components/sidebar/sidebar";
import { useAuth } from "../../contexts/authContext/authProvider";

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
    <div >
     <h1 className="px-6">dashboard</h1>
    </div>
  );
};

export default Dashboard;
