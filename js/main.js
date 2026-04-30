/* ═══════════════════════════════════
   main.js
   Interactions, scroll, filter, nav
═══════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── THEME TOGGLE ──────────────── */
  const toggle = document.getElementById('theme-toggle');
  const toggleLabel = document.getElementById('toggle-label');
  const toggleIcon  = document.getElementById('toggle-icon');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('jav-theme', theme);
    if (theme === 'dark') {
      toggleIcon.textContent  = '☀';
      toggleLabel.textContent = 'Light';
    } else {
      toggleIcon.textContent  = '◑';
      toggleLabel.textContent = 'Dark';
    }
  }

  // Init label from current theme
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current);

  toggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  /* ── NAVBAR SCROLL ─────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ── SCROLL REVEAL ─────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay || '0');
        setTimeout(() => e.target.classList.add('in'), delay);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => obs.observe(el));

  /* ── PROJECT FILTER ────────────── */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      projectCards.forEach(card => {
        card.classList.toggle('hidden', f !== 'all' && card.dataset.cat !== f);
      });
    });
  });

  /* ── SMOOTH SCROLL ─────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
