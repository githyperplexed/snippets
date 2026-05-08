<script lang="ts">
	import Container from "$lib/components/container.svelte";
	import Deck from "$lib/components/deck/deck.svelte";
</script>

<main
	class="pattern-grid flex min-h-svh flex-col items-center justify-center overflow-hidden"
	style="--pattern-op: 0.06; --pattern-sz: 20rem 20rem;"
>
	<Container />
	<Deck />
</main>
