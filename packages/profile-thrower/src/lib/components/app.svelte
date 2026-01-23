<script lang="ts">
  import Animation from "$lib/components/profile/animation.svelte";
  import Loading from "$lib/components/content/loading.svelte";
  import Nav from "$lib/components/nav/nav.svelte";
  import Selector from "$lib/components/profile/selector.svelte";

  import { content } from "$lib/stores/content.svelte";
  import { nav } from "$lib/stores/nav.svelte";
  import { profile } from "$lib/stores/profile.svelte";
  import { selector } from "$lib/stores/selector.svelte";

  import { fetchProfiles } from "$lib/services/profile";
  import { fetchNavItems } from "$lib/services/nav";

  $effect(() => {
    selector.set(fetchProfiles());
    nav.set(fetchNavItems());
  });
</script>

<main class="h-svh flex items-center justify-center">
  {#if profile.status !== "success"}
    <Selector />
  {/if}
  {#if content.status === "pending"}
    <Loading />
  {/if}
</main>

{#if selector.status === "pending" || profile.status === "success"}
  <Nav />
{/if}

{#if selector.status === "pending"}
  <Animation />
{/if}