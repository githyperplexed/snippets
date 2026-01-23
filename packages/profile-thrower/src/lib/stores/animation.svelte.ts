import { getPosition } from "$lib/utilities/dom";

import { PositionSchema, type Position } from "$lib/types/position";
import type { Status } from "$lib/types/status";

class Animation {
  start = $state<Position>(PositionSchema.parse({}));
  final = $state<Position>(PositionSchema.parse({}));
  status = $state<Status>("idle");
  power = $state<number>(0);
  callback = $state<(() => void) | null>(null);

  begin(id: string, power: number, callback: () => void) {
    this.start = getPosition(`[data-id="profile-${id}"]`);
    this.status = "pending";
    this.power = power;
    this.callback = callback;
  }

  end() {
    this.status = "success";
    this.start = PositionSchema.parse({});
    this.callback?.();
  }
}

export const animation = new Animation();