/* ═══════════════════════════════════
   theme.js
   Runs INLINE in <head> to prevent
   flash of wrong theme on load.
   Also exports toggle for main.js.
═══════════════════════════════════ */

(function () {
  // Read saved theme, default to dark
  const saved = localStorage.getItem('jav-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
})();
