import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import db from "./database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaPath = path.join(__dirname, "schema.sql");

const schema = fs.readFileSync(schemaPath, "utf-8");

db.exec(schema);

// Add new columns to existing databases when needed
const columns = db.prepare("PRAGMA table_info(programs)").all();

const hasCompaniesColumn = columns.some(
  (column) => column.name === "companies",
);

if (!hasCompaniesColumn) {
  db.exec(`
    ALTER TABLE programs
    ADD COLUMN companies TEXT;
  `);

  console.log("Added companies column to programs table.");
}

console.log("SkillNex database tables created successfully.");

db.close();
