import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import illustration from "../../assets/reset_password.svg"; // ← Add a vector illustration to this path
import "./resetPassword.css";
import { showInfo, toastWithServerMessage } from "../../services/toastify";
import { API_URL } from "../../config/apiUrl";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (password !== confirm) {
      setStatus("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.slice(1));

      const accessToken = params.get("access_token");

      const data = await toastWithServerMessage(fetch(`${API_URL}reset_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ newPassword: password }),
      }));

    if(data){
      showInfo("redirecting to Sign in page...");
      setTimeout(()=>{
        navigate('/auth/signin',{replace:true});
      },[3000])
    }

    } catch (error) {
      console.error(error)
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));

    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken && refreshToken) {
      console.log(accessToken);
      console.log(refreshToken);
      // Store both tokens
      // localStorage.setItem("access_token", accessToken);
      // localStorage.setItem("refresh_token", refreshToken);

      // document.cookie = `access_token=${accessToken}; path=/; max-age=${
      //   60 * 60
      // }; secure; samesite=strict`;
      // document.cookie = `refresh_token=${refreshToken}; path=/; max-age=${
      //   60 * 60 * 24 * 30
      // }; secure; samesite=strict`;

      // // Clean URL
      // window.history.replaceState(null, null, window.location.pathname);
    }
  }, []);

  return (
    <div className="syllabdesk-reset-container">
      <div className="reset-card">
        <div className="reset-illustration">
          <img src={illustration} alt="Reset illustration" />
        </div>

        <div className="reset-form">
          <h2 className="reset-title">Reset Your Password</h2>

          <input
            className="reset-input"
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="reset-input"
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button
            className="reset-button"
            onClick={handleResetPassword}
            disabled={loading}
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

          {status && <p className="reset-status">{status}</p>}
        </div>
      </div>
    </div>
  );
}
