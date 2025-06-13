import { Router } from "express";
import supabase from "../../supabaseClient.js";

const setCookieRoute = Router();

setCookieRoute.post("/set-cookie", async (req, res) => {
  const { access_token, refresh_token } = req.body;

  if (!access_token || !refresh_token) {
    return res.status(400).json({ error: "Missing tokens" });
  }

  // Optional: validate access_token with Supabase
  const { data: user, error } = await supabase.auth.getUser(access_token);
  if (error) return res.status(401).json({ error: "Invalid access token" });

  // Set cookies
  res.cookie("access_token", access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days
  });

  res.status(200).json({ message: "Cookies set", user });
});

export default setCookieRoute;
