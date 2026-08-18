import db from "./database.js";
import programs from "../data/programs.js";

const insertProgram = db.prepare(`
  INSERT OR REPLACE INTO programs (
    slug,
    category,
    title,
    description,
    duration,
    overview,
    why_become,
    career_benefits,
    structure,
    process,
    syllabus,
    outcomes,
    positioning_line,
    companies,
    status,
    updated_at
  )
  VALUES (
    @slug,
    @category,
    @title,
    @description,
    @duration,
    @overview,
    @why_become,
    @career_benefits,
    @structure,
    @process,
    @syllabus,
    @outcomes,
    @positioning_line,
    @companies,
    @status,
    CURRENT_TIMESTAMP
  )
`);

const seedPrograms = db.transaction((programsToInsert) => {
  for (const program of programsToInsert) {
    insertProgram.run({
      slug: program.slug,
      category: program.category,
      title: program.title,
      description: program.description,
      duration: program.duration,

      overview: JSON.stringify(program.overview || {}),
      why_become: JSON.stringify(program.whyBecome || {}),
      career_benefits: JSON.stringify(
        program.careerBenefits || {},
      ),

      structure: JSON.stringify(program.structure || {}),
      process: JSON.stringify(program.process || {}),
      syllabus: JSON.stringify(program.syllabus || []),
      outcomes: JSON.stringify(program.outcomes || {}),

      positioning_line: program.positioningLine || "",

      companies: JSON.stringify(program.companies || []),

      status: "published",
    });
  }
});

seedPrograms(programs);

console.log(`${programs.length} program(s) added successfully.`);

db.close();