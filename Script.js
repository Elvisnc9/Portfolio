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

/* ─── SHOW PROJECT (render then navigate) ─── */
function showProject(index) {
  renderProject(index);
  showPage('project', null, { scrollToTop: true });
}


/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  initCardParallax();
  runIntro();
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



/* ═══════════════════════════════════════════════
   PROJECT DATA  —  one object per project
═══════════════════════════════════════════════ */
const projects = [
  {
    id: 'elves-ai',
    title: 'Elves AI chatBot',
    tagline: 'A fast, intelligent AI chatbot that helps you write, learn, code, research, and solve everyday tasks through natural conversations.',
    video: 'assets/NextArt.mp4',
    role: 'Main Developer',
    timeline: 'In Progress',
    stack: ['Flutter', 'PostgreSQL', 'Serverpod', 'Riverpod', 'Gemini-AI', 'Drift'],
    overview: [
      'Elves AI is a multilingual conversational AI mobile app that provides context-aware interactions powered by Gemini-AI. Built for users across Africa, the app supports voice input and real-time token streaming to deliver near-instant responses.',
      'The backend is built on Serverpod, handling session management, conversation history persistence via PostgreSQL, and local caching with Drift for offline access to past conversations.',
      'The app is engineered for minimal latency — streaming tokens are pushed directly to the Flutter UI as they arrive, giving users a "typing" effect that dramatically improves perceived performance.'
    ],
    challenges: [
      'The main challenge was maintaining conversation context across sessions without inflating API costs. I designed a sliding context window that summarises older messages and injects only the most relevant history into each prompt.',
      'Voice input required integrating a speech-to-text pipeline with noise handling for environments with background sound — a common challenge in busy Nigerian households and offices. Real-time streaming from Gemini-AI required custom SSE (Server-Sent Events) handling on the Serverpod backend.'
    ],
    features: [
      'Real-Time Token Streaming',
      'Multilingual Support',
      'Voice-to-Text Input',
      'Context-Aware Conversation History',
      'Offline Chat Access via Drift',
      'Session Management & Auth',
      'Conversation Summarisation Engine',
      'Dark/Light Mode UI'
    ],
    screenshots: [
      { src: 'assets/ELF_AI/chatbot10.jpeg', alt: 'Onboarding screen' },
      { src: 'assets/ELF_AI/chatbot3.jpeg', alt: 'Welcome listing' },
      { src: 'assets/ELF_AI/chatbot5.jpeg', alt: 'chat screen' },
      { src: 'assets/ELF_AI/chatbot4.jpeg', alt: 'Drawer screen' },
      { src: 'assets/ELF_AI/chatbot2.jpeg', alt: 'Onboarding screen' },
      { src: 'assets/ELF_AI/chatbot8.jpeg', alt: 'Welcome screen' },
      { src: 'assets/ELF_AI/chatbot1.jpeg', alt: 'chat screen' },
      { src: 'assets/ELF_AI/chatbot7.jpeg', alt: 'Drawer screen' },
      { src: 'assets/ELF_AI/chatbot6.jpeg', alt: 'Setting screen' },
    ]
  },



  {
    id: 'elves-meet',
    title: 'Elves Meet',
    tagline: 'A multilingual AI chatbot with context-aware conversations, voice input, and real-time streaming responses powered by OpenAI.',
    video: 'assets/NextArt.mp4', // swap for your chatbot video
    role: 'Full-Stack Engineer',
    timeline: 'Completed',
    stack: ['Flutter', 'Agora', 'Serverpod', 'Riverpod', 'Drift', 'PostgreSQL', ''],
    overview: [
      'Elves ChatBot is a multilingual conversational AI mobile app that provides context-aware interactions powered by the OpenAI API. Built for users across Africa, the app supports voice input and real-time token streaming to deliver near-instant responses.',
      'The backend is built on Serverpod, handling session management, conversation history persistence via PostgreSQL, and local caching with Drift for offline access to past conversations.',
      'The app is engineered for minimal latency — streaming tokens are pushed directly to the Flutter UI as they arrive, giving users a "typing" effect that dramatically improves perceived performance.'
    ],
    challenges: [
      'The main challenge was maintaining conversation context across sessions without inflating API costs. I designed a sliding context window that summarises older messages and injects only the most relevant history into each prompt.',
      'Voice input required integrating a speech-to-text pipeline with noise handling for environments with background sound — a common challenge in busy Nigerian households and offices. Real-time streaming from OpenAI required custom SSE (Server-Sent Events) handling on the Serverpod backend.'
    ],
    features: [
      'Real-Time Token Streaming',
      'Multilingual Support',
      'Voice-to-Text Input',
      'Context-Aware Conversation History',
      'Offline Chat Access via Drift',
      'Session Management & Auth',
      'Conversation Summarisation Engine',
      'Dark/Light Mode UI'
    ],
    screenshots: [
      { src: 'assets/fitnessapp.png', alt: 'Chat home' },
      { src: 'assets/screen-2.jpeg', alt: 'Active conversation' },
      { src: 'assets/screen-3.jpeg', alt: 'Voice input' },
      { src: 'assets/screen-4.jpeg', alt: 'Settings' },
      { src: 'assets/screen-1.jpeg', alt: 'History' },
    ]
  },
  {
    id: 'aurelle',
    title: 'Aurelle App',
    tagline: 'Aurelle is a luxury fashion e-commerce application that transforms product discovery through a reels-inspired shopping experience. Users can seamlessly browse curated fashion content, explore products in full-screen, and transition directly from inspiration to purchase.',
    video: 'assets/NextArt.mp4',
    role: 'Full-Stack Engineer',
    timeline: 'In Progress',
    stack: ['Flutter', 'Node.JS', 'Cloudinary', 'MongoDB'],
    overview: [
   'Aurelle is a luxury fashion e-commerce application built to deliver a modern, premium shopping experience with an emphasis on visual product discovery. Instead of relying on traditional product grids alone, Aurelle introduces a reels-inspired browsing experience where users can discover curated fashion pieces through immersive full-screen images and videos before seamlessly transitioning to detailed product pages The application features a clean, minimalist interface that keeps the focus on the products while providing intuitive navigation between shopping, product exploration, and user profiles. Each product page includes multiple product views, pricing, sale information, wishlisting, and a smooth purchasing flow designed to feel elegant and effortless. The overall experience combines luxury aesthetics with social-media-inspired interactions to create a more engaging way of shopping for fashion.'
    ],
    challenges: [
      'One of the biggest challenges during development was designing a reels-based shopping experience that felt natural while maintaining fast navigation between the reels feed and detailed product pages. Achieving smooth animations and preserving application state without sacrificing performance required careful UI architecture and state management.',
       'Another challenge was creating a luxury-inspired interface that remained clean and uncluttered despite displaying a large amount of product information. Balancing typography, spacing, imagery, and user interactions was essential to delivering a premium shopping experience while ensuring responsiveness across different screen sizes and devices.'
    ],
    features: [
'Reels Product Feed',
'Luxury Product Discovery',
'Interactive Product Gallery',
'Product Detail View',
'Smart Product Search',
'Category Based Shopping',
'Secure User Authentication',
'Wishlist Management System',
'Shopping Cart Experience',
'Responsive User Interface',
'Smooth Page Transitions',
'Premium Fashion Experience',
    ],
    screenshots: [
      { src: 'assets/AURELLE/1000053676.jpg', alt: 'HomePage' },
      { src: 'assets/AURELLE/1000053676.jpg', alt: 'HomePage' },
      { src: 'assets/AURELLE/1000053679.jpg', alt: 'Product page' },
      { src: 'assets/AURELLE/1000053680.jpg', alt: 'Product' },
      { src: 'assets/AURELLE/1000053681.jpg', alt: 'Login' },
      { src: 'assets/AURELLE/1000053693.jpg', alt: 'checkOut' },
      { src: 'assets/AURELLE/1000053683.jpg', alt: 'Dashboard' },
      
    ]
  },
  {
    id: 'MM',
    title: 'Muslim Matrimony',
    tagline: 'Muslims Shadi that connects millions of people searching for their forever one across the globe.',
    video: 'assets/NextArt.mp4',
    role: 'Team',
    timeline: 'Completed',
    stack: ['Flutter', 'Laravel', 'Kotlin', 'Socket.io', 'PostgreSQL'],
    overview: [
      'Nikah Forever is a cross-platform Muslim matrimony application developed to simplify and modernize the journey of finding a life partner. The app enables users to create detailed profiles, discover compatible matches through personalized search filters, connect securely with potential partners, and manage their matchmaking experience through an intuitive and responsive interface.'

    ],
    challenges: [
     'Developing Nikah Forever required building a user experience that balanced simplicity, privacy, and performance while handling large volumes of user profiles. Creating responsive search, seamless navigation, real-time interactions, and maintaining a consistent experience across Android and iOS demanded careful architecture, efficient state management, and continuous performance optimization.'
    ],
    features: [
     'User Registration',
      'Secure Authentication',
       'Profile Creation',
       'Profile Verification',
      'Advanced Search',
      'Match Discovery',
      'Personalized Recommendations',
      'Interest Requests',
      'Real-Time Chat',
      'Instant Notifications',
      'Privacy Controls'
    ],
    screenshots: [
     
    ]
  },
  {
    id: 'axelerate',
    title: 'Axelerate',
    tagline: 'Data-driven business scaling platform with CRM, analytics dashboards, and automated workflows.',
    video: 'assets/NextArt.mp4',
    role: 'Full-Stack Engineer',
    timeline: 'In Progress',
    stack: ['React', 'Node.js', 'CRM', 'SaaS'],
    overview: [
      'Axelerate is a SaaS platform built to help small and medium businesses in Africa scale operations through data. It combines CRM, sales pipeline management, and automated workflows in a single dashboard.',
      'The React frontend is built around a modular widget system, letting businesses customise their dashboard layout to surface the metrics that matter most to them.',
      'Node.js powers the backend automation engine — handling scheduled reports, trigger-based notifications, and third-party integrations via a webhook system.'
    ],
    challenges: [
      'Designing a workflow automation engine that non-technical business owners could actually configure was the hardest UX challenge. I built a visual drag-and-drop trigger builder that abstracts the underlying logic into plain-English conditions.',
      'Multi-tenant data isolation required a careful PostgreSQL schema design to ensure one customer could never accidentally see another\'s data, even under misconfigured queries.'
    ],
    features: [
      'Visual Workflow Automation Builder',
      'CRM with Pipeline View',
      'Customisable Analytics Dashboard',
      'Scheduled & Trigger-Based Reports',
      'Multi-Tenant Architecture',
      'Third-Party Webhook Integration',
      'Role-Based Team Access',
      'Export to CSV / PDF'
    ],
    screenshots: [
     
    ]
  },
  {
    id: 'genie',
    title: 'Genie',
    tagline: 'Your gateway to recurring income — SaaS mobile app with subscription management and automated billing on Serverpod.',
    video: 'assets/NextArt.mp4',
    role: 'Lead Mobile Engineer',
    timeline: 'Coming Soon',
    stack: ['Flutter', 'Dart', 'Serverpod'],
    overview: [
      'Genie is a Flutter mobile app that lets creators and entrepreneurs monetise their content and services through subscription tiers — think Patreon meets Substack, built for the African market.',
      'Powered by Serverpod on the backend, Genie handles subscription lifecycle management, automated billing cycles, and creator payout processing — all with African payment methods as first-class citizens.',
      'The app is currently in private beta with a small group of Nigerian creators.'
    ],
    challenges: [
      'Subscription billing in markets with unreliable card infrastructure required building a retry and dunning engine that gracefully handles failed payments without immediately churning subscribers.',
      'Creator payout scheduling across different African banks and mobile money providers required a unified disbursement abstraction layer on the backend.'
    ],
    features: [
      'Multi-Tier Subscription System',
      'Automated Billing & Retry Engine',
      'Creator Payout Scheduling',
      'Content Gating by Tier',
      'African Payment Method Support',
      'Subscriber Analytics for Creators',
      'In-App Notifications',
      'Referral & Growth Mechanics'
    ],
    screenshots: [
      { src: 'assets/Chair.png', alt: 'Splash' },
      { src: 'assets/screen-2.jpeg', alt: 'Creator profile' },
      { src: 'assets/screen-3.jpeg', alt: 'Subscription tiers' },
      { src: 'assets/screen-4.jpeg', alt: 'Earnings dashboard' },
      { src: 'assets/screen-1.jpeg', alt: 'Billing' },
    ]
  }
];


