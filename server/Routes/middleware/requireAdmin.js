import supabase from "../../supabaseClient.js";
export async function requireAdmin(req, res, next) {
    try {
      const accessToken = req.cookies.access_token;
  
      if (!accessToken) {
        return res.status(401).json({ message: "Access token missing" });
      }
  
      const { data, error } = await supabase.auth.getUser(accessToken);
  
      if (error || !data?.user) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }
  
      const role = data.user.user_metadata?.role;
  
      if (role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admins only" });
      }
  
      req.user = data.user; // optionally pass user to next middleware
      next();
    } catch (err) {
      console.error("requireAdmin error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  }