import type { Color } from "$lib/types/color";
import type { Profile } from "$lib/types/profile";
import type { Status } from "$lib/types/status";

class ProfileStore {
  id = $state<string>("ghost");
  name = $state<string>("Ghost");
  color = $state<Color>("ghost");
  status = $state<Status>("idle");

  begin(profile: Profile) {
    this.id = profile.id;
    this.name = profile.name;
    this.color = profile.color;
    this.status = "pending";
  }

  end() {
    this.status = "success";
  }

  reset() {
    this.id = "ghost";
    this.name = "Ghost";
    this.color = "ghost";
    this.status = "idle";
  }
}

export const profile = new ProfileStore();