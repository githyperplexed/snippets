import { z } from "zod";

export const ComponentVariantSchema = z.enum(["standard", "destructive", "ghost", "custom"]);

export type ComponentVariant = z.infer<typeof ComponentVariantSchema>;