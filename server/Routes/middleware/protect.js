
import supabase from "../../supabaseClient.js";

export default async function protect(req, res, next) {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  req.user = data.user; // Attach to req
  next();
}
