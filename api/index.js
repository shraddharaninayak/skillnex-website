import express from "express";
import cors from "cors";

import programRoutes from "../server/routes/programRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

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