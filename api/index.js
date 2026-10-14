import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectToDatabase } from "../src/lib/db.js";
import { Program } from "../src/models/Program.js";
import programsData from "../src/data/program.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

app.use(cors());
app.use(express.json());

// API healthcheck
app.get("/api", (req, res) => {
  res.json({
    status: "ok",
    message: "SkillNex Serverless Backend API is online.",
  });
});

// GET /api/programs - Retrieve basic details of all programs
app.get("/api/programs", async (req, res) => {
  try {
    await connectToDatabase();

    const query = {};
    if (req.query.admin !== "true") {
      query.status = "published";
    }

    const programs = await Program.find(
      query,
      "slug category title description duration status displayOrder updatedAt"
    ).sort({ displayOrder: 1, createdAt: -1 });

    if (programs.length > 0) {
      return res.json(programs);
    }
  } catch (error) {
    console.warn("Database query failed in /api/programs, using fallback data:", error);
  }

  // Fallback to local program.js
  res.json(programsData);
});

// GET /api/programs/:slug - Retrieve complete details of a single program
app.get("/api/programs/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    await connectToDatabase();
    const program = await Program.findOne({ slug });

    if (program) {
      return res.json(program);
    }
  } catch (error) {
    console.warn(`Database query failed for slug ${slug}, checking fallback:`, error);
  }

  // Fallback to local program.js
  const fallback = programsData.find(
    (p) => p.slug?.toLowerCase() === slug?.toLowerCase()
  );

  if (fallback) {
    return res.json(fallback);
  }

  res.status(404).json({ error: "Program not found." });
});

// POST /api/programs - Create a new program
app.post("/api/programs", async (req, res) => {
  try {
    await connectToDatabase();
    const newProgram = new Program(req.body);
    const savedProgram = await newProgram.save();
    res.status(201).json(savedProgram);
  } catch (error) {
    console.error("API error creating program:", error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "A program with this slug already exists." });
    }
    res.status(500).json({ error: "Unable to create program: " + error.message });
  }
});

// PUT /api/programs/:id - Update an existing program by ID or slug
app.put("/api/programs/:id", async (req, res) => {
  try {
    await connectToDatabase();
    const { id } = req.params;

    const query = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { slug: id };
    const updatedProgram = await Program.findOneAndUpdate(query, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProgram) {
      return res.status(404).json({ error: "Program not found." });
    }

    res.json(updatedProgram);
  } catch (error) {
    console.error(`API error updating program (${req.params.id}):`, error);
    res.status(500).json({ error: "Unable to update program: " + error.message });
  }
});

// DELETE /api/programs/:id - Delete a program by ID or slug
app.delete("/api/programs/:id", async (req, res) => {
  try {
    await connectToDatabase();
    const { id } = req.params;
    const query = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { slug: id };
    const deletedProgram = await Program.findOneAndDelete(query);

    if (!deletedProgram) {
      return res.status(404).json({ error: "Program not found." });
    }

    res.json({ message: "Program deleted successfully.", deletedProgram });
  } catch (error) {
    console.error(`API error deleting program (${req.params.id}):`, error);
    res.status(500).json({ error: "Unable to delete program." });
  }
});

export default app;
