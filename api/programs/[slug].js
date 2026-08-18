import programs from "../../data/programs.js";

export default function handler(req, res) {
  const { slug } = req.query;

  const program = programs.find(
    (item) => item.slug === slug
  );

  if (!program) {
    return res.status(404).json({
      success: false,
      message: "Program not found.",
      slug,
    });
  }

  return res.status(200).json({
    success: true,
    program,
  });
}