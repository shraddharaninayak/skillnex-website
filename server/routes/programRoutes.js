import express from "express";
import { getDB } from "../mongodb.js";

const router = express.Router();

/*
  GET ALL PROGRAMS
*/
router.get("/", async (req, res) => {
  try {
    const db = getDB();

    const programs = await db
      .collection("programs")
      .find(
        { status: "published" },
        {
          projection: {
            _id: 1,
            slug: 1,
            category: 1,
            title: 1,
            description: 1,
            duration: 1,
            status: 1,
          },
        }
      )
      .sort({ _id: 1 })
      .toArray();

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
*/
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const db = getDB();

    const program = await db.collection("programs").findOne({
      slug,
      status: "published",
    });

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found.",
      });
    }

    res.json({
      success: true,
      program,
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