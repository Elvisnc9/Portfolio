/* ═══════════════════════════════════════════════
   SCRIPT.JS  —  Portfolio · Elvis Ngwu
═══════════════════════════════════════════════ */
// Create a new link element
const link = document.createElement('link');

// Set the attributes for the link element
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'style.css'; // Path to your CSS file

// Append the link element to the document head
document.head.appendChild(link);
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}


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
    '#work .hero .reveal-up:not(.hero-h1), #work .hero .reveal-card'
  );
  heroEls.forEach(el => el.classList.remove('visible'));
  heroEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 120 + i * 100);
  });

  // re-trigger word animations on the h1
  const words = document.querySelectorAll('.hero-h1 .word-inner');
  words.forEach(w => {
    w.style.animation = 'none';
    w.offsetHeight; // force reflow
    w.style.animation = '';
  });
}


/* ─── PAGE SWITCHER ─── */
let isTransitioning = false;

function showPage(id, btn, options = {}) {
  const { scrollToTop = true, targetSelector = null } = options;

  if (isTransitioning) return; // guard against double-clicks

  const nextPage = document.getElementById(id);
  if (!nextPage) return;

  const currentPage = document.querySelector('.page.active');

  // If it's the same page, just do nav highlight + skip animation
if (currentPage === nextPage) {
  setActiveNav(btn);
  if (targetSelector) {
    const target = document.querySelector(targetSelector);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  return;
}

  isTransitioning = true;
  setActiveNav(btn);

  const finishEnter = () => {

    if (id === 'contact') {
  resetFormErrors();
}
    if (id === 'work') {
  startParallax();
} else {
  stopParallax();
}

    if (id === 'about') {
      carouselPaused = false;
      startCarousel();
    } else {
      stopCarousel();
    }

    
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        kickReveal();
        if (targetSelector) {
          const target = document.querySelector(targetSelector);
          if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
        }
      });
    });

    isTransitioning = false;
  };

const startEnter = () => {
  if (currentPage) {
    currentPage.classList.remove('page-exiting', 'active');
    currentPage.style.display = '';   // ← was 'none', now just clear the inline override
  }

  nextPage.style.display = '';        // ← ADD THIS: clear any leftover inline style from a previous exit
    nextPage.classList.add('active', 'page-entering');
    resetReveal(nextPage);

    if (scrollToTop) window.scrollTo({ top: 0, behavior: 'auto' });

    nextPage.addEventListener('animationend', function handler(e) {
      if (e.animationName !== 'page-in') return;
      nextPage.removeEventListener('animationend', handler);
      nextPage.classList.remove('page-entering');
      finishEnter();
    });
  };

  if (currentPage) {
    currentPage.classList.add('page-exiting');
    currentPage.addEventListener('animationend', function handler(e) {
      if (e.animationName !== 'page-out') return;
      currentPage.removeEventListener('animationend', handler);
      startEnter();
    });
  } else {
    startEnter(); // first load, no current page to exit
  }
}


/* ─── GO TO CONTACT (on home page) ─── */
function goToContact(btn) {
  showPage('work', btn, { scrollToTop: true, targetSelector: '#contact' });
}


/* ─── GO BACK (from project page) ─── */
function goBack() {
  showPage('work', document.querySelectorAll('.nav-btn')[0], { scrollToTop: true });
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
        entry.target.classList.add('visible', entry.isIntersecting);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => revealObserver.observe(el));
}




/* ─── THEME TOGGLE ─── */
let dark = false;
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
/* ─── NAV SCROLL SHADOW + AUTO-HIDE ─── */
let lastScrollY = 0;
let navHideTimer = null;

window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (!nav) return;

  const currentY = window.scrollY;
  const scrollingDown = currentY > lastScrollY;

  // Hide when scrolling down and not at top
  if (scrollingDown && currentY > 80) {
    nav.classList.add('nav-hidden');
  } else {
    nav.classList.remove('nav-hidden');
  }

  lastScrollY = currentY;
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
function pauseCarousel(ms = 3000) {
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
 const heroSelectors = ['.hero-eyebrow', '.hero-p', '.hero .btn-primary'];
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
  setTimeout(kickReveal, 800);

  /* 4 ── init carousel hooks + auto-scroll */
  setTimeout(() => {
    initCarouselHooks();
    /* only auto-run if the about page is somehow the starting page */
    if (document.getElementById('about')?.classList.contains('active')) {
      startCarousel();
    }
  }, 700);
}

