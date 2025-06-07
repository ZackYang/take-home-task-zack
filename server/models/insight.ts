import { z } from "zod";

export const InsightModel = z.object({
  id: z.number().int().min(0).optional(),
  brand: z.number().int().min(0),
  createdAt: z.date(),
  text: z.string().min(1, "Insight text is required"),
});

export type Insight = z.infer<typeof InsightModel>;
