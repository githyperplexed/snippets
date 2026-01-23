<script lang="ts">
  import { User } from "@lucide/svelte";

  import { cn } from "$lib/utilities/classes";
  import { getColor } from "$lib/utilities/color";

  import type { Color } from "$lib/types/color";
  import type { ComponentVariant } from "$lib/types/variant";

  type Size = "sm" | "md" | "lg";

  type Props = {
    class?: string;
    color: Color;
    size?: Size;
    variant?: ComponentVariant;
  };

  let {
    class: className,
    color,
    size = "lg",
    variant = "standard",
  }: Props = $props();

  const sizes = {
    sm: "size-12 rounded-lg",
    md: "size-20 rounded-xl",
    lg: "size-16 xs:size-20 sm:size-24 md:size-28 lg:size-32 rounded-xl lg:rounded-2xl",
  };

  const icons = {
    sm: "size-5",
    md: "size-10",
    lg: "size-6 xs:size-8 sm:size-10 md:size-12 lg:size-14",
  };
</script>

<div
  class={cn(
    "flex items-center justify-center",
    sizes[size],
    variant === "standard" && getColor(color),
    className,
  )}
>
  {#if variant === "standard"}
    <div
      class={cn(
        "size-full flex items-center justify-center group-hover:bg-white/10",
        sizes[size],
      )}
    >
      <User class={cn("text-neutral-100", icons[size])} />
    </div>
  {/if}
</div>
