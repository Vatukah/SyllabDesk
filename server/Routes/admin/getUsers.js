import { supabaseService } from "../../services/supabaseClient.js";
import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin.js";

const getAlluser = Router();

getAlluser.get("/users", requireAdmin, async (req, res) => {
  const {
    data,
    error,
  } = await supabaseService.from("profiles").select("*");

  if (error) {
    return res.status(500).json({ error: "Failed to fetch users" });
  }
  
  res.status(200).json({ data });
});

export default getAlluser;