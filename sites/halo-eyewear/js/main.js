/* ==========================================================================
   HALO Eyewear — interactions & animation
   1. Data          5. Marquee            9. Nav state
   2. Helpers       6. Fit finder         10. Cursor + magnetic
   3. Intro         7. Collection         11. Bag
   4. Hero          8. Lens reveal
   ========================================================================== */
(function () {
  'use strict';

  var gsap = window.gsap;
  var ST = window.ScrollTrigger;
  gsap.registerPlugin(ST);

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------------------------------------------------------------- 1. Data */
  var MODELS = [
    { id: 'aura',  name: 'AURA',  full: 'Aura Round · Matte Onyx',     shape: 'round',   frame: ['#5a5a63', '#141418'], lens: '#2c2c3a', lensOpacity: 0.85, stroke: 14, glow: '#33335c', swatch: '#1b1b1f', price: 189, was: 240 },
    { id: 'nova',  name: 'NOVA',  full: 'Nova Cat-Eye · Tortoise',     shape: 'cateye',  frame: ['#b4682f', '#3d1c0c'], lens: '#7a4a20', lensOpacity: 0.75, stroke: 15, glow: '#5c2c12', swatch: '#8a4a22', price: 209, was: 260 },
    { id: 'orion', name: 'ORION', full: 'Orion Aviator · Brushed Gold', shape: 'aviator', frame: ['#f4dc98', '#9c7426'], lens: '#3e5a48', lensOpacity: 0.8,  stroke: 8,  glow: '#4f4318', swatch: '#d4af5a', price: 249, was: 310 },
    { id: 'mira',  name: 'MIRA',  full: 'Mira Oval · Rose Crystal',    shape: 'oval',    frame: ['#f9cfd9', '#c97890'], lens: '#e7a1b4', lensOpacity: 0.55, stroke: 13, glow: '#5e2238', swatch: '#eaa3b6', price: 179, was: 220 },
    { id: 'kite',  name: 'KITE',  full: 'Kite Square · Glacier Blue',  shape: 'square',  frame: ['#c6def5', '#5d86b5'], lens: '#4f7fb8', lensOpacity: 0.6,  stroke: 14, glow: '#1d3a63', swatch: '#8fb3d9', price: 199, was: 250 }
  ];
  var HERO_MODEL = { name: 'HALO Titanium', shape: 'square', frame: ['#34343a', '#0b0b0d'], lens: '#1d2430', lensOpacity: 0.82, stroke: 15 };

  /* Face shape → head outline (same 4-curve structure so it morphs) + best frame */
  var FACES = {
    oval:   { model: 'nova',  d: 'M200 40 C290 40 330 120 330 210 C330 320 270 410 200 410 C130 410 70 320 70 210 C70 120 110 40 200 40 Z' },
    round:  { model: 'kite',  d: 'M200 58 C302 58 342 138 342 228 C342 330 282 402 200 402 C118 402 58 330 58 228 C58 138 98 58 200 58 Z' },
    square: { model: 'aura',  d: 'M200 44 C302 44 326 90 326 200 C326 332 302 406 200 406 C98 406 74 332 74 200 C74 90 98 44 200 44 Z' },
    heart:  { model: 'orion', d: 'M200 40 C302 40 338 110 338 192 C338 300 252 412 200 412 C148 412 62 300 62 192 C62 110 98 40 200 40 Z' }
  };

  /* ------------------------------------------------------------- 2. Helpers */
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function byId(id) { return MODELS.filter(function (m) { return m.id === id; })[0]; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* Split a heading on <br> into masked lines for a slide-up reveal */
  function splitLines(el) {
    var parts = el.innerHTML.split(/<br\s*\/?>/i);
    el.innerHTML = parts.map(function (p) {
      return '<span class="split-line"><span>' + p.trim() + '</span></span>';
    }).join('');
    return $$('.split-line > span', el);
  }

  var splits = {};
  $$('[data-split]').forEach(function (el) { splits[el.id] = splitLines(el); });

  /* -------------------------------------------------------------- 3. Intro */
  function runIntro(done) {
    var el = $('.intro');
    if (reduce || !el) { if (el) el.remove(); done(); return; }
    document.documentElement.style.overflow = 'hidden';
    gsap.timeline({
      onComplete: function () { el.remove(); document.documentElement.style.overflow = ''; }
    })
      .from('.intro__word span', { yPercent: 110, duration: 0.7, stagger: 0.06, ease: 'expo.out' })
      .to('.intro__word span', { yPercent: -110, duration: 0.45, stagger: 0.04, ease: 'expo.in' }, '+=0.25')
      .to(el, { yPercent: -100, duration: 0.8, ease: 'expo.inOut' }, '-=0.1')
      .add(done, '-=0.5');
  }

  /* --------------------------------------------------------------- 4. Hero */
  var heroG = Glasses.build($('[data-glasses="hero"]'), HERO_MODEL);
  var hotspots = $$('.hotspot');
  var bgWord = $('.hero__bg-word');

  gsap.set(bgWord, { xPercent: -50, yPercent: -58, x: 0, y: 0, left: '50%', top: '50%' });

  // Prepare the "drawn in" frame strokes
  heroG.frameStrokes.forEach(function (p) {
    var len = Math.ceil(p.getTotalLength());
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = reduce ? 0 : len;
  });

  if (!reduce) {
    gsap.set(heroG.el, { rotationY: -38, rotationX: 24, scale: 0.8, opacity: 0 });
    gsap.set(heroG.lenses, { opacity: 0 });
    gsap.set(hotspots, { autoAlpha: 0, scale: 0.6 });
    gsap.set(splits['hero-title'], { yPercent: 110 });
    gsap.set(['.hero__copy .chip', '.hero__copy .text-body', '.hero__scroll'], { autoAlpha: 0, y: 20 });
  }

  function heroEntrance() {
    if (reduce) return;
    gsap.timeline()
      .to(splits['hero-title'], { yPercent: 0, duration: 1, stagger: 0.1, ease: 'expo.out' }, 0)
      .to(['.hero__copy .chip', '.hero__copy .text-body', '.hero__scroll'], { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'expo.out' }, 0.15)
      .to(heroG.el, { opacity: 1, duration: 0.4 }, 0.1)
      .to(heroG.frameStrokes, { strokeDashoffset: 0, duration: 1.6, stagger: 0.08, ease: 'power2.inOut' }, 0.1)
      .from(bgWord, { yPercent: -40, autoAlpha: 0, duration: 1.4, ease: 'expo.out' }, 0);

    // Gentle idle float on the stage (separate element from the 3D-rotated one)
    gsap.to('.hero__stage', { y: -10, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  }

  if (!reduce) {
    // Scroll-driven: rotate to front, tint lenses, glint, reveal hotspots, then push forward
    gsap.timeline({
      scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=170%', pin: '.hero__pin', scrub: 0.8, anticipatePin: 1 }
    })
      .to(heroG.el, { rotationY: 0, rotationX: 0, scale: 1, duration: 1, ease: 'power2.out' }, 0)
      .to(heroG.lenses, { opacity: 1, duration: 0.5 }, 0.45)
      .fromTo(heroG.glints, { attr: { x: -120 } }, { attr: { x: 760 }, duration: 0.8, ease: 'power1.inOut' }, 0.8)
      .to(bgWord, { xPercent: -58, duration: 2.2, ease: 'none' }, 0)
      .to(hotspots, { autoAlpha: 1, scale: 1, duration: 0.3, stagger: 0.22, ease: 'back.out(2)' }, 1.0)
      .to('.hero__scroll', { autoAlpha: 0, duration: 0.2 }, 0.1)
      .to(hotspots, { autoAlpha: 0, duration: 0.25 }, 2.0)
      .to('.hero__copy', { y: -40, autoAlpha: 0, duration: 0.3 }, 2.0)
      .to(heroG.el, { scale: 1.25, y: 30, duration: 0.5, ease: 'power2.in' }, 2.0);
  }

  // Parallax the outline word with the mouse
  if (finePointer && !reduce) {
    var bgX = gsap.quickTo(bgWord, 'x', { duration: 1.2, ease: 'power3' });
    var bgY = gsap.quickTo(bgWord, 'y', { duration: 1.2, ease: 'power3' });
    $('.hero').addEventListener('pointermove', function (e) {
      bgX((e.clientX / window.innerWidth - 0.5) * -40);
      bgY((e.clientY / window.innerHeight - 0.5) * -24);
    });
  }

  /* ------------------------------------------------------------ 5. Marquee */
  if (!reduce) {
    var mq = gsap.to('.marquee__track', { xPercent: -50, repeat: -1, duration: 24, ease: 'none' });
    var dir = 1;
    ST.create({
      start: 0, end: 'max',
      onUpdate: function (self) {
        dir = self.direction;
        var boost = Math.min(Math.abs(self.getVelocity()) / 250, 6);
        gsap.to(mq, {
          timeScale: dir * (1 + boost), duration: 0.15, overwrite: true,
          onComplete: function () { gsap.to(mq, { timeScale: dir, duration: 1.2 }); }
        });
      }
    });
  }

  /* --------------------------------------------------------- 6. Fit finder */
  var faceG = Glasses.build($('[data-glasses="face"]'), byId(FACES.oval.model));
  var fit = { width: 140, pd: 63, face: 'oval', size: 'M' };
  var faceStage = $('.fit__stage');
  var sizeLetter = $('[data-out="size"]');

  function setFill(input) {
    var pct = ((input.value - input.min) / (input.max - input.min)) * 100;
    input.style.setProperty('--fill', pct + '%');
  }

  function updateFit() {
    var size = fit.width < 133 ? 'S' : fit.width > 147 ? 'L' : 'M';
    var lens = { S: 48, M: 51, L: 54 }[size];
    var bridge = Math.round(16 + (fit.pd - 54) * 0.3);
    var scale = 0.86 + ((fit.width - 120) / 40) * 0.26;

    $('[data-out="width"]').innerHTML = fit.width + '<small>mm</small>';
    $('[data-out="pd"]').innerHTML = fit.pd + '<small>mm</small>';
    $('[data-out="lens"]').textContent = lens + ' mm';
    $('[data-out="bridge"]').textContent = bridge + ' mm';
    faceStage.style.setProperty('--g-scale', scale.toFixed(3));

    if (size !== fit.size) {
      fit.size = size;
      gsap.timeline()
        .to(sizeLetter, { yPercent: -60, autoAlpha: 0, duration: 0.15, ease: 'power2.in' })
        .add(function () { sizeLetter.textContent = size; })
        .fromTo(sizeLetter, { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.4, ease: 'back.out(2)' });
    }
  }

  $$('[data-in]').forEach(function (input) {
    setFill(input);
    input.addEventListener('input', function () {
      fit[input.dataset.in] = +input.value;
      setFill(input);
      updateFit();
    });
  });

  $$('.shape-picker .chip').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var face = btn.dataset.face;
      if (face === fit.face) return;
      fit.face = face;
      $$('.shape-picker .chip').forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-checked', on ? 'true' : 'false');
      });
      var m = byId(FACES[face].model);
      gsap.to('.face__head', { attr: { d: FACES[face].d }, duration: 0.9, ease: 'expo.inOut' });
      faceG.set(m, { duration: 0.9 });
      $('[data-out="model"]').textContent = m.name;
      gsap.fromTo('.fit__tag', { scale: 0.94 }, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    });
  });
  updateFit();

  /* --------------------------------------------------------- 7. Collection */
  var col = $('.collection');
  var nameEl = $('.collection__name');
  var stage = $('.collection__stage');
  var scene = Glasses.build($('[data-glasses="scene"]'), MODELS[0]);
  var ghostPrev = Glasses.build($('[data-glasses="ghost-prev"]'), MODELS[MODELS.length - 1]);
  var ghostNext = Glasses.build($('[data-glasses="ghost-next"]'), MODELS[1]);
  var swatchWrap = $('.swatches');
  var idx = 0;
  var priceState = { v: MODELS[0].price };

  MODELS.forEach(function (m, i) {
    var b = document.createElement('button');
    b.className = 'swatch';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    b.style.setProperty('--c', m.swatch);
    b.innerHTML = '<i></i>' + m.name.charAt(0) + m.name.slice(1).toLowerCase();
    b.addEventListener('click', function () { go(i, i > idx ? 1 : -1); });
    swatchWrap.appendChild(b);
  });

  function letters(text) {
    nameEl.innerHTML = text.split('').map(function (c) { return '<span>' + c + '</span>'; }).join('');
    return $$('span', nameEl);
  }

  function setName(text, d, instant) {
    var old = $$('span', nameEl);
    if (instant || reduce || !old.length) { letters(text); return; }
    gsap.killTweensOf(old);
    gsap.to(old, {
      yPercent: -110 * d, duration: 0.35, stagger: 0.03, ease: 'power3.in',
      onComplete: function () {
        gsap.from(letters(text), { yPercent: 110 * d, duration: 0.8, stagger: 0.05, ease: 'expo.out' });
      }
    });
  }

  function go(i, d) {
    var n = MODELS.length;
    idx = (i + n) % n;
    var m = MODELS[idx];
    var dur = reduce ? 0.01 : 0.9;

    scene.set(m, { duration: dur });
    ghostPrev.set(MODELS[(idx - 1 + n) % n], { duration: dur, glint: false });
    ghostNext.set(MODELS[(idx + 1) % n], { duration: dur, glint: false });

    if (!reduce) {
      gsap.fromTo(scene.el, { x: 80 * d, rotation: 5 * d }, { x: 0, rotation: 0, duration: 1.1, ease: 'expo.out', overwrite: 'auto' });
    }
    gsap.to(col, { '--glow': m.glow, duration: dur, ease: 'power2.inOut' });
    setName(m.name, d);

    gsap.to(priceState, {
      v: m.price, duration: dur, ease: 'power2.out', snap: { v: 1 },
      onUpdate: function () { $('[data-out="price"]').textContent = '$' + priceState.v; }
    });
    $('[data-out="was"]').textContent = '$' + m.was;
    $('[data-out="full"]').textContent = m.full;
    $('[data-out="index"]').textContent = pad(idx + 1) + ' / ' + pad(n);
    $$('.swatch').forEach(function (s, k) { s.setAttribute('aria-selected', k === idx ? 'true' : 'false'); });
  }

  setName(MODELS[0].name, 1, true);
  $('.arrow--prev').addEventListener('click', function () { go(idx - 1, -1); });
  $('.arrow--next').addEventListener('click', function () { go(idx + 1, 1); });

  // Drag / swipe
  var drag = null;
  stage.addEventListener('pointerdown', function (e) {
    drag = { x: e.clientX, dx: 0 };
    stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener('pointermove', function (e) {
    if (drag) {
      drag.dx = e.clientX - drag.x;
      gsap.set(scene.el, { x: drag.dx * 0.4, rotation: drag.dx * 0.02 });
      return;
    }
    if (!finePointer || reduce) return;
    // Mouse tilt
    var r = stage.getBoundingClientRect();
    var px = (e.clientX - r.left) / r.width - 0.5;
    var py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(scene.svg, { rotationY: px * 22, rotationX: py * -14, duration: 0.6, ease: 'power3.out' });
  });
  function endDrag() {
    if (!drag) return;
    var dx = drag.dx;
    drag = null;
    if (Math.abs(dx) > 50) go(idx + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    else gsap.to(scene.el, { x: 0, rotation: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
  }
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);
  stage.addEventListener('pointerleave', function () {
    gsap.to(scene.svg, { rotationY: 0, rotationX: 0, duration: 0.8, ease: 'power3.out' });
  });

  // Keyboard arrows while the section is on screen
  var colST = ST.create({ trigger: col, start: 'top center', end: 'bottom center' });
  document.addEventListener('keydown', function (e) {
    if (!colST.isActive || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
    if (e.key === 'ArrowRight') go(idx + 1, 1);
    if (e.key === 'ArrowLeft') go(idx - 1, -1);
  });

  if (!reduce) {
    gsap.to(scene.el, { y: -14, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    gsap.to('.collection__shadow', { scaleX: 0.85, opacity: 0.6, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  }

  // Scroll-in reveals for section headings and copy
  ['fit-title', 'collection-title'].forEach(function (id) {
    var lines = splits[id];
    if (!lines || reduce) return;
    gsap.from(lines, {
      yPercent: 110, duration: 1, stagger: 0.1, ease: 'expo.out',
      scrollTrigger: { trigger: lines[0].closest('section'), start: 'top 70%' }
    });
  });
  if (!reduce) {
    gsap.from('.fit__stage', {
      y: 60, autoAlpha: 0, duration: 1.2, ease: 'expo.out',
      scrollTrigger: { trigger: '.fit', start: 'top 65%' }
    });
    gsap.from('.fit-bar', {
      y: 40, autoAlpha: 0, duration: 1, ease: 'expo.out',
      scrollTrigger: { trigger: '.fit-bar', start: 'top 92%' }
    });
    gsap.from(scene.el, {
      scale: 0.6, autoAlpha: 0, duration: 1.4, ease: 'expo.out',
      scrollTrigger: { trigger: col, start: 'top 60%' }
    });
  }

  /* -------------------------------------------------------- 8. Lens reveal */
  var revealPin = $('.reveal__pin');
  var revealST = null;
  function maxR() { return Math.hypot(window.innerWidth, window.innerHeight) / 2 + 40; }

  if (reduce) {
    revealPin.style.setProperty('--r', maxR() + 'px');
    gsap.set('.reveal__ring', { opacity: 0 });
  } else {
    var revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.reveal', start: 'top top', end: '+=150%', pin: revealPin, scrub: 0.6,
        invalidateOnRefresh: true
      }
    })
      .fromTo(revealPin, { '--r': '72px' }, { '--r': function () { return maxR() + 'px'; }, duration: 1, ease: 'power2.in' }, 0)
      .to('.reveal__big', { scale: 1.6, duration: 1, ease: 'none' }, 0)
      .to('.reveal__ring', { opacity: 0, duration: 0.12 }, 0.88)
      .fromTo('.reveal__content > *', { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, stagger: 0.05 }, 0.55);
    revealST = revealTl.scrollTrigger;
  }

  /* ----------------------------------------------------------- 9. Nav state */
  var nav = $('.nav');
  var colNavST = ST.create({ trigger: col, start: 'top 40px', end: 'bottom 40px' });

  /* Light nav text while it sits over the dark collection, or over the
     dark "LOOK CLOSER" layer before the lens has opened halfway. */
  function updateNav() {
    var y = window.scrollY;
    var revDark = revealST && y >= revealST.start - 40 && y < revealST.start + (revealST.end - revealST.start) * 0.5;
    nav.classList.toggle('is-on-dark', !!(colNavST.isActive || revDark));
  }
  ST.create({ start: 0, end: 'max', onUpdate: updateNav, onRefresh: updateNav });

  [['hero', '#hero'], ['fit', '#fit'], ['collection', '#collection'], ['visit', '#visit']].forEach(function (pair) {
    ST.create({
      trigger: '#' + pair[0], start: 'top center', end: 'bottom center',
      onToggle: function (self) {
        if (!self.isActive) return;
        $$('.nav__left .pill').forEach(function (p) { p.classList.toggle('is-active', p.getAttribute('href') === pair[1]); });
      }
    });
  });

  /* -------------------------------------------------- 10. Cursor + magnetic */
  if (finePointer && !reduce) {
    var cursor = $('.cursor');
    var label = $('.cursor__label');
    var cx = gsap.quickTo(cursor, 'x', { duration: 0.25, ease: 'power3' });
    var cy = gsap.quickTo(cursor, 'y', { duration: 0.25, ease: 'power3' });
    window.addEventListener('pointermove', function (e) { cursor.classList.add('is-ready'); cx(e.clientX); cy(e.clientY); });

    document.addEventListener('pointerover', function (e) {
      var labelled = e.target.closest('[data-cursor]');
      var hover = e.target.closest('a, button, input');
      cursor.classList.toggle('is-label', !!labelled && !hover);
      cursor.classList.toggle('is-hover', !!hover);
      label.textContent = labelled && !hover ? labelled.dataset.cursor : '';
    });

    $$('[data-magnetic]').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        gsap.to(el, {
          x: (e.clientX - (r.left + r.width / 2)) * 0.25,
          y: (e.clientY - (r.top + r.height / 2)) * 0.35,
          duration: 0.4, ease: 'power3.out'
        });
      });
      el.addEventListener('pointerleave', function () {
        gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  /* --------------------------------------------------------------- 11. Bag */
  var bag = $('.bag');
  var bagCount = $('.bag__count');
  var toast = $('.toast');
  var count = 0;
  var toastTimer;

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 2200);
  }

  function addToBag(btn, itemName) {
    var b = btn.getBoundingClientRect();
    var t = bag.getBoundingClientRect();
    var finish = function () {
      count += 1;
      bagCount.textContent = count;
      bag.setAttribute('aria-label', 'Bag, ' + count + ' item' + (count === 1 ? '' : 's'));
      gsap.fromTo(bag, { scale: 1.3 }, { scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
      showToast(itemName + ' added to bag');
    };
    if (reduce) { finish(); return; }
    var dot = document.createElement('span');
    dot.className = 'fly-dot';
    document.body.appendChild(dot);
    gsap.set(dot, { x: b.right - 24, y: b.top + b.height / 2 });
    gsap.timeline({ onComplete: function () { dot.remove(); finish(); } })
      .to(dot, { x: t.left + t.width / 2, duration: 0.8, ease: 'power1.inOut' }, 0)
      .to(dot, { y: t.top + t.height / 2, duration: 0.8, ease: 'back.in(1.8)' }, 0)
      .to(dot, { scale: 0.5, duration: 0.8 }, 0);
  }

  $$('[data-add]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.dataset.add === 'collection') addToBag(btn, MODELS[idx].full.split(' · ')[0] + ' (' + $('.size-chips .is-active').textContent + ')');
      else addToBag(btn, byId(FACES[fit.face].model).name.charAt(0) + byId(FACES[fit.face].model).name.slice(1).toLowerCase() + ' size ' + fit.size);
    });
  });

  $$('.size-chips .chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      $$('.size-chips .chip').forEach(function (c) {
        c.classList.toggle('is-active', c === chip);
        c.setAttribute('aria-checked', c === chip ? 'true' : 'false');
      });
    });
  });

  /* --------------------------------------------------------------- Boot */
  runIntro(heroEntrance);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ST.refresh(); });
})();
