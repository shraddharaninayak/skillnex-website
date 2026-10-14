import mongoose from "mongoose";

const ProgramStepSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const ProgramSyllabusSchema = new mongoose.Schema({
  category: { type: String, required: true },
  topics: [{ type: String }],
});

const ProgramSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    overview: {
      heading: { type: String },
      description: { type: String },
      note: { type: String },
    },
    whyBecome: {
      heading: { type: String },
      points: [{ type: String }],
    },
    careerBenefits: {
      heading: { type: String },
      points: [{ type: String }],
    },
    structure: {
      items: [{ type: String }],
    },
    process: {
      heading: { type: String },
      steps: [ProgramStepSchema],
    },
    syllabus: [ProgramSyllabusSchema],
    outcomes: {
      heading: { type: String },
      points: [{ type: String }],
    },
    positioningLine: { type: String },
    companies: [{ type: String }],
    status: { type: String, enum: ["draft", "published"], default: "published", index: true },
    displayOrder: { type: Number, default: 0, index: true },
    seo: {
      title: { type: String },
      description: { type: String },
      keywords: [{ type: String }],
    },
  },
  {
    timestamps: true,
  }
);

export const Program = mongoose.models.Program || mongoose.model("Program", ProgramSchema);
