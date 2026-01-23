<script lang="ts">
	import { cn } from "$lib/utilities/classes";

	interface Props {
		value: string;
		class?: string;
		color?: string;
	}

	let { value, class: className, color }: Props = $props();
</script>

<style>
	@keyframes pulse {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	.dot {
		animation: pulse 1.4s infinite ease-in-out both;
		margin-left: 0.2rem;
	}

	.dot:nth-of-type(1) {
		animation-delay: -0.32s;
	}

	.dot:nth-of-type(2) {
		animation-delay: -0.16s;
	}
</style>

<div class={cn("flex items-center gap-2", className)}>
	{#if color}
		<span class={cn("size-2 rounded-full", color)}></span>
	{/if}
	<span class="font-mono">
		{value}<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
	</span>
</div>