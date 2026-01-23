<script lang="ts">
  import Image from "$lib/components/profile/image.svelte";

  import { profile } from "$lib/stores/profile.svelte";
  import { selector } from "$lib/stores/selector.svelte";

  import { cn } from "$lib/utilities/classes";

  import type { Profile } from "$lib/types/profile";

  type Size = "sm" | "md" | "lg";

  type Props = {
    option: Profile;
    size?: Size;
  };

  let { option, size = "lg" }: Props = $props();

  let hidden = $derived(
    selector.status === "pending" && profile.id === option.id,
  );

  const sizes = {
    sm: "size-12",
    md: "size-20",
    lg: "size-16 xs:size-20 sm:size-24 md:size-28 lg:size-32",
  };

  let timer: ReturnType<typeof requestAnimationFrame>;

  let at: number;

  const start = () => {
    if (selector.status === "pending") return;
    if (selector.poweringId === option.id) return;
    
    selector.poweringId = option.id;

    at = performance.now();

    loop();
  };

  const loop = () => {
    if (selector.poweringId !== option.id) return;

    const elapsed = performance.now() - at;

    if (selector.power < 1) {
      selector.power = Math.min(1, elapsed / 1000);

      timer = requestAnimationFrame(loop);
    }
  };

  const end = () => {
    if (selector.poweringId !== option.id) return;

    cancelAnimationFrame(timer);

    selector.begin(option, selector.power);
  };

  const onkeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      start();
    }
  };

  const onkeyup = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      end();
    }
  };
</script>

<svelte:window onmouseup={end} ontouchend={end} />

<button
  class="flex flex-col items-center gap-2 group enabled:cursor-pointer focus-visible:outline-none select-none touch-none"
  disabled={selector.status === "pending"}
  data-id="profile-{option.id}"
  onmousedown={start}
  ontouchstart={start}
  {onkeydown}
  {onkeyup}
  oncontextmenu={e => e.preventDefault()}
>
  <div
    class={cn(sizes[size], {
      "opacity-0": hidden,
    })}
  >
    <Image
      class="group-focus-visible:ring-2 group-focus-visible:ring-white group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-neutral-950"
      color={option.color}
      {size}
    />
  </div>
  <span
    class={cn(
      "text-neutral-400 group-hover:text-white group-focus-visible:text-white text-xs xs:text-sm md:text-xl transition-colors",
      {
        "opacity-0": hidden,
      },
    )}
  >
    {option.name}
  </span>
</button>
