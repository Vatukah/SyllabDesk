import { useEffect } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "../config/apiUrl";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));

    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (!access_token || !refresh_token) {
      console.error("Tokens not found in URL");
      return navigate("/auth/signup");
    
    }

    // Send tokens to backend to set cookies
    fetch(`${API_URL}auth/set-cookie`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token, refresh_token }),
    })
      .then((res) => {
        if (res.ok) {
         window.location.href="/dashboard";
        } else {
          throw new Error("Failed to set cookies");
        }
      })
      .catch((err) => {
        console.error(err);
        window.location.href="/auth/signup";
      });
  }, [navigate]);

  return <div>Signing you in...</div>;
}
