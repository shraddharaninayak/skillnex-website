import express from "express";
import cors from "cors";

import { connectDB } from "../server/mongodb.js";
import programRoutes from "../server/routes/programRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    await connectDB();

    res.json({
      success: true,
      message: "SkillNex backend is running",
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

app.use("/api/programs", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
}, programRoutes);

export default app; status