# HALO Eyewear: animated storefront

Single-page eyewear landing site. Plain HTML/CSS/JS + GSAP (vendored, no build step).
Open `index.html` in a browser, or serve the folder: `npx serve sites/halo-eyewear`.

## Sections

| # | Section | Animation |
|---|---|---|
| 0 | Intro curtain | Letters slide in/out, curtain wipes up |
| 1 | Hero | Frame **draws itself in** (stroke-dashoffset), then on scroll (pinned) rotates from 3D tilt to front, lenses tint, glint sweeps, hotspot cards pop in |
| — | Marquee | Infinite loop that **speeds up and reverses with scroll velocity** |
| 2 | Fit finder | Sliders compute size S/M/L (letter flips), glasses scale on face; face-shape chips **morph the head outline and the recommended frame** |
| 3 | Collection (dark) | Carousel: frame **morphs shape + colour**, giant name letters stagger out/in, glow colour and price count tween; drag/swipe, arrows, keyboard, mouse tilt |
| 4 | Lens reveal | Pinned; a lens grows over "LOOK CLOSER" and `clip-path` opens onto the store/CTA section |

Global: custom cursor (labels "Drag" over the carousel), magnetic buttons, add-to-bag dot that flies into the bag icon, toast, nav that flips colour over dark sections, light/dark/system theme toggle.

## Files

```
css/design-system.css   tokens: colour (light/dark/system), type, spacing, radius, motion
css/layout.css          nav shell, containers
css/components.css      pill, chip, card, button, slider, theme toggle, bag, cursor, toast, marquee
css/sections.css        hero, fit, collection, reveal
js/theme-manager.js     theme switching + persistence
js/glasses.js           SVG frame generator; morphs between shapes
js/main.js              all GSAP timelines and interactions (numbered sections)
vendor/                 gsap 3.12.5 + ScrollTrigger
```

## How the frame morphing works

Every lens is one SVG path with the same structure: `M` plus 4 cubic curves (top → outer → bottom → inner).
Because all five shapes (`round`, `oval`, `square`, `cateye`, `aviator`) share that structure, GSAP
tweens the `d` attribute number by number, with no MorphSVG plugin needed. Add a shape in `SHAPES` (glasses.js)
by giving 4 anchors and 8 handle lengths.

## Editing content

- **Frames / prices / colours**: `MODELS` at the top of `js/main.js`
- **Face shape → recommended frame**: `FACES` in `js/main.js`
- **Brand colours**: `--accent-color`, `--bg-*` in `css/design-system.css`

## Swapping in real product photos

Replace a `.glasses` div's contents with an `<img>` (transparent PNG/WebP, ~1600px wide).
The carousel will still animate position, name, glow and price; shape morphing only applies to SVG frames.

## Accessibility

- `prefers-reduced-motion`: intro skipped, no pinning or scrubbing, final states shown
- Carousel: arrow buttons, tablist swatches, keyboard ← →, `aria-live` price
- Theme toggle and selectors use `role="radiogroup"` + `aria-checked`
