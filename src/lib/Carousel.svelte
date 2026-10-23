<script>
  import { ChevronLeft, ChevronRight } from '@lucide/svelte';

  let { slides, aspect = '4 / 3', position = 'center', interval = 4500, fill = false } = $props();

  let current = $state(0);
  const n = slides.length;
  const goto = (i) => (current = (i + n) % n);
  const next = () => goto(current + 1);
  const prev = () => goto(current - 1);

  $effect(() => {
    if (n <= 1) return;
    const id = setInterval(() => (current = (current + 1) % n), interval);
    return () => clearInterval(id);
  });
</script>

<div class="carousel" class:fill style="--aspect: {aspect}; --pos: {position};">
  <div class="window">
    <div class="track" style="transform: translateX(-{current * 100}%);">
      {#each slides as s}
        {@const Icon = s.icon}
        <div class="slide">
          <img src={s.img} alt={s.alt} loading="lazy" />
          {#if s.caption}
            <div class="cap">
              {#if Icon}<span class="cap-ic"><Icon size={18} /></span>{/if}
              <span>{s.caption}</span>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  {#if n > 1}
    <button class="arrow prev" onclick={prev} aria-label="이전">
      <ChevronLeft size={20} />
    </button>
    <button class="arrow next" onclick={next} aria-label="다음">
      <ChevronRight size={20} />
    </button>
    <div class="dots">
      {#each slides as _, i}
        <button
          class="dot"
          class:active={i === current}
          onclick={() => goto(i)}
          aria-label={`${i + 1}번째 슬라이드`}
        ></button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .carousel {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    background: var(--bg-muted);
    box-shadow: var(--shadow-sm);
  }
  .carousel.fill {
    border-radius: 0;
    box-shadow: none;
    height: 100%;
  }
  .window {
    overflow: hidden;
  }
  .carousel.fill .window {
    height: 100%;
  }
  .track {
    display: flex;
    transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .carousel.fill .track {
    height: 100%;
  }
  .slide {
    position: relative;
    min-width: 100%;
    aspect-ratio: var(--aspect);
  }
  .carousel.fill .slide {
    aspect-ratio: auto;
    height: 100%;
  }
  .slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: var(--pos);
  }
  .cap {
    position: absolute;
    left: 16px;
    bottom: 16px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 16px 9px 10px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--bg) 88%, transparent);
    backdrop-filter: blur(8px);
    box-shadow: var(--shadow-sm);
    font-weight: 700;
    font-size: var(--fs-body2);
    color: var(--fg);
  }
  .cap-ic {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--accent-soft);
    color: var(--accent);
  }
  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: none;
    background: var(--bg);
    color: var(--fg);
    box-shadow: var(--shadow-md);
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: background 0.18s ease, transform 0.12s ease;
    z-index: 2;
  }
  .arrow:hover {
    background: var(--bg-muted);
  }
  .arrow:active {
    transform: translateY(-50%) scale(0.92);
  }
  .arrow.prev {
    left: 14px;
  }
  .arrow.next {
    right: 14px;
  }
  .dots {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--bg) 82%, transparent);
    backdrop-filter: blur(8px);
    box-shadow: var(--shadow-sm);
    z-index: 2;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    border: none;
    background: var(--border);
    cursor: pointer;
    padding: 0;
    transition: width 0.25s ease, background 0.25s ease;
  }
  .dot.active {
    width: 24px;
    background: var(--accent);
  }
</style>
