import supabase from "../../supabaseClient.js";
import { supabaseService } from "../../supabaseClient.js";
import { Router } from "express";

const resetPassword = Router();

resetPassword.post("/reset_link", async (req, res) => {
  const { email } = req.body;

  if (!email || email?.lenght === 0) {
    return res
      .status(422)
      .json({ message: "please provide valid information!" });
  }

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/resetPassword",
  });

  if (error) {
    return res.status(401).json({ message: error.message });
  }

  res.status(200).json({ message: "Password reset link sent to your mail" });
});

resetPassword.post("/reset_password", async (req, res) => {
  const { newPassword } = req.body;
  let accessToken = req.headers.authorization;

  accessToken = accessToken.replace("Bearer", "").trimStart();

  if (!newPassword || newPassword?.lenght === 0) {
    return res.status(422).json({ message: "Invalid password!!!" });
  }

  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    //check user is actually existing
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(accessToken);

    if (userError) {
      throw userError;
    }

    const { id } = user;

    const { data: updatedUser, error: UpadationError } =
      await supabaseService.auth.admin.updateUserById(id, {
        password: newPassword,
      });

    if (!updatedUser || UpadationError) {
      throw UpadationError;
    }

    return res.status(200).json({ message: "Password successfully Updated." });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default resetPassword;
