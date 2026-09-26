# Elves Corps Portfolio: Project Rules

## Stack
Astro 6 + plain CSS (scoped styles + CSS variables) + GSAP (+ScrollTrigger) + Lenis. No Tailwind, no UI frameworks. Deploy: Vercel.
Astro 6 notes: content collections live in src/content.config.ts with the glob() loader; use render(entry); page transitions use <ClientRouter /> (not ViewTransitions). Because of ClientRouter, ALL GSAP/Lenis setup must run on the "astro:page-load" event and be cleaned up on "astro:before-swap" (kill ScrollTriggers), or animations will only play once.

## Design system ("Elves OS", light theme only)
Visual source of truth: /design-reference (read its README). Match it closely at 1440px, 834px and 390px.
- Background #F4F2ED with a faint 64px grid (lines rgba(17,17,16,.05)) + a subtle grain noise overlay (multiply).
- Surfaces #FFFFFF, surface-2 #EEEBE4, borders #DCD8CF, text #111110, muted #5C5954.
- Accents: orange #FF6A3D (main), sky #BFE3FA, pastel note colors #FFD9C9 #E4F5B8 #FFE9A8 #E6DEFF. Dark tiles #111110.
- Fonts (Google Fonts): Unbounded (headings, 700–900, tight letter-spacing ≈ -0.05em), Geist (body), Geist Mono (small uppercase labels).
- Shapes: big rounded tiles (radius 28–40px), pill buttons/chips (999px), orange circles + sky-blue arches as abstract decoration, 4-point star sparkle icon.
- Brand wordmark "ELVES CORPS" in Unbounded 900, with "CORPS" as orange outline text. Used in nav (small) and as a giant footer.
- Section titles on home: huge Unbounded title + round orange arrow button that links to the full page.
- Min touch target 44px. No emoji in UI.

## Site map
/ (home hub: bento dashboard hero, ribbons, project tiles, About/Notes/Contact previews with big title + arrow)
/about (centered grayscale portrait with "ELVIS NGWU" over it, stats, stack, services, certificates "Certified & stamped", journey chapter viewer)
/notes (+ /notes/[slug]) (corkboard of taped sticky notes, category filters)
/contact (form with chips, email tile, socials, "what happens next")
/work/[slug] (case studies)

## Workflow rules
- One phase at a time. After each step: tell me what changed, how to check it, then commit with a clear message.
- Small, targeted edits. Never rewrite whole files unless asked.
- Never delete /legacy or /assets.
- Ask before adding any new dependency.
