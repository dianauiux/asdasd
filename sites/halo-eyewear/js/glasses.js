/* ==========================================================================
   Glasses: SVG frame generator + morphing.

   Every lens is ONE path with the same command structure:
     M T  C . . R  C . . B  C . . L  C . . T  Z
   Anchors T/R/B/L sit on the lens's top/outer/bottom/inner side and
   handles run along the x or y axis. Because every shape shares that
   structure, GSAP can tween the `d` attribute number by number, so
   a round lens morphs smoothly into a cat-eye with no plugin.

   Coordinates are relative to the lens centre. +x = OUTER side (temple).
   ========================================================================== */
(function (global) {
  'use strict';

  var CX_L = 200, CX_R = 440, CY = 130;

  /* Anchors: T, R(outer), B, L(inner)
     h: [T→R x, R↑ y, R↓ y, B→R x, B→L x, L↓ y, L↑ y, T→L x] */
  var SHAPES = {
    round:  { T: [0, -78], R: [78, 0],   B: [0, 78],   L: [-78, 0], h: [43, 43, 43, 43, 43, 43, 43, 43] },
    oval:   { T: [0, -60], R: [94, 0],   B: [0, 60],   L: [-90, 0], h: [52, 33, 33, 52, 50, 33, 33, 50] },
    square: { T: [0, -64], R: [90, 0],   B: [0, 66],   L: [-86, 0], h: [82, 58, 60, 82, 78, 60, 58, 78] },
    cateye: { T: [-4, -56], R: [100, -36], B: [6, 62], L: [-84, 6], h: [74, 10, 46, 72, 58, 36, 40, 52] },
    aviator:{ T: [0, -60], R: [92, -8],  B: [-16, 82], L: [-82, -16], h: [72, 40, 52, 62, 46, 54, 28, 60] }
  };

  function f(n) { return Math.round(n * 10) / 10; }

  /* side: +1 = right lens (outer is +x), -1 = left lens (mirrored) */
  function lensPath(shape, side) {
    var s = SHAPES[shape] || SHAPES.round;
    var cx = side > 0 ? CX_R : CX_L;
    function X(x) { return cx + side * x; }
    function Y(y) { return CY + y; }
    var T = s.T, R = s.R, B = s.B, L = s.L, h = s.h;
    return [
      'M', f(X(T[0])), f(Y(T[1])),
      'C', f(X(T[0] + h[0])), f(Y(T[1])), f(X(R[0])), f(Y(R[1] - h[1])), f(X(R[0])), f(Y(R[1])),
      'C', f(X(R[0])), f(Y(R[1] + h[2])), f(X(B[0] + h[3])), f(Y(B[1])), f(X(B[0])), f(Y(B[1])),
      'C', f(X(B[0] - h[4])), f(Y(B[1])), f(X(L[0])), f(Y(L[1] + h[5])), f(X(L[0])), f(Y(L[1])),
      'C', f(X(L[0])), f(Y(L[1] - h[6])), f(X(T[0] - h[7])), f(Y(T[1])), f(X(T[0])), f(Y(T[1])),
      'Z'
    ].join(' ');
  }

  function bridgePath(shape) {
    var s = SHAPES[shape] || SHAPES.round;
    var xl = CX_L - s.L[0] - 4;          // inner edge of left lens
    var xr = CX_R + s.L[0] + 4;          // inner edge of right lens
    var y = CY + s.L[1] - 22;
    return ['M', f(xl), f(y), 'C', f(xl + 22), f(y - 26), f(xr - 22), f(y - 26), f(xr), f(y)].join(' ');
  }

  function templePath(shape, side) {
    var s = SHAPES[shape] || SHAPES.round;
    var cx = side > 0 ? CX_R : CX_L;
    var x = cx + side * (s.R[0] - 6);
    var y = CY + Math.min(s.R[1], 0) - 30;
    return ['M', f(x), f(y), 'L', f(x + side * 22), f(y - 4), 'L', f(x + side * 52), f(y - 2)].join(' ');
  }

  var uid = 0;

  function build(el, model) {
    var id = 'g' + (++uid);
    var lensOpacity = model.lensOpacity != null ? model.lensOpacity : 0.85;
    el.innerHTML =
      '<svg viewBox="-40 -10 720 280" role="img" aria-label="' + (model.full || model.name) + ' frame">' +
        '<defs>' +
          '<linearGradient id="' + id + '-frame" x1="0" y1="0" x2="0.3" y2="1">' +
            '<stop class="g-stop-a" offset="0" stop-color="' + model.frame[0] + '"/>' +
            '<stop class="g-stop-b" offset="1" stop-color="' + model.frame[1] + '"/>' +
          '</linearGradient>' +
          '<linearGradient id="' + id + '-lens" x1="0" y1="0" x2="0" y2="1">' +
            '<stop class="g-lens-a" offset="0" stop-color="' + model.lens + '" stop-opacity="' + lensOpacity + '"/>' +
            '<stop class="g-lens-b" offset="1" stop-color="' + model.lens + '" stop-opacity="' + (lensOpacity * 0.55) + '"/>' +
          '</linearGradient>' +
          '<clipPath id="' + id + '-cl"><path class="g-s g-s-l" d="' + lensPath(model.shape, -1) + '"/></clipPath>' +
          '<clipPath id="' + id + '-cr"><path class="g-s g-s-r" d="' + lensPath(model.shape, 1) + '"/></clipPath>' +
        '</defs>' +
        '<g class="g-lenses">' +
          '<path class="g-lens g-s g-s-l" fill="url(#' + id + '-lens)" d="' + lensPath(model.shape, -1) + '"/>' +
          '<path class="g-lens g-s g-s-r" fill="url(#' + id + '-lens)" d="' + lensPath(model.shape, 1) + '"/>' +
        '</g>' +
        '<g class="g-glints" fill="#fff">' +
          '<g clip-path="url(#' + id + '-cl)"><rect class="g-glint" x="-120" y="-40" width="46" height="360" transform="skewX(-22)" opacity="0.5"/></g>' +
          '<g clip-path="url(#' + id + '-cr)"><rect class="g-glint" x="-120" y="-40" width="46" height="360" transform="skewX(-22)" opacity="0.5"/></g>' +
        '</g>' +
        '<g class="g-body" stroke="url(#' + id + '-frame)">' +
          '<path class="g-frame g-temple g-temple-l" stroke-width="' + model.stroke + '" d="' + templePath(model.shape, -1) + '"/>' +
          '<path class="g-frame g-temple g-temple-r" stroke-width="' + model.stroke + '" d="' + templePath(model.shape, 1) + '"/>' +
          '<path class="g-frame g-rim g-s g-s-l" stroke-width="' + model.stroke + '" d="' + lensPath(model.shape, -1) + '"/>' +
          '<path class="g-frame g-rim g-s g-s-r" stroke-width="' + model.stroke + '" d="' + lensPath(model.shape, 1) + '"/>' +
          '<path class="g-frame g-bridge" stroke-width="' + model.stroke + '" d="' + bridgePath(model.shape) + '"/>' +
        '</g>' +
        '<g class="g-shine" stroke="rgba(255,255,255,0.28)" stroke-width="2" fill="none" transform="translate(0,-4)">' +
          '<path class="g-s g-s-l" d="' + lensPath(model.shape, -1) + '" stroke-dasharray="90 900" stroke-dashoffset="-20"/>' +
          '<path class="g-s g-s-r" d="' + lensPath(model.shape, 1) + '" stroke-dasharray="90 900" stroke-dashoffset="-20"/>' +
        '</g>' +
      '</svg>';

    var q = function (sel) { return Array.prototype.slice.call(el.querySelectorAll(sel)); };

    return {
      el: el,
      svg: el.querySelector('svg'),
      rims: q('.g-rim'),
      frameStrokes: q('.g-frame'),
      lenses: q('.g-lens'),
      glints: q('.g-glint'),
      model: model,

      /* Morph to another model. Returns the GSAP timeline. */
      set: function (next, opts) {
        opts = opts || {};
        var d = opts.duration != null ? opts.duration : 0.8;
        var ease = opts.ease || 'expo.inOut';
        var lo = next.lensOpacity != null ? next.lensOpacity : 0.85;
        var tl = global.gsap.timeline();
        tl.to(q('.g-s-l'), { attr: { d: lensPath(next.shape, -1) }, duration: d, ease: ease }, 0)
          .to(q('.g-s-r'), { attr: { d: lensPath(next.shape, 1) }, duration: d, ease: ease }, 0)
          .to(q('.g-bridge'), { attr: { d: bridgePath(next.shape) }, duration: d, ease: ease }, 0)
          .to(q('.g-temple-l'), { attr: { d: templePath(next.shape, -1) }, duration: d, ease: ease }, 0)
          .to(q('.g-temple-r'), { attr: { d: templePath(next.shape, 1) }, duration: d, ease: ease }, 0)
          .to(q('.g-frame'), { attr: { 'stroke-width': next.stroke }, duration: d, ease: ease }, 0)
          .to(q('.g-stop-a'), { attr: { 'stop-color': next.frame[0] }, duration: d, ease: 'power2.inOut' }, 0)
          .to(q('.g-stop-b'), { attr: { 'stop-color': next.frame[1] }, duration: d, ease: 'power2.inOut' }, 0)
          .to(q('.g-lens-a'), { attr: { 'stop-color': next.lens, 'stop-opacity': lo }, duration: d, ease: 'power2.inOut' }, 0)
          .to(q('.g-lens-b'), { attr: { 'stop-color': next.lens, 'stop-opacity': lo * 0.55 }, duration: d, ease: 'power2.inOut' }, 0);
        if (opts.glint !== false) {
          tl.fromTo(q('.g-glint'), { attr: { x: -120 } }, { attr: { x: 760 }, duration: d * 1.1, ease: 'power2.inOut' }, d * 0.35);
        }
        this.model = next;
        if (opts.instant) tl.progress(1);
        var svg = this.svg;
        if (svg) svg.setAttribute('aria-label', (next.full || next.name) + ' frame');
        return tl;
      }
    };
  }

  global.Glasses = { build: build, lensPath: lensPath, SHAPES: SHAPES };
})(window);
