/* ─── PAGE SWITCHER ─── */
function showPage(id, btn) {
  console.log('Switching to page:', id);
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(id);
  if (page) {
    page.classList.add('active');
    console.log('Page found and active class added');
  } else {
    console.error('Page not found:', id);
  }
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' });
  // Kick reveal after paint
  requestAnimationFrame(() => requestAnimationFrame(kickReveal));
}

/* ─── INTERSECTION OBSERVER – SCROLL REVEAL ─── */
let revealObserver;

function kickReveal() {
  // Kill old observer so we don't double-observe
  if (revealObserver) revealObserver.disconnect();

  const els = document.querySelectorAll(
    '.page.active .reveal-up:not(.visible), .page.active .reveal-card:not(.visible)'
  );

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.07,
    rootMargin: '0px 0px -24px 0px'
  });

  els.forEach(el => revealObserver.observe(el));
}

/* ─── INITIAL REVEAL (elements already in viewport on load) ─── */
window.addEventListener('DOMContentLoaded', () => {
  // Immediately reveal hero elements with stagger
  const heroEls = document.querySelectorAll('.page.active .reveal-up, .page.active .reveal-card');
  heroEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 120 + i * 90);
  });

  // Then set up observer for the rest
  setTimeout(kickReveal, 600);
});

/* ─── NOTES FILTER ─── */
function filterNotes(cat, btn) {
  document.querySelectorAll('.ntab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  const cards = document.querySelectorAll('.ncard');
  cards.forEach((c, i) => {
    const show = cat === 'all' || c.dataset.cat === cat;
    if (show) {
      c.style.display = '';
      // Re-animate visible cards
      c.classList.remove('visible');
      setTimeout(() => c.classList.add('visible'), 30 + i * 45);
    } else {
      c.style.display = 'none';
    }
  });
}

/* ─── THEME TOGGLE ─── */
let dark = true;
function toggleTheme() {
  dark = !dark;
  document.body.classList.toggle('light', !dark);
  document.getElementById('themeBtn').textContent = dark ? '☀️' : '🌙';
}

/* ─── SMOOTH IMAGE PARALLAX ON PROJECT CARDS ─── */
function initCardParallax() {
  const cards = document.querySelectorAll('.pcard');
  cards.forEach(card => {
    const img = card.querySelector('.pcard-img');
    if (!img) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      img.style.transform = `scale(1.06) translate(${x * 12}px, ${y * 8}px)`;
    });

    card.addEventListener('mouseleave', () => {
      img.style.transform = '';
    });
  });
}

/* ─── NAV SCROLL SHADOW ─── */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 10) {
    nav.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
  } else {
    nav.style.borderBottom = '';
  }
}, { passive: true });

/* ─── INIT ─── */
window.addEventListener('DOMContentLoaded', () => {
  initCardParallax();
});