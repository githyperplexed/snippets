<script lang="ts">
  import Image from "$lib/components/profile/image.svelte";

  import { animation } from "$lib/stores/animation.svelte";
  import { profile } from "$lib/stores/profile.svelte";

  import {
    getKeyframes,
    resolvePhysicsOptions,
  } from "$lib/utilities/animation";

  let element = $state<HTMLDivElement>();

  $effect(() => {
    if (animation.status === "pending" && element) {
      animate();
    }
  });

  const animate = () => {
    if (!element) return;

    const target = document.querySelector("#me > div");

    if (!target) return;

    const start = element.getBoundingClientRect();
    const end = target.getBoundingClientRect();

    const options = resolvePhysicsOptions({
      duration: 800,
      peak: 200,
      rotation: 720,
      power: animation.power,
    });

    const keyframes = getKeyframes(start, end, options);

    const anim = element.animate(keyframes, {
      duration: options.duration,
      fill: "forwards",
      easing: "linear",
    });

    anim.onfinish = () => {
      animation.end();
    };
  };
</script>

<div class="w-full h-full fixed left-0 top-0 pointer-events-none z-50">
  {#if animation.status === "pending"}
    <div
      bind:this={element}
      style="translate: {animation.start.x}px {animation.start.y}px"
      class="origin-top-left absolute"
    >
      <Image color={profile.color} size="lg" />
    </div>
  {/if}
</div>
