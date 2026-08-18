CREATE TABLE IF NOT EXISTS programs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,

  duration TEXT,

  overview TEXT,
  why_become TEXT,
  career_benefits TEXT,

  structure TEXT,
  process TEXT,
  syllabus TEXT,
  outcomes TEXT,

  positioning_line TEXT,

companies TEXT,

status TEXT NOT NULL DEFAULT 'draft',

  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);