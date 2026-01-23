<script lang="ts">
  import { selector } from "$lib/stores/selector.svelte";

  import { cn } from "$lib/utilities/classes";
  import { getColor } from "$lib/utilities/color";

  let level = $derived<number>(
    Math.floor(selector.power * 9) + 1,
  );

  let profile = $derived(
    selector.items.find((item) => item.id === selector.poweringId),
  );
</script>

<div
  class="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
>
  <span class="text-white font-mono text-xs">Power {level}</span>
  <div class="w-32 h-2 bg-neutral-800 rounded-full overflow-hidden">
    <div
      class={cn(
        "h-full transition-all duration-75 ease-linear",
        profile ? getColor(profile.color) : "bg-white",
      )}
      style="width: {selector.power * 100}%"
    ></div>
  </div>
</div>
