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
  ctx = gsap.context(() => {
    reveals();
    floats();
    counters();
    parallax();
  });
  ribbons();
  // Fonts change text heights, so recalculate trigger positions once loaded
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

function teardown() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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
