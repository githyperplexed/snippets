<script lang="ts">
  import { onMount } from "svelte";

  import { fade } from "svelte/transition";

  import LoadingText from "$lib/components/loading/text.svelte";

  import { wait } from "$lib/services/request";

  let step = $state(0),
    duration = $state(1500),
    visible = $state(true);

  const steps = [
    "Simulating loading content",
    "Just a little bit longer",
    "How long this is taking",
    "should signify importance",
    "Click 'Me' to start over",
  ];

  const next = async () => {
    visible = false;
    
    await wait(200);

    if (step < steps.length - 1) {
      step += 1;
    } else {
      step = 0;
    }
    
    visible = true;
  };

  onMount(() => {
    const interval = setInterval(next, duration + 500);

    return () => clearInterval(interval);
  });
</script>

<div class="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-none">
  {#if visible}
    <div transition:fade={{ duration: 200 }} class="p-4">
      <LoadingText value={steps[step]} class="text-base md:text-xl text-white text-center" />
    </div>
  {/if}
</div>
