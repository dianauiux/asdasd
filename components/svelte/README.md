# Svelte components

## `BeforeAfterSlider.svelte`

A before/after image comparison slider for case studies. It uses Svelte 5 runes and has no dependencies.

```svelte
<script>
  import BeforeAfterSlider from '$lib/components/BeforeAfterSlider.svelte';
  let pos = $state(50);
</script>

<BeforeAfterSlider
  before="/work/acme/before.jpg"
  after="/work/acme/after.jpg"
  beforeAlt="Checkout before the redesign"
  afterAlt="Checkout after the redesign"
  bind:value={pos}
  ratio="16 / 10"
  caption="Checkout: 5 steps reduced to 2."
/>
```

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `before` / `after` | `string` | required | Image sources. Use images with the same dimensions. |
| `beforeAlt` / `afterAlt` | `string` | `''` | Describe what changed, not "image". |
| `beforeLabel` / `afterLabel` | `string` | `Before` / `After` | Corner chips. Pass `''` to hide. |
| `value` | `number` | `50` | Divider position from 0 to 100. Bindable. |
| `step` | `number` | `1` | Arrow key step in %. |
| `ratio` | `string` | `16 / 9` | CSS `aspect-ratio` of the frame. |
| `caption` | `string` | `''` | Renders a `<figcaption>`, also linked to the control with `aria-describedby`. |
| `class` | `string` | `''` | Extra class on the `<figure>`. |

### Architecture

- **Layers:** The `after` image is the base layer. The `before` image sits on top and is cropped with `clip-path: inset()`, so nothing reflows while dragging.
- **Control:** A native `<input type="range">` covers the frame with `opacity: 0`. It handles mouse, touch, pen, keyboard (arrows, Home/End, PageUp/PageDown) and screen readers with no extra JavaScript.
- **Touch:** `touch-action: pan-y` keeps vertical page scrolling working on phones.
- **Accessibility:** The handle is 44px (WCAG 2.5.5). The focus ring is drawn on the visible handle with `:has(:focus-visible)`. `aria-valuetext` announces the reveal percentage. The component also supports `forced-colors` and `prefers-reduced-motion`.

### Theming

The component reads site tokens when they exist and falls back to its own defaults otherwise:

| Component token | Falls back to |
|---|---|
| `--bas-handle-bg` | `--bg-primary` |
| `--bas-handle-fg` | `--text-primary` |
| `--bas-focus` | `--primary-color` |
| `--bas-caption` | `--text-secondary` |
| `--bas-radius` | `--radius-lg` |

Because of this, light/dark/system themes work without changes. Override any `--bas-*` on a parent element to restyle a single instance.

## `CaseStudyRedesign.svelte`

A ready-made case study section (heading, lede, slider) built on the slider. In a SvelteKit project, put both files in `src/lib/components/` and render the section from your case study route:

```svelte
<!-- src/routes/work/[slug]/+page.svelte -->
<script>
  import CaseStudyRedesign from '$lib/components/CaseStudyRedesign.svelte';
</script>

<CaseStudyRedesign before="/work/acme/before.jpg" after="/work/acme/after.jpg" />
```
