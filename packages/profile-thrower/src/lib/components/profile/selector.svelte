<script lang="ts">
  import { fade } from "svelte/transition";

  import Option from "$lib/components/profile/option.svelte";
  import Power from "$lib/components/profile/power.svelte";

  import { selector } from "$lib/stores/selector.svelte";

  import { cn } from "$lib/utilities/classes";
</script>

<div 
  class={cn("flex items-center justify-center absolute inset-0 py-16 transition-opacity duration-300", {
    "opacity-0": selector.status === "pending",
  })}
  in:fade={{ duration: 300 }}
>
  <div class="flex items-center justify-center gap-4 xs:gap-5 sm:gap-6 md:gap-8 relative">
    {#if selector.poweringId}
      <Power />
    {/if}
    {#each selector.items as option (option.id)}
      <Option {option} />
    {/each}
  </div>
</div>
