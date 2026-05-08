<script lang="ts">
	import type { CardData } from "$lib/data/cards";
	import { deck } from "$lib/stores/deck.svelte";

	type Props = { data: CardData };
	const { data }: Props = $props();

	const selected = $derived(deck.isSelected(data.index));
</script>

<button
	class="card relative flex aspect-5/7 cursor-pointer items-center justify-center bg-black select-none hover:scale-[1.02] active:scale-[0.98] data-[selected=true]:translate-y-[-250%]"
	data-index={data.index}
	data-selected={selected}
	inert={selected}
	style="--card-color: {data.color};"
	onclick={() => deck.add(data.index)}
>
	<div
		class="pattern-stripes absolute inset-0 pointer-events-none rounded-[inherit]"
		style="--pattern-fg: var(--card-color); --pattern-op: 0.06; --pattern-sz: 8em 8em;"
	></div>
	<img class="pointer-events-none relative" src={data.icon} alt={data.name} />
</button>

<style>
	.card {
		border: max(1px, 0.1em) solid oklch(var(--card-color) / 0.36);
		border-radius: 0.9em;
		transition:
			translate 400ms ease,
			scale 100ms ease-in-out;
	}

	.card img {
		width: 9em;
		height: 9em;
	}

	.card:focus-visible {
		outline: max(1px, 0.2em) solid oklch(var(--card-color));
		outline-offset: max(1px, 0.2em);
	}

	.card[data-selected="true"] {
		transition:
			translate 250ms cubic-bezier(0.36, 0, 0.66, -0.15),
			scale 100ms ease-in-out;
	}
</style>
