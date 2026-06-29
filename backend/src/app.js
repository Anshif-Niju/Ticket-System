import express from "express";
import cors from "cors";
import authRoutes   from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import ticketRoutes   from "./routes/ticketRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

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
app.use("/api/tickets", ticketRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Help Desk API Running..." });
});

app.use(notFound);
app.use(errorHandler);

export default app;
