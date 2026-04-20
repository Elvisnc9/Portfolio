/* ═══════════════════════════════════════════════
   SCRIPT.JS  —  Portfolio · Elvis Ngwu
═══════════════════════════════════════════════ */


/* ─── HELPERS ─── */
function setActiveNav(btn) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

function resetReveal(scope = document) {
  scope.querySelectorAll('.reveal-up, .reveal-card').forEach(el => {
    el.classList.remove('visible');
  });
}

function playHeroIntro() {
  const heroEls = document.querySelectorAll(
    '#work .hero .reveal-up, #work .hero .reveal-card'
  );
  heroEls.forEach(el => el.classList.remove('visible'));
  heroEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 120 + i * 100);
  });
}


/* ─── PAGE SWITCHER ─── */
function showPage(id, btn, options = {}) {
  const { scrollToTop = true, targetSelector = null } = options;

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  const page = document.getElementById(id);
  if (!page) return;

  page.classList.add('active');
  setActiveNav(btn);
  resetReveal(page);

  if (id === 'work') playHeroIntro();

  /* start / stop carousel when switching to/from about */
  if (id === 'about') {
    carouselPaused = false;
    startCarousel();
  } else {
    stopCarousel();
  }

  if (scrollToTop) window.scrollTo({ top: 0, behavior: 'auto' });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      kickReveal();
      if (targetSelector) {
        const target = document.querySelector(targetSelector);
        if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
      }
    });
  });
}


/* ─── GO TO CONTACT (on home page) ─── */
function goToContact(btn) {
  showPage('work', btn, { scrollToTop: true, targetSelector: '#contact' });
}


/* ─── SCROLL REVEAL ─── */
let revealObserver;

function kickReveal() {
  if (revealObserver) revealObserver.disconnect();

  const els = document.querySelectorAll(
    '.page.active .reveal-up:not(.visible), .page.active .reveal-card:not(.visible)'
  );

  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => revealObserver.observe(el));
}


/* ─── NOTES FILTER ─── */
function filterNotes(cat, btn) {
  document.querySelectorAll('.ntab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('.ncard');
  cards.forEach(c => { c.classList.remove('visible'); c.style.display = 'none'; });

  let idx = 0;
  cards.forEach(c => {
    const show = cat === 'all' || c.dataset.cat === cat;
    if (show) {
      c.style.display = '';
      setTimeout(() => c.classList.add('visible'), 60 + idx * 70);
      idx++;
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


/* ─── CARD PARALLAX ─── */
function initCardParallax() {
  document.querySelectorAll('.pcard').forEach(card => {
    const img = card.querySelector('.pcard-img');
    if (!img) return;
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      img.style.transform = `scale(1.06) translate(${x * 12}px,${y * 8}px)`;
    });
    card.addEventListener('mouseleave', () => { img.style.transform = ''; });
  });
}


/* ─── NAV SCROLL SHADOW ─── */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (!nav) return;
  nav.style.borderBottom = window.scrollY > 10 ? '1px solid rgba(255,255,255,0.06)' : '';
}, { passive: true });


/* ═══════════════════════════════════════════════
   ABOUT CAROUSEL  — works with .about-slide
   (your existing HTML markup)
═══════════════════════════════════════════════ */
let carouselTimer  = null;
let carouselPaused = false;
const CAROUSEL_MS  = 3000;

function getSlides() {
  /* supports both old .about-slide markup AND new .cs-slide markup */
  const old = document.querySelectorAll('.about-slide');
  const neo = document.querySelectorAll('.cs-slide');
  return old.length ? { slides: old, type: 'old' } : { slides: neo, type: 'neo' };
}

function carouselNext() {
  /* ── new csTrack carousel ── */
  if (typeof window.csNext === 'function') { window.csNext(); return; }

  /* ── old .about-slide carousel ── */
  const { slides, type } = getSlides();
  if (!slides.length) return;

  const arr     = Array.from(slides);
  const current = arr.findIndex(s => s.classList.contains('active'));
  const next    = (current + 1) % arr.length;

  arr[current].classList.remove('active');
  arr[next].classList.add('active');
}

function startCarousel() {
  stopCarousel();
  carouselTimer = setInterval(() => {
    if (!carouselPaused) carouselNext();
  }, CAROUSEL_MS);
}

function stopCarousel() {
  clearInterval(carouselTimer);
  carouselTimer = null;
}

let resumeTimer = null;
function pauseCarousel(ms = 5000) {
  carouselPaused = true;
  clearTimeout(resumeTimer);
  resumeTimer = setTimeout(() => { carouselPaused = false; }, ms);
}

function initCarouselHooks() {
  /* pause on hover / touch / drag for both carousel types */
  ['.about-slider-wrap', '.cs-root', '.cs-track', '.about-slider'].forEach(sel => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.addEventListener('mouseenter',  () => pauseCarousel());
    el.addEventListener('touchstart',  () => pauseCarousel(), { passive: true });
    el.addEventListener('mousedown',   () => pauseCarousel());
  });
}


/* ═══════════════════════════════════════════════
   PREMIUM INTRO ANIMATION
═══════════════════════════════════════════════ */
function runIntro() {
  /* 1 ── fade out the full-screen veil */
  const veil = document.getElementById('intro-veil');
  if (veil) {
    setTimeout(() => {
      veil.style.opacity = '0';
      setTimeout(() => { veil.style.display = 'none'; }, 1000);
    }, 80);
  }

  /* 2 ── staggered hero cascade */
  const heroSelectors = ['.hero-eyebrow', '.hero-h1', '.hero-p', '.hero .btn-primary'];
  heroSelectors.forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (!el) return;

    el.style.transition = 'none';
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(36px)';

    setTimeout(() => {
      el.style.transition = `opacity 0.85s cubic-bezier(0.22,1,0.36,1) 0ms,
                             transform 0.95s cubic-bezier(0.22,1,0.36,1) 0ms`;
      el.style.opacity    = '1';
      el.style.transform  = 'translateY(0)';
      el.classList.add('visible');
    }, 260 + i * 130);
  });

  /* 3 ── after hero lands, kick scroll-reveal for rest of page */
  setTimeout(kickReveal, 1100);

  /* 4 ── init carousel hooks + auto-scroll */
  setTimeout(() => {
    initCarouselHooks();
    /* only auto-run if the about page is somehow the starting page */
    if (document.getElementById('about')?.classList.contains('active')) {
      startCarousel();
    }
  }, 700);
}


/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  initCardParallax();
  runIntro();
});