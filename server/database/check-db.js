import db from "./database.js";

const count = db.prepare("SELECT COUNT(*) AS total FROM programs").get();

console.log("\nTotal programs in database:", count.total);

const programs = db
  .prepare(
    `
    SELECT
      id,
      slug,
      category,
      title,
      duration,
      status
    FROM programs
    ORDER BY id ASC
  `,
  )
  .all();

console.log("\nPrograms in SkillNex database:\n");

console.table(programs);

console.log("\nAll slugs:");

programs.forEach((program) => {
  console.log("-", program.slug);
});

db.close();
