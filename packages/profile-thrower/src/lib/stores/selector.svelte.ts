import { animation } from "$lib/stores/animation.svelte";
import { content } from "$lib/stores/content.svelte";
import { profile } from "$lib/stores/profile.svelte";

import type { Profile } from "$lib/types/profile";
import type { Status } from "$lib/types/status";

class Selector {
  items = $state<Profile[]>([]);
  status = $state<Status>("idle");

  power = $state<number>(0);
  poweringId = $state<string | null>(null);

  set(items: Profile[]) {
    this.items = items;
  }

  async begin(item: Profile, power = 0) {
    if (this.status === "pending") return;

    this.status = "pending";
    
    content.load();

    profile.begin(item);

    animation.begin(item.id, power, () => {
      this.end();
      profile.end();
    });
  }

  async end() {
    this.status = "idle";
    this.power = 0;
    this.poweringId = null;
  }
}

export const selector = new Selector();
