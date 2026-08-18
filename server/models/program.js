import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    id: Number,

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    category: String,

    title: String,

    description: String,

    duration: String,

    status: {
      type: String,
      default: "published",
    },

    overview: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    whyBecome: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    careerBenefits: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    structure: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    process: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    syllabus: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },

    outcomes: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    companies: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },

    positioningLine: {
      type: String,
      default: "",
    },
  },
  {
    collection: "programs",
    timestamps: true,
  }
);

const Program = mongoose.model("Program", programSchema);

export default Program;