import express from "express";
import cors from "cors";
import authRoutes   from "./routes/authRoutes.js";
// import ticketRoutes   from "./routes/authRoutes";

const app = express();

//Cors
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoutes);
// app.use("/api/tickets", ticketRoutes);


// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Help Desk API Running..." });
});

export default app;
