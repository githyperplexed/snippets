<script lang="ts">
  import Base from "$lib/components/nav/item/base.svelte";

  import Icon from "$lib/components/nav/icon.svelte";

  import { nav } from "$lib/stores/nav.svelte";

  import type { NavItem } from "$lib/types/nav";

  type Props = {
    item: NavItem;
  };

  let { item }: Props = $props();
</script>

<Base {item} onclick={() => nav.click()}>
  <Icon name={item.icon} />
</Base>
