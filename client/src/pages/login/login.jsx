import { useParams,useNavigate} from 'react-router';
import { useState } from 'react';

import './login.css';
import image from '../../assets/loginImage.svg'
export default function Login({prop}){
    const param = useParams();
    const navigate = useNavigate();

    const [Username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");

    const handleSignUp=async (e)=>{
        e.preventDefault()
       const response =  await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password }),
          });

        console.log(response)
       
    }
    const handleSignIn=async (e)=>{

        e.preventDefault()
       const response =  await fetch("http://localhost:5000/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: Username, password: password }),
          });

       const {session,user,error} = await response.json();
       
        if(error){
            console.error(error.message);
            return
        }

        window.localStorage.setItem("session",session);
        window.localStorage.setItem("user",user);
        
      
        navigate("/dashboard",{replace:true});
       
    }
  return (
    <div className="login">
            <div className="login__content">
                <div className="login__img">
                    <img src={image} alt=""/>
                </div>

                <div className="login__forms">
                    <form action="http://localhost:5000/signin" method='POST' className={`login__registre ${param.type==="signin"?"block":"none"}`} id="login-in">
                        <h1 className="login__title">Sign In</h1>
    
                        <div className="login__box">
                            <i className='bx bx-user login__icon'></i>
                            <input type="email" placeholder="Email" className="login__input" name="email" value={email} onInput={(e)=>setEmail(e.target.value)}/>
                        </div>
    
                        <div className="login__box">
                            <i className='bx bx-lock-alt login__icon'></i>
                            <input type="password" placeholder="Password" className="login__input" name='password' value={password} onInput={(e)=>setPassword(e.target.value)}/>
                        </div>

                        <a href="#" className="login__forgot">Forgot password?</a>

                        {/* <a href="#" className="login__button" onClick={handleSignIn}>Sign In</a> */}
                        <input type="submit" value={"Sign In"} className="login__button"/>

                        <div>
                            <span className="login__account">Don't have an Account ?</span>
                            <span className="login__signin" id="sign-up" onClick={()=>navigate('/auth/signup',{ replace: true })}>Sign Up</span>
                        </div>
                    </form>

                    <form action="" className={`login__create  ${param.type==="signup"?"block":"none"}`} id="login-up">
                        <h1 className="login__title">Create Account</h1>
    
                        <div className="login__box">
                            <i className='bx bx-user login__icon'></i>
                            <input type="text" placeholder="Username" className="login__input" value={Username} onInput={(e)=>setUsername(e.target.value)}/>
                        </div>
    
                        <div className="login__box">
                            <i className='bx bx-at login__icon'></i>
                            <input type="text" placeholder="Email" className="login__input" value={email} onInput={(e)=>setEmail(e.target.value)}/>
                        </div>

                        <div className="login__box">
                            <i className='bx bx-lock-alt login__icon'></i>
                            <input type="password" placeholder="Password" className="login__input" value={password} onInput={(e)=>setPassword(e.target.value)}/>
                        </div>

                        <a href="#" className="login__button" onClick={handleSignUp}>Sign Up</a>

                        <div>
                            <span className="login__account">Already have an Account ?</span>
                            <span className="login__signup" id="sign-in" onClick={()=>navigate('/auth/signin',{ replace: true })}>Sign In</span>
                        </div>

                        <div className="login__social">
                            <a href="#" className="login__social-icon"><i className='bx bxl-facebook' ></i></a>
                            <a href="#" className="login__social-icon"><i className='bx bxl-twitter' ></i></a>
                            <a href="#" className="login__social-icon"><i className='bx bxl-google' ></i></a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )

}