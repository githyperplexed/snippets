import type { Status } from "$lib/types/status";

class Content {
  status = $state<Status>("idle");

  load() {
    this.status = "pending";
  }

  reset() {
    this.status = "idle";
  }
}

export const content = new Content();
