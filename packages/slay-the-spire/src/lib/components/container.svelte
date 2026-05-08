<script lang="ts">
	import Arm from "$lib/components/arm.svelte";
	import Card from "$lib/components/card.svelte";

	import { cards } from "$lib/data/cards";
</script>

<div
	class="card-container pattern-dots relative grid grid-cols-4 overflow-hidden bg-black"
	style="--pattern-op: 0.1; --pattern-sz: 5em 5em;"
>
	{#each cards as card (card.index)}
		<Card data={card} />
	{/each}
	<Arm />
</div>

<style>
	.card-container {
		width: clamp(22.5rem, 60vw, 72rem);
		font-size: clamp(0.225rem, 0.6vw, 0.72rem);
		gap: 3em;
		padding: 3em;
		border: max(1px, 0.1em) solid oklch(0.3 0 0);
		border-radius: 1.8em;
	}
</style>
