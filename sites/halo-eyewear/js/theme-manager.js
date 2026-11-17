/* Theme manager: light / dark / system. Stores an explicit choice; "system" clears it. */
(function () {
  'use strict';

  function read() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }
  function write(v) {
    try { v ? localStorage.setItem('theme', v) : localStorage.removeItem('theme'); } catch (e) {}
  }

  function apply(theme) {
    var root = document.documentElement;
    if (theme === 'light' || theme === 'dark') {
      root.setAttribute('data-theme', theme);
      write(theme);
    } else {
      theme = 'system';
      root.removeAttribute('data-theme');
      write(null);
    }
    document.querySelectorAll('.theme-toggle-option').forEach(function (btn) {
      var on = btn.dataset.theme === theme;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-checked', on ? 'true' : 'false');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var stored = read();
    apply(stored === 'light' || stored === 'dark' ? stored : 'system');
    var toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', function (e) {
        var btn = e.target.closest('.theme-toggle-option');
        if (btn) apply(btn.dataset.theme);
      });
    }
  });
})();
