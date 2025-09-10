"use server";

import { generatePersonalizedGreeting } from "@/ai/flows/generate-personalized-greeting";

type GreetingResult =
  | { success: true; data: string; error?: never }
  | { success: false; data?: never; error: string };

export async function getGreeting(name: string): Promise<GreetingResult> {
  if (!name || name.trim().length < 2) {
    return { success: false, error: "Please provide a valid name." };
  }

  try {
    const result = await generatePersonalizedGreeting({ name });
    if (result?.greeting) {
      return { success: true, data: result.greeting };
    } else {
      return {
        success: false,
        error: "AI failed to generate a greeting. Please try again.",
      };
    }
  } catch (e) {
    console.error("AI Greeting Generation Error:", e);
    return {
      success: false,
      error:
        "An error occurred while communicating with the AI. Please check the server logs.",
    };
  }
}
