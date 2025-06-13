import 'dotenv/config';
import cookieParser from "cookie-parser";

// Now you can access your env variables

console.log("PORT:", process.env.PORT);

import express from "express";
import cors from "cors";
import auth from "./Routes/auth/auth.js";
import dashboard from "./Routes/catalog/dashboard.js";
import resetPassword from "./Routes/auth/resetPassword.js";
import createAdmin from "./createAdmin.js";
import getSession from "./Routes/auth/getSession.js";
import getAlluser from "./Routes/admin/getUsers.js";
import setCookieRoute from "./Routes/auth/setCookie.js";
import refreshToken from "./Routes/auth/authRefresh.js";
import search from "./Routes/catalog/search.js";
import courses from "./Routes/admin/getCourses.js";
import getUniversity from "./Routes/catalog/getUniversity.js";
import getUniversityProgrammes from "./Routes/catalog/getProgrammes.js";
import userRoute from "./Routes/userPersonal/user.route.js";

const app = express();
const allowedOrigins = [
  "https://syllabdesk.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//  Sign Up Route
app.use("/session", getSession);
app.use("/auth", auth);
app.use("/auth", setCookieRoute);
app.use("/auth", refreshToken);
app.use("/", resetPassword);
app.use("/dashboard", dashboard);
app.use("/", createAdmin);
app.use("/admin", getAlluser);
app.use("/admin", courses);
app.use("/api/search", search);
app.use("/", getUniversity);
app.use("/", getUniversityProgrammes);
app.use("/user", userRoute);

// ✅ Protected dashboard

// ✅ Logout route (clears cookie)
app.get("/logout", (req, res) => {
  res.clearCookie("access_token", {
    path: "/",
    secure: true, // if you used it while setting
    sameSite: "Lax",
  });
  res.clearCookie("refresh_token", {
    path: "/",
    secure: true,
    sameSite: "Lax",
  });

  res.status(200).json({ statusText: "Logout Successfully", redirect: "/" });
});

// Test route
app.get("/", (req, res) => {
  res.send("Supabase Auth Server is running ");
});
// Fallback for React Router

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../dist/index.html"));
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  
  console.log(` Server is running at http://localhost:${PORT}`);
});
