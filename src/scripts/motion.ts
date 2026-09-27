// Global motion lifecycle: Lenis smooth scroll + GSAP/ScrollTrigger.
// ClientRouter keeps the same document between pages, so everything is
// set up on "astro:page-load" and torn down on "astro:before-swap".
// Page-specific scripts should follow the same pattern; any ScrollTrigger
// they create is killed here on swap.

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

let lenis: Lenis | null = null;
let ctx: gsap.Context | null = null;

const raf = (time: number) => lenis?.raf(time * 1000);

function startLenis() {
  lenis = new Lenis({ anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
}

function stopLenis() {
  gsap.ticker.remove(raf);
  lenis?.destroy();
  lenis = null;
}

/** Elements with [data-reveal] fade up as they enter the viewport. */
function reveals() {
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      autoAlpha: 0,
      y: 32,
      duration: 0.8,
      ease: 'power3.out',
      delay: Number(el.dataset.revealDelay ?? 0),
      // Hand transforms back to CSS afterwards so hover/rotate styles still work
      clearProps: 'transform,opacity,visibility',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}

/** [data-float]: a slow, endless bob. Each element gets its own rhythm. */
function floats() {
  gsap.utils.toArray<HTMLElement>('[data-float]').forEach((el, i) => {
    gsap.to(el, {
      y: gsap.utils.random(-9, -5),
      rotation: gsap.utils.random(-4, 4),
      duration: gsap.utils.random(2.2, 3.4),
      delay: i * 0.12,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  });
}

/** [data-count]: numbers like "20+" count up from 0 the first time they're seen. */
function counters() {
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const match = el.textContent?.trim().match(/^(\d+)(.*)$/);
    if (!match) return;
    const target = Number(match[1]);
    const suffix = match[2];
    const counter = { value: 0 };
    gsap.to(counter, {
      value: target,
      duration: 1.4,
      ease: 'power2.out',
      snap: { value: 1 },
      onUpdate: () => (el.textContent = `${counter.value}${suffix}`),
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
    el.textContent = `0${suffix}`;
  });
}

/** [data-parallax="0.2"]: drift against the scroll. Positive = moves up faster. */
function parallax() {
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = Number(el.dataset.parallax) || 0.15;
    gsap.fromTo(
      el,
      { y: speed * 160 },
      {
        y: speed * -160,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });
}

/**
 * [data-speed="1.4"]: scroll parallax relative to the element's section.
 * 1 = moves with the page, >1 rushes ahead, <1 lags behind.
 */
function speedParallax() {
  gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((el) => {
    const speed = Number(el.dataset.speed) || 1;
    const section = el.closest('section') ?? el.parentElement ?? el;
    const nearTop = section.getBoundingClientRect().top + window.scrollY < window.innerHeight * 0.5;
    if (nearTop) {
      // Hero sections: start at rest, then spread apart as the section scrolls away
      gsap.to(el, {
        y: () => (1 - speed) * section.offsetHeight * 0.6,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
      });
    } else {
      // Further down: drift across the whole pass through the screen, centred on rest
      gsap.fromTo(
        el,
        { y: (speed - 1) * 120 },
        {
          y: (1 - speed) * 120,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    }
  });
}

// Pointer effects only make sense with a mouse, and their listeners must go on page change
const finePointer = window.matchMedia('(pointer: fine)');
let listeners: AbortController | null = null;

/**
 * [data-lean] containers: their [data-speed] children lean toward the mouse, faster ones more.
 * Uses x + rotation so scroll parallax (y) is untouched; rotation is added on top of
 * whatever tilt the element already has.
 */
function pointerParallax(signal: AbortSignal) {
  if (!finePointer.matches) return;
  document.querySelectorAll<HTMLElement>('[data-lean]').forEach((stage) => {
    const items = [...stage.querySelectorAll<HTMLElement>('[data-speed]')].map((el) => {
      const speed = Number(el.dataset.speed) || 1;
      return {
        speed,
        baseRotation: Number(gsap.getProperty(el, 'rotation')) || 0,
        x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' }),
        r: gsap.quickTo(el, 'rotation', { duration: 0.9, ease: 'power3.out' }),
      };
    });
    stage.addEventListener(
      'pointermove',
      (e) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        items.forEach((t) => {
          t.x(nx * 44 * t.speed);
          t.r(t.baseRotation + nx * 8 * t.speed);
        });
      },
      { signal },
    );
    stage.addEventListener('pointerleave', () => items.forEach((t) => (t.x(0), t.r(t.baseRotation))), { signal });
  });
}

/** [data-magnetic]: buttons lean toward the cursor, then spring back. */
function magnetic(signal: AbortSignal) {
  if (!finePointer.matches) return;
  gsap.utils.toArray<HTMLElement>('[data-magnetic]').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    const y = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });
    el.addEventListener(
      'pointermove',
      (e) => {
        const box = el.getBoundingClientRect();
        x((e.clientX - (box.left + box.width / 2)) * 0.35);
        y((e.clientY - (box.top + box.height / 2)) * 0.35);
      },
      { signal },
    );
    el.addEventListener('pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' }), {
      signal,
    });
  });
}

