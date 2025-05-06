import { Router } from "express";
import supabase from "../../services/supabaseClient.js";
import { supabaseService } from "../../services/supabaseClient.js";
const auth = Router();

auth.post("/signup", async (req, res) => {
  
  const { email, password,username } = req.body;
 
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'http://localhost:5173/auth/callback',
    },
    user_metadata:{
      role:"user",
      full_name:username,

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
    maxAge:  60 * 60  * 1000, // 1 hour
    sameSite: "Lax",
  });
  res.cookie("refresh_token", data.session.refresh_token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 30 * 1000, // 30 day
    sameSite: "Lax",
  });


  res.status(200).json({user:data.user,message:"successfull Login"});
});

export default auth;
