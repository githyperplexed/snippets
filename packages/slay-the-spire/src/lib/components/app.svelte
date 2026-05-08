<script lang="ts">
	import Container from "$lib/components/container.svelte";
	import Deck from "$lib/components/deck/deck.svelte";
</script>

<main
	class="pattern-grid flex min-h-svh flex-col items-center justify-center overflow-hidden"
	style="--pattern-op: 0.04; --pattern-sz: 10rem 10rem;"
>
	<Container />
	<Deck />
</main>
