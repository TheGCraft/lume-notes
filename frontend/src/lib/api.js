//DYNAMIC BASE URL
export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5005/api" : "/api";
export const apiNotes = `${BASE_URL}/notes`;