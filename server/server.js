import express from "express";
import cors from "cors";

import programRoutes from "./routes/programRoutes.js";

const app = express();

const PORT = 5000;

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

app.listen(PORT, () => {
  console.log(`SkillNex backend running on http://localhost:${PORT}`);
});
