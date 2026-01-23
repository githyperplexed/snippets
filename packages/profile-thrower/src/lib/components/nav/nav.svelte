<script lang="ts">
  import { fade } from "svelte/transition";

  import IconItem from "$lib/components/nav/item/icon.svelte";
  import ProfileItem from "$lib/components/nav/item/profile.svelte";

  import { nav } from "$lib/stores/nav.svelte";
</script>

<div class="w-full flex items-center justify-center fixed bottom-0 left-0" in:fade={{ duration: 300 }} out:fade={{ duration: 150 }}>
  <nav class="flex items-center gap-6 p-4">
    {#each nav.items as item (item.id)}
      <IconItem {item} />
    {/each}
    <ProfileItem />
  </nav>
</div>
