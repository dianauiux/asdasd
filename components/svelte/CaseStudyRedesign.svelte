<!--
  Example case study section using BeforeAfterSlider.
  Drop into a case study page (e.g. src/routes/case-study/[slug]/+page.svelte)
  and swap the image paths for your project's screens.
-->
<script>
  import BeforeAfterSlider from './BeforeAfterSlider.svelte';

  let {
    before = '/case-study/before.jpg',
    after = '/case-study/after.jpg',
    title = 'The redesign',
    lede = 'Drag the handle to compare the original screen with the shipped version.'
  } = $props();

  let position = $state(50);
</script>

<section class="cs-compare" aria-labelledby="cs-compare-title">
  <header class="cs-compare__head">
    <h2 id="cs-compare-title">{title}</h2>
    <p>{lede}</p>
  </header>

  <BeforeAfterSlider
    {before}
    {after}
    beforeAlt="Original screen before the redesign"
    afterAlt="Redesigned screen"
    bind:value={position}
    caption="Left: original. Right: redesign."
  />
</section>

<style>
  .cs-compare {
    box-sizing: border-box;
    width: 100%;
    max-width: var(--container-lg, 1024px);
    margin: 0 auto;
    padding: var(--space-12, 3rem) var(--space-4, 1rem);
    display: grid;
    gap: var(--space-6, 1.5rem);
  }
  .cs-compare__head h2 {
    margin: 0 0 var(--space-2, 0.5rem);
    font-size: var(--text-2xl, 1.5rem);
    line-height: 1.2;
    color: var(--text-primary, inherit);
  }
  .cs-compare__head p {
    margin: 0;
    max-width: 60ch;
    color: var(--text-secondary, inherit);
  }
</style>
