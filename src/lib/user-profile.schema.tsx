import { z } from "zod";

export const profileSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  financial_goals: z.string().nullable(),
  completed_onboarding: z.boolean(),
  created_at: z.string(),
});

export type Profile = z.infer<typeof profileSchema>;
