import type { Profile } from "$lib/types/profile";

export const fetchProfiles = (): Profile[] => {
  return [
    { id: "1", name: "Dingle", color: "blue" },
    { id: "2", name: "Berry", color: "red" },
    { id: "3", name: "Yortle", color: "green" },
    { id: "4", name: "Dortle", color: "yellow" },
  ];
};
