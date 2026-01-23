import { ProfileSchema } from "$lib/types/profile";

export const getDefaultProfile = () => {
  return ProfileSchema.parse({
    id: "ghost",
    name: "Ghost",
    color: "ghost",
  });
};