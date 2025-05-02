
import supabase from "../../services/supabaseClient.js";

export default async function protect(req, res, next) {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  try {
    if (!accessToken) {
      throw error;
    }

    const { data: user, error } = await supabase.auth.getUser(accessToken);
    if (error) throw error;

    req.user = user;
    return next();
  } catch (err) {
    // Access token might be expired — try refresh
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });
    console.log(data)
    if (data.user|| data.session) {
      // Set new tokens
      res.cookie("access_token", data.session.access_token, {
        httpOnly: true,
        maxAge: 3600 * 1000,
        sameSite: "Lax",
        secure: true,
      });
      res.cookie("refresh_token", data.session.refresh_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30 * 1000,
        sameSite: "Lax",
        secure: true,
      });

      req.user = data.user;
      return next();
    }

    // Refresh token also failed — clear cookies
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return res
      .status(401)
      .json({ message: "Session expired. Please log in again." });
  }
}
