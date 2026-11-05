<!--
  BeforeAfterSlider: before/after image comparison for case studies.
  Svelte 5 (runes). No dependencies.

  How it works
  - "after" image is the base layer; "before" sits on top, clipped with clip-path.
  - A native <input type="range"> covers the frame. It provides drag (mouse/touch/pen),
    keyboard (arrows, Home/End, PageUp/PageDown) and screen reader support with no extra JS.
  - Theming via --bas-* custom properties (fall back to site tokens if present).
-->
<script>
  /**
   * @typedef {Object} Props
   * @property {string} before        Source of the "before" image
   * @property {string} after         Source of the "after" image
   * @property {string} [beforeAlt]
   * @property {string} [afterAlt]
   * @property {string} [beforeLabel] Visible chip text
   * @property {string} [afterLabel]
   * @property {number} [value]       Divider position, 0–100 (bindable)
   * @property {number} [step]        Keyboard step in %
   * @property {string} [ratio]       CSS aspect-ratio, e.g. "16 / 9"
   * @property {string} [caption]
   * @property {string} [class]
   */

  /** @type {Props} */
  let {
    before,
    after,
    beforeAlt = '',
    afterAlt = '',
    beforeLabel = 'Before',
    afterLabel = 'After',
    value = $bindable(50),
    step = 1,
    ratio = '16 / 9',
    caption = '',
    class: className = ''
  } = $props();

  const id = $props.id();
  const pos = $derived(Math.min(100, Math.max(0, Number(value) || 0)));
</script>

<figure class="bas {className}" style:--bas-pos="{pos}%" style:--bas-ratio={ratio}>
  <div class="bas__frame">
    <img class="bas__img" src={after} alt={afterAlt} draggable="false" />
    <img class="bas__img bas__img--before" src={before} alt={beforeAlt} draggable="false" />

    {#if beforeLabel}<span class="bas__chip bas__chip--before" class:is-hidden={pos < 8} aria-hidden="true">{beforeLabel}</span>{/if}
    {#if afterLabel}<span class="bas__chip bas__chip--after" class:is-hidden={pos > 92} aria-hidden="true">{afterLabel}</span>{/if}

    <div class="bas__divider" aria-hidden="true">
      <span class="bas__handle">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
        </svg>
      </span>
    </div>

    <input
      class="bas__range"
      type="range"
      min="0"
      max="100"
      {step}
      bind:value
      aria-label="Comparison slider: {beforeLabel} versus {afterLabel}"
      aria-valuetext="{Math.round(pos)}% {beforeLabel} visible"
      aria-describedby={caption ? `${id}-cap` : undefined}
    />
  </div>

  {#if caption}
    <figcaption id="{id}-cap" class="bas__caption">{caption}</figcaption>
  {/if}
</figure>

<style>
  .bas {
    /* Component tokens: map to site tokens when they exist */
    --bas-radius: var(--radius-lg, 16px);
    --bas-line: var(--bas-line-color, #fff);
    --bas-line-width: 2px;
    --bas-handle-size: 44px; /* WCAG 2.5.5 target size */
    --bas-handle-bg: var(--bg-primary, #fff);
    --bas-handle-fg: var(--text-primary, #111);
    --bas-focus: var(--primary-color, #6d4aff);
    --bas-chip-bg: rgb(0 0 0 / 0.6);
    --bas-chip-fg: #fff;
    --bas-caption: var(--text-secondary, #555);

    margin: 0;
    display: grid;
    gap: var(--space-2, 0.5rem);
  }

  .bas__frame {
    position: relative;
    aspect-ratio: var(--bas-ratio);
    overflow: hidden;
    border-radius: var(--bas-radius);
    background: var(--bg-secondary, #eee);
    isolation: isolate;
    user-select: none;
    touch-action: pan-y; /* keep vertical page scroll on touch */
  }

  .bas__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  .bas__img--before {
    clip-path: inset(0 calc(100% - var(--bas-pos)) 0 0);
  }

  .bas__chip {
    position: absolute;
    top: var(--space-4, 1rem);
    z-index: 1;
    padding: var(--space-1, 0.25rem) var(--space-2, 0.5rem);
    border-radius: 999px;
    background: var(--bas-chip-bg);
    color: var(--bas-chip-fg);
    font-size: var(--text-xs, 0.75rem);
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }
  .bas__chip--before { left: var(--space-4, 1rem); }
  .bas__chip--after { right: var(--space-4, 1rem); }

  .bas__divider {
    position: absolute;
    top: 0;
    bottom: 0;
    left: var(--bas-pos);
    z-index: 2;
    width: var(--bas-line-width);
    translate: -50% 0;
    background: var(--bas-line);
    box-shadow: 0 0 0 1px rgb(0 0 0 / 0.15);
    pointer-events: none;
  }

  .bas__handle {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    display: grid;
    place-items: center;
    width: var(--bas-handle-size);
    height: var(--bas-handle-size);
    border-radius: 50%;
    background: var(--bas-handle-bg);
    color: var(--bas-handle-fg);
    box-shadow: 0 2px 10px rgb(0 0 0 / 0.25);
    transition: scale 0.15s ease, box-shadow 0.15s ease;
  }

  /* Invisible native range = the actual control */
  .bas__range {
    position: absolute;
    inset: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: ew-resize;
    appearance: none;
    -webkit-appearance: none;
    background: transparent;
  }
  .bas__range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: var(--bas-handle-size);
    height: 100vh;
  }
  .bas__range::-moz-range-thumb {
    width: var(--bas-handle-size);
    height: 100vh;
    border: 0;
  }

  .bas__frame:hover .bas__handle,
  .bas__frame:has(.bas__range:active) .bas__handle { scale: 1.08; }

  /* Focus ring drawn on the visible handle (range is opacity 0). The divider
     precedes the range in DOM, so use :has() on the frame. */
  .bas__frame:has(.bas__range:focus-visible) .bas__handle {
    box-shadow: 0 0 0 3px var(--bas-handle-bg), 0 0 0 6px var(--bas-focus);
  }

  /* Hide a chip when the divider slides over it */
  .bas__chip.is-hidden { opacity: 0; }

  .bas__caption {
    color: var(--bas-caption);
    font-size: var(--text-sm, 0.875rem);
    line-height: 1.5;
  }

  @media (prefers-reduced-motion: reduce) {
    .bas__handle, .bas__chip { transition: none; }
  }

  @media (forced-colors: active) {
    .bas__divider { background: CanvasText; }
    .bas__handle { border: 2px solid CanvasText; }
  }
</style>
