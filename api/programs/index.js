import programs from "../../data/programs.js";

export default function handler(req, res) {
  console.log("PROGRAMS:", programs);

  return res.status(200).json({
    success: true,
    count: programs.length,
    programs: programs,
  });
}