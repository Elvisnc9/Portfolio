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
    setTimeout(() => {
      el.classList.add('visible');
    }, 120 + i * 100);
  });
}

/* ─── PAGE SWITCHER ─── */
function showPage(id, btn, options = {}) {
  const { scrollToTop = true, targetSelector = null } = options;

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  const page = document.getElementById(id);
  if (!page) {
    console.error('Page not found:', id);
    return;
  }

  page.classList.add('active');
  setActiveNav(btn);

  // reset animations on this page so they can replay
  resetReveal(page);

  if (id === 'work') {
    playHeroIntro();
  }

  if (scrollToTop) {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      kickReveal();

      if (targetSelector) {
        const target = document.querySelector(targetSelector);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 120);
        }
      }
    });
  });
}

/* ─── GO TO CONTACT ON HOME PAGE ─── */
function goToContact(btn) {
  showPage('work', btn, {
    scrollToTop: true,
    targetSelector: '#contact'
  });
}

/* ─── INTERSECTION OBSERVER – SCROLL REVEAL ─── */
let revealObserver;

function kickReveal() {
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
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  els.forEach(el => revealObserver.observe(el));
}

/* ─── NOTES FILTER ─── */
function filterNotes(cat, btn) {
  document.querySelectorAll('.ntab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('.ncard');

  cards.forEach((c) => {
    c.classList.remove('visible');
    c.style.display = 'none';
  });

  let visibleIndex = 0;

  cards.forEach((c) => {
    const show = cat === 'all' || c.dataset.cat === cat;
    if (show) {
      c.style.display = '';
      setTimeout(() => {
        c.classList.add('visible');
      }, 60 + visibleIndex * 70);
      visibleIndex++;
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
  if (!nav) return;

  if (window.scrollY > 10) {
    nav.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
  } else {
    nav.style.borderBottom = '';
  }
}, { passive: true });

/* ─── INIT ─── */
window.addEventListener('DOMContentLoaded', () => {
  initCardParallax();
  playHeroIntro();

  setTimeout(() => {
    kickReveal();
  }, 400);
});