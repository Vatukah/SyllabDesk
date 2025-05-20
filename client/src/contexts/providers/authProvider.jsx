import { useContext, useEffect, useState } from "react";
import { authContext } from "../allContexts.js";


export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:5008/session", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        
        setUser(null);
        setIsAdmin(false);
        return;
      }

      const {user} = await response.json();
     
      const role = user?.user_metadata?.role;
      setUser(user);
      setIsAdmin(role === "admin");
    } catch (error) {
      console.error("AuthProvider Error:", error);
      setUser(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser(); // fetch on mount once
     // Periodically refresh session every 5 minutes (300 seconds)
     const interval = setInterval(async () => {
      try {
        const response = await fetch("http://localhost:5008/auth/refresh", {
          method: "GET",
          credentials: "include", // Ensures cookies are sent with the request
        });

        if (response.ok) {
          console.log("🔄 Session refreshed successfully");
        } else {
          console.error("❌ Failed to refresh session");
        }
      } catch (err) {
        console.error("Error refreshing session:", err);
      }
    }, 5 * 60 * 1000); // Refresh every 5 minutes

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <authContext.Provider value={{ user, isAdmin, loading, setUser, setLoading }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
