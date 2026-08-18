export function getArray(value) {
  return Array.isArray(value) ? value : [];
}

export function getPoints(value) {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value;
  }

  if (Array.isArray(value.items)) {
    return value.items;
  }

  return [];
}

export function getStructureItems(structure) {
  if (!structure) return [];

  if (Array.isArray(structure)) {
    return structure;
  }

  if (Array.isArray(structure.items)) {
    return structure.items;
  }

  return [];
}

export function getProcessSteps(process) {
  if (!process) return [];

  if (Array.isArray(process)) {
    return process;
  }

  if (Array.isArray(process.steps)) {
    return process.steps;
  }

  if (Array.isArray(process.items)) {
    return process.items;
  }

  return [];
}

export function getSyllabus(program) {
  if (!program) return [];

  if (Array.isArray(program.syllabus)) {
    return program.syllabus;
  }

  return [];
}

export function getCompanies(program) {
  if (!program) return [];

  if (Array.isArray(program.companies)) {
    return program.companies.map((company) => {
      if (typeof company === "string") return company;

      return company?.name || company?.title || "";
    }).filter(Boolean);
  }

  return [];
}

export function getPointTitle(point) {
  if (!point) return "";

  if (typeof point === "string") {
    return "";
  }

  return point.title || point.heading || point.name || "";
}

export function getPointDescription(point) {
  if (!point) return "";

  if (typeof point === "string") {
    return point;
  }

  return (
    point.description ||
    point.text ||
    point.detail ||
    point.content ||
    ""
  );
}

export function getStructureTitle(item) {
  if (!item) return "";

  if (typeof item === "string") {
    return item;
  }

  return item.title || item.name || item.heading || "";
}

export function getStructureDescription(item) {
  if (!item) return "";

  if (typeof item === "string") {
    return "";
  }

  return (
    item.description ||
    item.text ||
    item.detail ||
    item.content ||
    ""
  );
}

export function getStepTitle(step) {
  if (!step) return "";

  if (typeof step === "string") {
    return step;
  }

  return step.title || step.step || step.heading || step.name || "";
}

export function getStepDescription(step) {
  if (!step) return "";

  if (typeof step === "string") {
    return "";
  }

  return (
    step.description ||
    step.text ||
    step.detail ||
    step.content ||
    ""
  );
}

export function getPositioningLine(program) {
  if (!program) return "";

  return (
    program.positioningLine ||
    program.positioning ||
    program.tagline ||
    ""
  );
}

export function getWhyBecome(program) {
  if (!program) return null;

  return program.whyBecome || program.whyThisProgram || null;
}

export function getCareerBenefits(program) {
  if (!program) return null;

  return program.careerBenefits || program.career || null;
}