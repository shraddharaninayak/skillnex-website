import express from "express";
import db from "../database/database.js";

const router = express.Router();

/*
  GET ALL PROGRAMS
  Used by the Programs carousel on the frontend.
*/
router.get("/", (req, res) => {
  try {
    const programs = db
      .prepare(
        `
        SELECT
          id,
          slug,
          category,
          title,
          description,
          duration,
          status
        FROM programs
        WHERE status = 'published'
        ORDER BY id ASC
      `,
      )
      .all();

    res.json({
      success: true,
      count: programs.length,
      programs,
    });
  } catch (error) {
    console.error("Error fetching programs:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch programs.",
    });
  }
});

/*
  GET ONE PROGRAM BY SLUG
  Used by the individual program detail page.
*/
router.get("/:slug", (req, res) => {
  try {
    const { slug } = req.params;

    const program = db
      .prepare(
        `
        SELECT *
        FROM programs
        WHERE slug = ?
          AND status = 'published'
      `,
      )
      .get(slug);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found.",
      });
    }

    /*
      Convert JSON strings stored in SQLite
      back into JavaScript objects.
    */
    const formattedProgram = {
      ...program,

      overview: JSON.parse(program.overview || "{}"),

      whyBecome: JSON.parse(program.why_become || "{}"),

      careerBenefits: JSON.parse(program.career_benefits || "{}"),

      structure: JSON.parse(program.structure || "{}"),

      process: JSON.parse(program.process || "{}"),

      syllabus: JSON.parse(program.syllabus || "[]"),

      outcomes: JSON.parse(program.outcomes || "{}"),

      companies: JSON.parse(program.companies || "[]"),

      positioningLine: program.positioning_line || "",
    };

    res.json({
      success: true,
      program: formattedProgram,
    });
  } catch (error) {
    console.error("Error fetching program:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch program.",
    });
  }
});

export default router;
