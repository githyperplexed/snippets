import { z } from "zod";

export const ColorSchema = z.enum([
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "ghost"
]);

export type Color = z.infer<typeof ColorSchema>;
