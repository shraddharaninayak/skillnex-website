const API_BASE_URL = "http://localhost:5000/api";

export async function fetchProgram(slug) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/programs/${encodeURIComponent(slug)}`
    );

    if (!response.ok) {
      return {
        data: null,
        error: "Program not found.",
      };
    }

    const data = await response.json();

    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error("Program API error:", error);

    return {
      data: null,
      error: "Unable to connect to the SkillNex backend.",
    };
  }
}