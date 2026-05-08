<script lang="ts">
	import Card from "$lib/components/deck/card.svelte";

	import { cards } from "$lib/data/cards";
	import { deck } from "$lib/stores/deck.svelte";
</script>

<div class="deck fixed aspect-5/7">
	{#each deck.order as index, i (index)}
		<Card data={cards[index]} stackIndex={deck.order.length - 1 - i} />
	{/each}
</div>

<style>
	.deck {
		background-color: oklch(0.1 0 0);
		right: clamp(0.9rem, 2vw, 1.75rem);
		bottom: clamp(0.9rem, 2vw, 1.75rem);
		height: clamp(9rem, 20vw, 17.5rem);
		font-size: clamp(0.064rem, 0.143vw, 0.125rem);
		border-radius: 4.8em;
		border: max(1px, 0.7em) solid oklch(0.2 0 0);
	}
</style>
