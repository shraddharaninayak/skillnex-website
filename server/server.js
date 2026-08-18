import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectDB } from "./mongodb.js";
import programRoutes from "./routes/programRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

/*
  Connect MongoDB
*/
connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

/*
  Health check
*/
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "SkillNex backend is running",
  });
});

/*
  Program API
*/
app.use("/api/programs", programRoutes);

export default app;