<script>
  import { ExternalLink, Menu, X } from '@lucide/svelte';

  let {
    logo = '/assets/logo.png',
    logoWhite = null,
    logoAlt = '똑비',
    logoHref = '/index.html',
    logoHeight = 30,
    menu = [],
    ctaLabel = '',
    ctaHref = null,
    ctaOnClick = null,
    useBeforeScroll = false,
    threshold = 1200,
  } = $props();

  let scrollY = $state(0);
  const beforeScroll = $derived(useBeforeScroll && scrollY < threshold);

  let menuOpen = $state(false);
  const toggleMenu = () => (menuOpen = !menuOpen);
  const closeMenu = () => (menuOpen = false);
  const onCta = () => {
    closeMenu();
    ctaOnClick?.();
  };
</script>

<svelte:window bind:scrollY />

<header class="nav" class:beforeScroll>
  <div class="container nav-inner">
    <a href={logoHref} class="nav-logo" aria-label={logoAlt}>
      <img class="logo-main" src={logo} alt={logoAlt} style="height: {logoHeight}px" />
      {#if logoWhite}
        <img class="logo-white" src={logoWhite} alt={logoAlt} style="height: {logoHeight}px" />
      {/if}
    </a>
    {#if menu.length}
      <nav class="nav-menu">
        {#each menu as m}
          <a
            href={m.href}
            target={m.newTab ? '_blank' : undefined}
            rel={m.newTab ? 'noopener' : undefined}
          >
            {m.label}
            {#if m.newTab}<ExternalLink class="ext-icon" size={15} />{/if}
          </a>
        {/each}
      </nav>
    {/if}
    {#if ctaOnClick}
      <button type="button" class="btn btn-primary nav-cta" onclick={ctaOnClick}>{ctaLabel}</button>
    {:else if ctaHref}
      <a class="btn btn-primary nav-cta" href={ctaHref} target="_blank" rel="noopener">{ctaLabel}</a>
    {/if}

    {#if menu.length || ctaLabel}
      <button
        type="button"
        class="nav-toggle"
        onclick={toggleMenu}
        aria-label="메뉴"
        aria-expanded={menuOpen}
      >
        {#if menuOpen}<X size={24} />{:else}<Menu size={24} />{/if}
      </button>
    {/if}
  </div>

  {#if menuOpen}
    <div class="nav-drawer">
      {#if menu.length}
        <nav class="drawer-menu">
          {#each menu as m}
            <a
              href={m.href}
              target={m.newTab ? '_blank' : undefined}
              rel={m.newTab ? 'noopener' : undefined}
              onclick={closeMenu}
            >
              {m.label}
              {#if m.newTab}<ExternalLink class="ext-icon" size={15} />{/if}
            </a>
          {/each}
        </nav>
      {/if}
      {#if ctaOnClick}
        <button type="button" class="btn btn-primary drawer-cta" onclick={onCta}>{ctaLabel}</button>
      {:else if ctaHref}
        <a
          class="btn btn-primary drawer-cta"
          href={ctaHref}
          target="_blank"
          rel="noopener"
          onclick={closeMenu}>{ctaLabel}</a>
      {/if}
    </div>
  {/if}
</header>

<style>
  /* Default state = scrolled (solid white). .beforeScroll = transparent over hero. */
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    box-sizing: border-box;
    padding: 0;
    background: color-mix(in srgb, var(--bg) 88%, transparent);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    transition: padding 0.5s ease, background 0.5s ease, border-color 0.5s ease,
      backdrop-filter 0.5s ease;
  }
  .nav.beforeScroll {
    padding: 48px 28px;
    background: transparent;
    backdrop-filter: blur(0px);
    border-bottom-color: transparent;
  }
  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
    gap: 24px;
  }

  /* Logo crossfade */
  .nav-logo {
    position: relative;
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
  }
  .nav-logo img {
    width: auto;
    display: block;
    object-fit: contain;
    transition: opacity 0.35s ease;
  }
  .nav-logo .logo-white {
    position: absolute;
    top: 0;
    left: 0;
  }
  .nav .logo-main {
    opacity: 1;
  }
  .nav .logo-white {
    opacity: 0;
  }
  .nav.beforeScroll .logo-main {
    opacity: 0;
  }
  .nav.beforeScroll .logo-white {
    opacity: 1;
  }

  .nav-menu {
    display: flex;
    gap: 32px;
    font-weight: 600;
    font-size: var(--fs-title5);
    color: var(--fg-muted);
    margin-left: auto;
    transition: color 0.35s ease;
  }
  .nav-menu a {
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  .nav-menu a:hover {
    color: var(--fg);
  }
  .nav-menu :global(.ext-icon) {
    opacity: 0.6;
  }
  .nav.beforeScroll .nav-menu {
    color: rgba(255, 255, 255, 0.92);
  }
  .nav.beforeScroll .nav-menu a:hover {
    color: #fff;
  }

  .nav-cta {
    padding: 11px 20px;
    font-size: var(--fs-title5);
  }

  /* Hamburger (hidden on desktop) */
  .nav-toggle {
    display: none;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    margin: -8px -8px -8px 0;
    border: none;
    background: none;
    color: var(--fg);
    cursor: pointer;
    transition: color 0.35s ease;
  }
  .nav.beforeScroll .nav-toggle {
    color: #fff;
  }

  .nav-drawer {
    display: none;
  }

  @media (max-width: 900px) {
    .nav-menu,
    .nav-cta {
      display: none;
    }
    .nav-toggle {
      display: inline-flex;
    }
    .nav.beforeScroll {
      padding: 20px 16px;
    }

    .nav-drawer {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 8px 16px 18px;
      background: var(--bg);
      border-bottom: 1px solid var(--border);
      box-shadow: var(--shadow-md);
    }
    .drawer-menu {
      display: flex;
      flex-direction: column;
    }
    .drawer-menu a {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 14px 4px;
      font-weight: 600;
      font-size: var(--fs-title5);
      color: var(--fg);
      border-bottom: 1px solid var(--border);
    }
    .drawer-menu :global(.ext-icon) {
      opacity: 0.6;
    }
    .drawer-cta {
      margin-top: 14px;
      width: 100%;
      padding: 14px 20px;
      font-size: var(--fs-title5);
    }
    .nav .logo-main,
    .nav .logo-white {
      height: 26px !important;
    }
  }
</style>
