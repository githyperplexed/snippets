<script lang="ts">
	import type { CardData } from "$lib/data/cards";
	import { deck } from "$lib/stores/deck.svelte";

	type Props = {
		data: CardData;
		stackIndex: number;
	};

	const { data, stackIndex }: Props = $props();

	const stackOffset = $derived(stackIndex * -10);

	let frozenOffset: number | null = null;

	const slide = (_node: Element) => {
		const offset = frozenOffset ?? stackOffset;
		return {
			duration: 250,
			css: (t: number) =>
				`translate: ${offset}% ${(1 - t) * 150}%; pointer-events: ${t > 0.5 ? "auto" : "none"};`
		};
	};

	const onClick = () => {
		frozenOffset = stackOffset;
		deck.remove(data.index);
	};
</script>

<button
	class="card absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black cursor-pointer select-none rounded-[inherit] hover:scale-[1.02] active:scale-[0.98] z-(--card-index)"
	data-index={data.index}
	style="--card-color: {data.color}; --card-index: {stackIndex};"
	onclick={onClick}
	in:slide
	out:slide
>
	<div
		class="pattern-stripes absolute inset-0 pointer-events-none rounded-[inherit]"
		style="--pattern-fg: var(--card-color); --pattern-op: 0.06; --pattern-sz: 35em 35em;"
	></div>
	<img class="pointer-events-none relative" src={data.icon} alt={data.name} />
</button>

<style>
	.card {
		border: max(1px, 0.7em) solid oklch(var(--card-color) / 0.36);
		translate: calc(var(--card-index) * -10%) 0%;
		transition:
			translate 250ms ease-in-out,
			scale 100ms ease-in-out;
	}

	.card img {
		width: 45em;
		height: 45em;
	}

	.card:focus-visible {
		outline: max(1px, 1.4em) solid oklch(var(--card-color));
		outline-offset: max(1px, 1.4em);
	}
</style>
