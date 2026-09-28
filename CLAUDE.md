# Elves Corps Portfolio: Project Rules

## Stack
Astro 6 + plain CSS (scoped styles + CSS variables) + GSAP (+ScrollTrigger) + Lenis. No Tailwind, no UI frameworks. Deploy: Vercel.
Astro 6 notes: content collections live in src/content.config.ts with the glob() loader; use render(entry); page transitions use <ClientRouter /> (not ViewTransitions). Because of ClientRouter, ALL GSAP/Lenis setup must run on the "astro:page-load" event and be cleaned up on "astro:before-swap" (kill ScrollTriggers), or animations will only play once.

## Design system ("Elves OS", light theme only)
Visual source of truth: /design-reference (read its README). Match it closely at 1440px, 834px and 390px.
- Background #F4F2ED with a faint 64px grid (lines rgba(17,17,16,.05)) + a subtle grain noise overlay (multiply).
- Surfaces #FFFFFF, surface-2 #EEEBE4, borders #DCD8CF, text #111110, muted #5C5954.
- Accents: orange #FF6A3D (main), sky #BFE3FA, pastel note colors #FFD9C9 #E4F5B8 #FFE9A8 #E6DEFF. Dark tiles #111110.
- Fonts (Google Fonts): Unbounded (headings, 700–900, tight letter-spacing ≈ -0.05em), Geist (body), Geist Mono (small uppercase labels), Syne 800 (the huge "Elvis" in the home hero only).
- Shapes: big rounded tiles (radius 28–40px), pill buttons/chips (999px), orange circles + sky-blue arches as abstract decoration, 4-point star sparkle icon.
- Brand wordmark "ELVES CORPS" in Unbounded 900, with "CORPS" as orange outline text. Used in nav (small) and as a giant footer.
- Section titles on home: huge Unbounded title + round orange arrow button that links to the full page.
- Min touch target 44px. No emoji in UI.

## Motion (src/scripts/motion.ts)
Add behaviour with data attributes instead of new scripts:
- data-reveal (+ data-reveal-delay): fade up on scroll into view
- data-speed="1.4": scroll parallax vs its section (>1 rushes, <1 lags)
- data-lean on a container: its data-speed children lean toward the mouse (home hero, about stage, case hero)
- data-parallax="0.15": small drift for decoration
- data-float: gentle endless bob · data-count: "20+" counts up · data-magnetic: button pulls toward the cursor
- data-stamp inside data-stamp-surface (+ data-stamp-order): rubber-stamp slam (certificates)
Everything is off under prefers-reduced-motion. Pointer effects only run on fine pointers (mouse).

## Site map (one page)
/ is the whole site, in this order: hero "Elvis" with floating toys, ribbons, #work (selected work + filters + experiments),
#about (portrait hero, stats + stack, services, certificates "Certified & stamped", journey), testimonials,
#notes (corkboard with search + category filters), #contact (form, email, socials, what happens next).
Nav: Work -> "/" (top), About/Notes/Contact -> "/#section" (smooth scroll; scrollspy highlights the current one).
Tablet: nav links written out like desktop; the home hero and About hero fill the screen, centred. Phones use the menu.
Separate pages only for detail: /work/[slug] (case studies) and /notes/[slug] (a note).
Old /about, /notes, /contact, /work redirect to their sections (astro.config.mjs).

## Workflow rules
- One phase at a time. After each step: tell me what changed, how to check it, then commit with a clear message.
- Small, targeted edits. Never rewrite whole files unless asked.
- Never delete /legacy or /assets.
- Ask before adding any new dependency.
