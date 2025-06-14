isProduction

import { Router } from "express";
import supabase from "../../supabaseClient.js";
import { isProd } from "../../config.js";

const refreshToken = Router();

refreshToken.get("/refresh", async (req, res) => {
  // Get refresh token from cookies (assuming you store it securely)
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return res.status(401).json({ error: "No refresh token found" });
  }

  try {
    // Use Supabase Admin client to refresh the session
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    // Set new access token in cookies (HTTP-only for security)
    res.cookie("access_token", data?.session.access_token, {
      httpOnly: true, // Ensures client-side JavaScript cannot access the token
      // secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
      maxAge: 60 * 60 * 1000, // 1 hour expiration
      secure: isProd,
      sameSite: isProd?"none":"Lax",
    });
    res.cookie("refresh_token", data?.session.refresh_token, {
      httpOnly: true, // Ensures client-side JavaScript cannot access the token
      // secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
      maxAge: 24 * 60 * 60 * 30 * 1000, // 30 expiration
      secure: isProd,
      sameSite: isProd?"none":"Lax",
    });

    return res.status(200).json({ message: "Session refreshed successfully" });
  } catch (err) {
    console.error("Error refreshing session:", err);
    return res.status(500).json({ error: "Failed to refresh session" });
  }
});

export default refreshToken;
