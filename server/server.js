import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static React files
app.use(express.static(path.join(__dirname, "../dist")));

//  Sign Up Route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Signup successful", data });
});

// Sign In Route
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.send(
      `<h3>Signin failed: ${error.message}</h3><a href="/">Try again</a>`
    );
  }

  //  Set token in a cookie (example: 1 day expiry)
  res.cookie("sb-token", data.session.access_token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: "lax",
  });

  res.redirect("/dashboard");
});

// ✅ Protected dashboard
app.get("/dashboard", async (req, res) => {
  const token = req.cookies["sb-token"];

  if (!token) {
    return res
      .status(401)
      .send("<h3>Unauthorized. Please <a href='/'>sign in</a>.</h3>");
  }

  // Validate token with Supabase
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res
      .status(401)
      .send("<h3>Invalid session. Please <a href='/'>sign in</a>.</h3>");
  }
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// ✅ Logout route (clears cookie)
app.get("/logout", (req, res) => {
  res.clearCookie("sb-token");
  res.redirect("/");
});

// Test route
// app.get("/", (req, res) => {
//   res.send("Supabase Auth Server is running ");
// });
// Fallback for React Router

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../dist/index.html"));
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server is running at http://localhost:${PORT}`);
});
