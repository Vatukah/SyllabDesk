import { Router } from "express";
import supabase from "../../supabaseClient.js";
import * as userService from "../../services/user.service.js";
import { isProd } from "../../config.js";

const getSession = Router();

getSession.get("/", async (req, res) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: "No session found." });
  }

  try {
    // Try using the access token first
    if (accessToken) {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(accessToken);

      if (error) {
        throw new Error(error.message);
      }

      if (user) {
        const { id } = user;
        const { user: userProfile, error } = await userService.getProfile(id);

        if (error) {
          throw new Error(error.message);
        }
        return res.status(200).json({ user: userProfile });
      }
    }

    // Access token failed or missing — try refresh token
    if (refreshToken) {
      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.session && data?.user) {
        // Refresh successful — update cookies
        res.cookie("access_token", data.session.access_token, {
          httpOnly: true,
          maxAge: 3600 * 1000,
          sameSite: isProd?"none":"lax",
          secure: true,
        });
        res.cookie("refresh_token", data.session.refresh_token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 30 * 1000,
         sameSite: isProd?"none":"lax",
          secure: true,
        });
        const {
          user: { id },
        } = data;
        const { user: userProfile, error } = await userService.getProfile(id);
        if (error) {
          throw new Error(error.message);
        }
        return res.status(200).json({ user: userProfile });
      }
    }

    // Refresh also failed
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return res
      .status(401)
      .json({ message: "Session expired. Please log in again." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default getSession;
