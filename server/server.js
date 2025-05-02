import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import cors from "cors";
import auth from "./Routes/auth/auth.js";
import dashboard from "./Routes/pages/dashboard.js";


const app = express();
const allowedOrigins = [
  'https://syllabdesk.vercel.app',
  'http://localhost:5173',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


//  Sign Up Route
app.use("/auth",auth);
app.use('/dashboard',dashboard)

// ✅ Protected dashboard


// ✅ Logout route (clears cookie)
app.get("/logout", (req, res) => {
  res.clearCookie('access_token', {
    path: '/',
    secure: true,    // if you used it while setting
    sameSite: 'Lax',
  });
  res.clearCookie('refresh_token', {
    path: '/',
    secure: true,
    sameSite: 'Lax',
  });
  
  res.status(200).json({statusText:"Logout Successfully",redirect:"/"});
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
