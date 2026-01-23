<script lang="ts">
  import { Clapperboard } from "@lucide/svelte";
  import { House } from "@lucide/svelte";
  import { Tv } from "@lucide/svelte";
  import { User } from "@lucide/svelte";
  import { X } from "@lucide/svelte";

  import type { NavIcon } from "$lib/types/nav";

  type Props = {
    name: NavIcon;
  };

  let { name }: Props = $props();
</script>

{#if name === "home"}
  <House class="size-5 text-neutral-100" />
{:else if name === "tv"}
  <Tv class="size-5 text-neutral-100" />
{:else if name === "movie"}
  <Clapperboard class="size-5 text-neutral-100" />
{:else if name === "user"}
  <User class="size-5 text-neutral-100" />
{:else}
  <X class="size-5 text-neutral-100" />
{/if}