/**
 * [data-stamp]: slams down like a rubber stamp. Its [data-stamp-surface] ancestor
 * (the paper) fades in first and thuds on impact; an optional .ink child spreads out.
 */
function stamps() {
  gsap.utils.toArray<HTMLElement>('[data-stamp]').forEach((stamp) => {
    const surface = stamp.closest<HTMLElement>('[data-stamp-surface]') ?? stamp;
    const ink = stamp.querySelector('.ink');
    const order = Number(surface.dataset.stampOrder ?? 0);
    const tl = gsap.timeline({ delay: order * 0.18, scrollTrigger: { trigger: surface, start: 'top 85%', once: true } });
    tl.from(surface, { autoAlpha: 0, y: 40, duration: 0.55, ease: 'power3.out' })
      .from(stamp, { autoAlpha: 0, scale: 2.8, y: -90, rotation: -25, duration: 0.36, ease: 'power4.in' }, '-=0.15')
      .fromTo(surface, { y: 7, scale: 0.985 }, { y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.35)' })
      .to(stamp, { rotation: 2, duration: 0.08, yoyo: true, repeat: 1, ease: 'power1.inOut' }, '<');
    if (ink) tl.fromTo(ink, { scale: 0.7, autoAlpha: 0.6 }, { scale: 1.8, autoAlpha: 0, duration: 0.7, ease: 'power2.out' }, '<');
    // Give transforms back to CSS once it has landed (hover styles)
    tl.set([surface, stamp], { clearProps: 'transform,opacity,visibility' });
  });
}

/** Ribbons run faster while the page scrolls, then ease back to their cruising speed. */
let ribbonTick: (() => void) | null = null;

function ribbons() {
  const animations = [...document.querySelectorAll<HTMLElement>('.ribbons .track')].flatMap((t) => t.getAnimations());
  if (!animations.length || !lenis) return;
  let boost = 1;
  lenis.on('scroll', ({ velocity }: { velocity: number }) => {
    boost = Math.max(boost, 1 + Math.min(Math.abs(velocity) / 6, 5));
  });
  ribbonTick = () => {
    boost += (1 - boost) * 0.06;
    animations.forEach((a) => (a.playbackRate = boost));
  };
  gsap.ticker.add(ribbonTick);
}

function setup() {
  if (reducedMotion.matches) return;

  startLenis();
  listeners = new AbortController();
  const { signal } = listeners;
  ctx = gsap.context(() => {
    reveals();
    floats();
    counters();
    parallax();
    speedParallax();
    pointerParallax(signal);
    magnetic(signal);
    stamps();
  });
  ribbons();
  // Fonts change text heights, so recalculate trigger positions once loaded
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

function teardown() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  listeners?.abort();
  listeners = null;
  ctx?.revert();
  ctx = null;
  if (ribbonTick) gsap.ticker.remove(ribbonTick);
  ribbonTick = null;
  stopLenis();
}

document.addEventListener('astro:page-load', setup);
document.addEventListener('astro:before-swap', teardown);

// The mobile menu locks scrolling while it is open
document.addEventListener('menu:toggle', (e) => {
  const { open } = (e as CustomEvent<{ open: boolean }>).detail;
  if (open) lenis?.stop();
  else lenis?.start();
});
