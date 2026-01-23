import { z } from "zod";

export const ProjectileOptionsSchema = z.object({
  duration: z.number().optional().default(800),
  peak: z.number().optional().default(150),
  rotation: z.number().optional().default(360),
  power: z.number().optional().default(0),
});

export type ProjectileOptions = z.infer<typeof ProjectileOptionsSchema>;
