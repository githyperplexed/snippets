import { content } from "$lib/stores/content.svelte";
import { selector } from "$lib/stores/selector.svelte";
import { profile } from "$lib/stores/profile.svelte";

import type { NavItem } from "$lib/types/nav";

class Nav {
  items = $state<NavItem[]>([]);

  set(items: NavItem[]) {
    this.items = items;
  }

  click() {
    if (selector.status === "pending") return;

    selector.end();
    
    profile.reset();
    content.reset();
  };

}

export const nav = new Nav();
