import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../../contexts/providers/authProvider";

import "./login.css";
import image from "../../assets/loginImage.svg";
import { showError } from "../../services/toastify";
export default function Login({ prop }) {
  const param = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [isSignin,setIsSignin] = useState(false);

  const { setUser } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (email.length === 0 || password.length === 0)
      return showError("Fill the required fields");
    try {
      setIsSignin(true);
      const res = await fetch("http://localhost:5008/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Important to send cookies
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 200) {
        const { user } = await res.json();
        setUser(user);
        navigate("/dashboard");
      } else {
        const data = await res.json();
        showError(data.message);
      }
    } catch (err) {
      showError(err.message);
    }finally{
      setIsSignin(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0 || username.length === 0)
      return showError("Fill the required fields");
    try {
      setIsSignin(true)
      const res = await fetch("http://localhost:5008/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, username }),
      });
      if (res.status === 200) {
        return navigate("/success/successfull_login");
      }

      const error = await res.json();
      showError(error.message);
    } catch (error) {
      showError(error.message);
    }finally{
      setIsSignin(false);
    }
  };

  return (
    <div className="login">
      <div className="login__content">
        <div className="login__img">
          <img src={image} alt="" />
        </div>

        <div className="login__forms">
          <form
            onSubmit={handleSignIn}
            className={`login__registre ${
              param.type === "signin" ? "block" : "none"
            }`}
            id="login-in"
          >
            <h1 className="login__title">Sign In</h1>

            <div className="login__box">
              <i className="bx bx-user login__icon"></i>
              <input
                type="email"
                placeholder="Email"
                className="login__input"
                name="email"
                value={email}
                onInput={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login__box">
              <i className="bx bx-lock-alt login__icon"></i>
              <input
                type="password"
                placeholder="Password"
                className="login__input"
                name="password"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              />
            </div>

            <div
              className="login__forgot"
              onClick={() => navigate("/getEmail")}
            >
              Forgot password?
            </div>

            {/* <a href="#" className="login__button" onClick={handleSignIn}>Sign In</a> */}
            <input type="submit" value={isSignin?"Signing...":"Sign In"} className={`login__button ${isSignin?"disabled":""}`} disabled={isSignin} />

            <div>
              <span className="login__account">Don't have an Account ?</span>
              <span
                className="login__signin"
                id="sign-up"
                onClick={() => navigate("/auth/signup", { replace: true })}
              >
                Sign Up
              </span>
            </div>
            <div className="login__social">
              <a href="#" className="login__social-icon">
                <i class="fa-brands fa-google"></i>
              </a>
            </div>
          </form>

          <form
            onSubmit={handleSignUp}
            className={`login__create  ${
              param.type === "signup" ? "block" : "none"
            }`}
            id="login-up"
          >
            <h1 className="login__title">Create Account</h1>

            <div className="login__box">
              <i className="bx bx-user login__icon"></i>
              <input
                type="text"
                placeholder="Username"
                name="username"
                className="login__input"
                value={username}
                onInput={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="login__box">
              <i className="bx bx-at login__icon"></i>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="login__input"
                value={email}
                onInput={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login__box">
              <i className="bx bx-lock-alt login__icon"></i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="login__input"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              />
            </div>

            <input type="submit" value={isSignin?"Creating...":"Sign Up"} className={`login__button ${isSignin?"disabled":""}`} disabled={isSignin} />

            <div>
              <span className="login__account">Already have an Account ?</span>
              <span
                className="login__signup"
                id="sign-up"
                onClick={() => navigate("/auth/signin", { replace: true })}
              >
                Sign In
              </span>
            </div>

            <div className="login__social">
              <a href="#" className="login__social-icon">
                <i className="fa-brands fa-google"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
