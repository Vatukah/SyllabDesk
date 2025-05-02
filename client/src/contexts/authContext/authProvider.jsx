import { useContext, useEffect, useState } from "react";
import authContext from "./auth";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:5008/dashboard", {
        method: "GET",
        credentials: "include",
      });

      if ([401, 500].includes(response.status) || !response) {
        const error = await response.json();
        setUser(null);
        console.log(error)
        return;
      }

      const data = await response.json();
      console.log(data);
      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
    // // Get the hash from the URL
    // const hash = window.location.hash; // "#access_token=..."
    // const params = new URLSearchParams(hash.slice(1));
    // const token = params.get("access_token");

    // if (token) {
    //   // ✅ Store in localStorage
    //   localStorage.setItem("access_token", token);

    //   // ✅ Store in cookie (expires in 7 days)
    //   document.cookie = `access_token=${token}; path=/; max-age=${
    //     60 * 60 * 24 * 7
    //   }; secure; samesite=strict`;

    //   // ✅ Optional: Clean the URL
    //   window.history.replaceState(null, null, window.location.pathname);
    // }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);
  return (
    <authContext.Provider value={{ user, loading, setLoading, setUser }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
