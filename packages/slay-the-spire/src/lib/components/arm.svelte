<script lang="ts">
	import src from "$lib/assets/arm.png";
</script>

<img
	class="arm absolute h-full left-1/2 top-0 -translate-x-1/2 -translate-y-full z-3 pointer-events-none select-none"
	{src}
	alt="Arm"
/>

<style>
	.arm {
		transition:
			left 300ms ease-in-out,
			top 300ms ease-in-out;
		transition-delay: 300ms;
	}

	:global(.card-container:has(.card:hover)) .arm {
		transition-delay: 0ms;
	}

	:global(.card-container:has(.card[data-index="0"]:hover)) .arm {
		left: 14.625%;
		top: 20%;
	}
	:global(.card-container:has(.card[data-index="1"]:hover)) .arm {
		left: 38.875%;
		top: 20%;
	}
	:global(.card-container:has(.card[data-index="2"]:hover)) .arm {
		left: 63.125%;
		top: 20%;
	}
	:global(.card-container:has(.card[data-index="3"]:hover)) .arm {
		left: 87.375%;
		top: 20%;
	}

	:global(.card-container:has(.card[data-index="4"]:hover)) .arm {
		left: 14.625%;
		top: 67.5%;
	}
	:global(.card-container:has(.card[data-index="5"]:hover)) .arm {
		left: 38.875%;
		top: 67.5%;
	}
	:global(.card-container:has(.card[data-index="6"]:hover)) .arm {
		left: 63.125%;
		top: 67.5%;
	}
	:global(.card-container:has(.card[data-index="7"]:hover)) .arm {
		left: 87.375%;
		top: 67.5%;
	}
</style>