/* ═══════════════════════════════════════════════
   RENDER PROJECT PAGE from data
═══════════════════════════════════════════════ */
function renderProject(index) {
  const p = projects[index];
  if (!p) return;

  const page = document.getElementById('project');

  page.innerHTML = `
    <div class="pj-wrap">
      <button class="back-btn reveal-up" onclick="goBack()">
        Back to Projects
      </button>
      <h1 class="pj-title reveal-up">${p.title}</h1>
      <p class="pj-desc reveal-up delay-1">${p.tagline}</p>

      <video autoplay muted playsinline>
        <source src="${p.video}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>

    <div style="max-width:1160px;margin:0 auto;padding:0 40px">
      <div class="pj-divider" style="margin-top:60px"></div>
    </div>

    <div style="max-width:1160px;margin:0 auto;padding:0 40px">

      <!-- Role / Timeline / Stack -->
      <div class="two-col reveal-up">
        <div>
          <div class="left-col-label">Role</div>
          <div class="left-col-value">${p.role}</div>
          <div class="left-col-label">Timeline</div>
          <div class="left-col-value">${p.timeline}</div>
          <div class="left-col-label">Tech Stack</div>
          <div style="margin-top:4px">
            ${p.stack.map(s => `<span class="tag-pill">${s}</span>`).join('')}
          </div>
        </div>
        <div>
          <div class="section-heading"><span class="section-icon">🗂</span> Overview</div>
          <div class="section-body">
            ${p.overview.map(para => `<p>${para}</p>`).join('')}
          </div>
        </div>
      </div>

      <!-- Challenges -->
      <div class="two-col reveal-up">
        <div></div>
        <div>
          <div class="section-heading"><span class="section-icon">⚡</span> Challenges &amp; Solutions</div>
          <div class="section-body">
            ${p.challenges.map(para => `<p>${para}</p>`).join('')}
          </div>
        </div>
      </div>

      <!-- Features -->
      <div class="two-col reveal-up" style="border-bottom:1px solid var(--border)">
        <div></div>
        <div>
          <div class="features-heading"><span class="section-icon">‹›</span> Key Features</div>
          <div class="features-grid">
            ${p.features.map(f => `
              <div class="feature-item">
                <span class="feature-dot"></span>${f}
              </div>`).join('')}
          </div>
        </div>
      </div>

    </div>

    <!-- Screenshots -->
    <div style="max-width:1160px;margin:0 auto;padding:0 40px">
      <div class="screenshots-section reveal-up">
        <div class="screenshots-heading"><span class="section-icon">🗂</span> App Screenshots</div>
        <div class="screenshots-row">
          ${p.screenshots.map(sc => `
            <div class="screen-card">
              <img src="${sc.src}" alt="${sc.alt}" />
            </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- View all -->
    <div class="view-all-section">
      <p class="view-all-sub">Want to see more?</p>
      <button class="view-all-link" onclick="showPage('work',document.querySelectorAll('.nav-btn')[0])">
        View All Projects
      </button>
    </div>
  `;
}