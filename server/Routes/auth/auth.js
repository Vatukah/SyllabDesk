import { Router } from "express";
import supabase from "../../services/supabaseClient.js";
const auth = Router();

auth.post("/signup", async (req, res) => {
  
  const { email, password } = req.body;
 console.log(email,password)
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'http://localhost:5173/dashboard'
    }
  });

  if (error) return res.status(401).json({message:error.message});

  
  res.status(200).json({message:"Successfull Sign Up ? Check your email"});
  // res.json({ message: "Signup successful", data }); 
});

// Sign In Route
auth.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
   
    return res.status(401).json({message:error.message})
  }

  res.cookie("access_token", data.session.access_token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 7 * 1000, // 7 day
    sameSite: "Lax",
  });
  res.cookie("refresh_token", data.session.refresh_token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 30 * 1000, // 30 day
    sameSite: "Lax",
  });


  res.status(200).json({message:"successfull Login"});
});

export default auth;
