import { z } from "zod";

// Vibes schema for each category
const vibeItemSchema = z.object({
  title: z.string(),
  desc: z.string(),
});

// Combined vibes schema
export const vibesSchema = z.object({
  mood: vibeItemSchema,
  personality: vibeItemSchema,
  energy: vibeItemSchema,
  functionality: vibeItemSchema,
  lighting: vibeItemSchema,
});

// Score categories schema
export const categories = z.object({
  lighting: z.boolean(),
  colorHarmony: z.boolean(),
  furniturePlacement: z.boolean(),
  clutterFreeSpace: z.boolean(),
  decorAndStyle: z.boolean(),
  comfort: z.boolean(),
  functionalDesign: z.boolean(),
  moodAndAmbiance: z.boolean(),
  cleanliness: z.boolean(),
  positiveEnergy: z.boolean(),
});

export const suggestionsSchema = z.object({
  title: z.string(),
  description: z.string(),
});

// Complete room analysis schema
export const roomAnalysisSchema = z.object({
  isRoom: z.boolean(),
  vibes: vibesSchema,
  categories: categories,
  suggestions: z.array(suggestionsSchema),
});