document.addEventListener("DOMContentLoaded", () => {

    const veil = document.querySelector(".intro-veil");
    if (!veil) return;

    // lock scroll immediately while veil is visible
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    setTimeout(() => {
        veil.classList.add("hide");

        // force scroll to top in case anything shifted during load
        window.scrollTo(0, 0);

        // unlock scroll once the veil has visually faded out
        setTimeout(() => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }, 800); // matches your .intro-veil transition duration
    }, 3500);

});


/* ─── HERO PARALLAX ─── */
let parallaxActive = false;
let parallaxRAF = null;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateParallax() {
  if (!parallaxActive) return;

  const heroSection = document.querySelector('#work .hero-dash');
  if (!heroSection) { parallaxRAF = null; return; }

  const rect = heroSection.getBoundingClientRect();

  // only calculate while hero is at least partially in view
  if (rect.bottom > 0 && rect.top < window.innerHeight) {
    const scrollY = window.scrollY;

    const grid   = document.querySelector('#work .hero-grid');
    const circle = document.querySelector('#work .hero-circle');
    const content = document.querySelector('#work .hero-c');

    if (grid)    grid.style.transform    = `translateY(${scrollY * 0.15}px)`;
    if (circle)  circle.style.transform  = `translateY(${scrollY * 0.35}px)`;
    if (content) content.style.transform = `translateY(${scrollY * 0.5}px)`;
  }

  parallaxRAF = requestAnimationFrame(updateParallax);
}

function startParallax() {
  if (prefersReducedMotion) return;
  if (parallaxActive) return;
  parallaxActive = true;
  parallaxRAF = requestAnimationFrame(updateParallax);
}

function stopParallax() {
  parallaxActive = false;
  if (parallaxRAF) cancelAnimationFrame(parallaxRAF);
  parallaxRAF = null;

  // reset transforms so hero looks normal when returning to page
  const grid   = document.querySelector('#work .hero-grid');
  const circle = document.querySelector('#work .hero-circle');
  const content = document.querySelector('#work .hero-c');
  if (grid)    grid.style.transform    = '';
  if (circle)  circle.style.transform  = '';
  if (content) content.style.transform = '';
}

/* ─── SHOW PROJECT (render then navigate) ─── */
let pjCarIndex = 0;

function pjCarouselNav(dir) {
  const track = document.getElementById('pjCarTrack');
  if (!track) return;
  const slides = track.children;
  const total = slides.length;
  pjCarIndex = (pjCarIndex + dir + total) % total;
  track.style.transform = `translateX(-${pjCarIndex * 100}%)`;
  document.querySelectorAll('#pjCarDots .pj-car-dot').forEach((d, i) => {
    d.classList.toggle('active', i === pjCarIndex);
  });
}

function showProject(index) {
  pjCarIndex = 0;
  renderProject(index);
  showPage('project', null, { scrollToTop: true });
}

/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  initCardParallax();
  runIntro();
  startParallax();
});


const reveals = document.querySelectorAll('.reveal');
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e, i) => {
                if (e.isIntersecting) {
                    setTimeout(() => e.target.classList.add('visible'), i * 120);
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.15 });
        reveals.forEach(el => io.observe(el));
 
        // Parallax on widgets
        document.addEventListener('mousemove', (e) => {
            const widgets = document.querySelectorAll('.widget');
            const mx = e.clientX / window.innerWidth - 0.5;
            const my = e.clientY / window.innerHeight - 0.5;
            widgets.forEach((w, i) => {
                const d = (i + 1) * 8;
                w.style.transform = `translate(${mx * d}px, ${my * d}px)`;
            });
        });



   const backToTop = document.getElementById('back-to-top');

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  const activePage = document.querySelector('.page.active');
  const isEligiblePage = activePage ;
  const scrolledEnough = window.scrollY > window.innerHeight* 0.25;

  backToTop.classList.toggle('show', isEligiblePage && scrolledEnough);
}, { passive: true });
