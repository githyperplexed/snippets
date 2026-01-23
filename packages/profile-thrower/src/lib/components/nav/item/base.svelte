<script lang="ts">
  import type { Snippet } from "svelte";

  import type { NavItem } from "$lib/types/nav";
  import type { ComponentVariant } from "$lib/types/variant";

  type Props = {
    item: NavItem;
    variant?: ComponentVariant;
    children: Snippet;
    onclick?: () => void;
  };

  let { item, variant = "standard", children, onclick }: Props = $props();

  let classes =
    "group w-16 h-24 flex flex-col items-center gap-2 p-2 cursor-pointer focus-visible:outline-none";
</script>

{#snippet content()}
  <div
    class="size-12 flex items-center justify-center bg-zinc-800 group-hover:bg-zinc-700 group-focus-visible:ring-2 group-focus-visible:ring-white group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-neutral-950 rounded-lg"
  >
    {@render children()}
  </div>
  <span
    class="text-sm text-gray-200 group-hover:text-white group-focus-visible:text-white font-medium tracking-wide"
    >{item.name}</span
  >
{/snippet}

<div class="w-16 h-24">
  {#if variant === "standard"}
    {#if onclick}
      <button id={item.id} class={classes} {onclick}>
        {@render content()}
      </button>
    {:else}
      <a id={item.id} href={item.href} class={classes}>
        {@render content()}
      </a>
    {/if}
  {/if}
</div>
