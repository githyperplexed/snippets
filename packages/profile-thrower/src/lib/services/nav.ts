import type { NavItem } from "$lib/types/nav";

export const fetchNavItems = (): NavItem[] => {
  return [
    { id: "home", name: "Home", href: "/", icon: "home" },
    { id: "shows", name: "Shows", href: "/shows", icon: "tv" },
    { id: "movies", name: "Movies", href: "/movies", icon: "movie" }
  ];
};