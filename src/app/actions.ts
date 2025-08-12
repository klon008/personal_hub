"use server";

import {
  recommendAlternativeGroupings,
  type RecommendAlternativeGroupingsInput,
  type RecommendAlternativeGroupingsOutput,
} from "@/ai/flows/recommend-alternative-groupings";

export async function getAiRecommendations(
  input: RecommendAlternativeGroupingsInput
): Promise<RecommendAlternativeGroupingsOutput> {
  // Add a simple validation
  if (!input || !Array.isArray(input.projects) || input.projects.length === 0) {
    throw new Error("Invalid input: projects array cannot be empty.");
  }
  
  try {
    const result = await recommendAlternativeGroupings(input);
    return result;
  } catch (error) {
    console.error("Error in getAiRecommendations:", error);
    // Re-throw or return a structured error response
    throw new Error("Failed to get recommendations from AI flow.");
  }
}
