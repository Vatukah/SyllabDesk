import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import illustration from "../../assets/reset_password.svg"; // ← Add a vector illustration to this path
import "./resetPassword.css"; 

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

    
  };

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
