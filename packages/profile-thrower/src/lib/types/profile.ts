import { z } from "zod";

import { ColorSchema } from "$lib/types/color";

export const ProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: ColorSchema,
});

export type Profile = z.infer<typeof ProfileSchema>;
