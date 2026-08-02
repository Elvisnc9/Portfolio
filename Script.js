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
    if (id === 'work') playHeroIntro();

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
    // video: 'assets/NextArt.mp4',
    coverImage: 'assets/ELF_AI/screens_mockup.png',
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
    id: 'aurelle',
    title: 'Aurelle App',
    tagline: 'Aurelle is a luxury fashion e-commerce application that transforms product discovery through a reels-inspired shopping experience. Users can seamlessly browse curated fashion content, explore products in full-screen, and transition directly from inspiration to purchase.',
    // video: 'assets/NextArt.mp4',
    coverImage: 'assets/AURELLE/mockup.png',
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
    // video: 'assets/NextArt.mp4',
    coverImage: 'assets/MM/muslim.png',
    liveUrl: 'https://play.google.com/store/apps/details?id=com.nikahforever',
    role: 'Team',
    timeline: 'Live On PlayStore',
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
      { src: 'assets/MM/mockup.png', alt: 'Splash' },
      { src: 'assets/MM/mockupp.png', alt: 'Creator profile' },
      { src: 'assets/MM/mockupp2.png', alt: 'Subscription tiers' },
      { src: 'assets/MM/mockupp3.png', alt: 'Earnings dashboard' },
      { src: 'assets/MM/mockupp4.png', alt: 'Billing' },
    ]
  },
  {
    id: 'Genie',
    title: 'Genie',
    tagline: 'Genie is an AI-powered augmented reality assistant that helps homeowners visualize and design living spaces by placing realistic 3D furniture in their homes before purchasing or rearranging them. It combines artificial intelligence and augmented reality to make interior planning more immersive, accurate, and confident.',
    coverImage: 'assets/GENIE/Appmockup.png',
    role: 'Full-Stack Developer',
    timeline: 'In Progress',
    stack: ['Flutter', 'fastApi', 'api', 'SaaS'],
    overview: [
      'Genie is an AI-powered home augmented reality application that transforms the way people furnish and design their living spaces. By combining Augmented Reality (AR) and Artificial Intelligence (AI), users can place life-sized 3D furniture in their real environment, experiment with different layouts and styles, and make confident design decisions before purchasing. Genie bridges the gap between imagination and reality by providing an immersive, interactive, and intelligent home visualization experience.',
    ],
    challenges: [
      'Developing Genie presented several challenges, including creating realistic and properly scaled 3D furniture models that could accurately fit into real-world environments. Implementing stable augmented reality tracking and ensuring accurate object placement, rotation, and scaling across different devices was also challenging. Additionally, integrating AI-based features, optimizing AR performance, managing large 3D assets, and ensuring a smooth user experience while maintaining application efficiency required significant technical effort.',
    ],
    features: [
      'Augmented Reality Furniture Placement – Place life-sized 3D furniture in your home using your device camera.',
      'AI-Powered Furniture Recommendations – Receive intelligent furniture suggestions based on your room and preferences.',
      'Realistic 3D Models – Explore high-quality, true-to-scale furniture models.',
      'Furniture Catalog – Browse a collection of furniture categorized by style, room, and type.',
      'Save & Share Designs – Save room layouts and share them with friends, family, or interior designers.',
     
    ],
    screenshots: [
     
    ]
  },
  {
    id: 'Elves-meet',
    title: 'Elves Meet',
    tagline: 'A multilingual AI chatbot with context-aware conversations, voice input, and real-time streaming responses powered by OpenAI.',
    coverImage: 'assets/ELVES_MEET/mockup.png', // swap for your chatbot video
    role: 'Full-Stack Engineer',
    timeline: 'Completed',
    stack: ['Flutter', 'Agora', 'Serverpod', 'Riverpod', 'Drift', 'PostgreSQL', ''],
    overview: [
      'Elves Meet is a real-time video conferencing application inspired by Google Meet, It allows users to create secure meeting rooms or join existing meetings using a unique room code.',
      'The application supports high-quality one-to-one and group video calls with real-time audio and video communication.Users can authenticate, manage meetings, and view their recent call history from a clean and intuitive interface.',
      'The project was built to understand the complete architecture, workflow, and user experience behind modern video conferencing platforms while replicating production-level functionality.'
    ],
    challenges: [
      'One of the main challenges was synchronizing real-time audio, video, and participant states while maintaining a smooth user experience. Additional challenges included handling meeting lifecycle events, network interruptions, permission management, and ensuring reliable room creation and joining across different devices.',
    ],
    features: [
      'Secure meeting room generation with unique join codes',
      'Instant one-to-one and group video conferencing',
      'Live participant synchronization and presence tracking',
     'Low-latency, high-quality audio and video streaming',
      'Responsive meeting experience across devices',
       'Clean Google Meet-inspired user experience'
    ],
    screenshots: [
      { src: 'assets/ELVES_MEET/Screenshotva2.jpg', alt: 'Chat home' },
      { src: 'assets/ELVES_MEET/Screenshotva3.jpg', alt: 'Active conversation' },
      { src: 'assets/ELVES_MEET/Screenshotva5.jpg', alt: 'Voice input' },
      { src: 'assets/ELVES_MEET/Screenshotva4.jpg', alt: 'Settings' },
      { src: 'assets/ELVES_MEET/Screenshotva1.jpg', alt: 'History' },
    ]}
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

 ${p.video ? `
  <video autoplay muted playsinline loop>
    <source src="${p.video}" type="video/mp4">
  </video>
` : `
  <img src="${p.coverImage}" alt="${p.title} cover" class="pj-cover-img" />
`}

${p.liveUrl ? `
  <div class="pj-live-cta reveal-up">
    <a class="btn-primary" href="${p.liveUrl}" target="_blank" rel="noopener">See Project Live</a>
  </div>
` : ''}
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
 ${p.screenshots.length > 0 ? `
  <div style="max-width:1160px;margin:0 auto;padding:0 40px">
    <div class="screenshots-section reveal-up">
      <div class="screenshots-heading"><span class="section-icon">🗂</span> App Screenshots</div>
      <div class="screenshots-row">
        ${p.screenshots.map(sc => `
          <div class="screen-card"><img src="${sc.src}" alt="${sc.alt}" /></div>
        `).join('')}
      </div>
    </div>
  </div>
` : ''}


    <!-- View all -->
    <div class="view-all-section">
      <p class="view-all-sub">Want to see more?</p>
     <button class="view-all-link" onclick="window.location.href='https://github.com/Elvisnc9'">
  View All Projects
</button>
    </div>
  `;
}