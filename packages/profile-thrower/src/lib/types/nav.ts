import { z } from "zod";

export const NavIconSchema = z.enum([
  "home",
  "tv",
  "movie",
  "user",
]);

export type NavIcon = z.infer<typeof NavIconSchema>;

export const NavItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  href: z.string(),
  icon: NavIconSchema
});

export type NavItem = z.infer<typeof NavItemSchema>;