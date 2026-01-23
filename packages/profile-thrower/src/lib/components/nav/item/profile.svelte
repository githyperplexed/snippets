<script lang="ts">
  import Base from "$lib/components/nav/item/base.svelte";
  import ProfileImage from "$lib/components/profile/image.svelte";

  import { profile } from "$lib/stores/profile.svelte";
  import { selector } from "$lib/stores/selector.svelte";

  import { nav } from "$lib/stores/nav.svelte";

  import type { NavItem } from "$lib/types/nav";

  let item = $derived<NavItem>({
    id: "me",
    name: "Me",
    href: "/me",
    icon: "user",
  });
</script>

<Base {item} variant={profile.id === "ghost" ? "ghost" : "standard"} onclick={() => nav.click()}>
  <ProfileImage
    color={profile.color}
    size="sm"
    variant={selector.status === "pending" ? "ghost" : "standard"}
  />
</Base>
