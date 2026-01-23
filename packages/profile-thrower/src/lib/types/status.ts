import z from "zod";

export const StatusSchema = z.enum(["idle", "pending", "success", "error"]);

export type Status = z.infer<typeof StatusSchema>;