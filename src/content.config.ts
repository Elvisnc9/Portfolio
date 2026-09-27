import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Notes: one markdown file per note in src/content/notes. The filename is the URL slug.
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    /** Display number and sort order ("NOTE 01") */
    n: z.number().int().positive(),
    title: z.string(),
    category: z.enum(['Building', 'Design', 'Tech', 'Life']),
    /** Shown on the sticky note */
    excerpt: z.string(),
    /** Shorter excerpt for small screens (optional) */
    excerptShort: z.string().optional(),
    /** Sticky note colour and tilt on the board */
    color: z.string().default('#FFFFFF'),
    rotate: z.number().default(0),
    /** The big note at the top of /notes (only one) */
    pinned: z.boolean().default(false),
    /** Listed in the "Start here" card on /notes */
    startHere: z.boolean().default(false),
    /** Shown in the home page preview (up to 4) */
    home: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Case studies: one markdown file per project in src/content/work, named by the
// project's slug in src/data/projects.ts (which holds the tile colours and images).
// Every section is optional: leave a field out and that section is not shown.
const card = z.object({ title: z.string().optional(), text: z.string().optional() });

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    /** Small dark chip in the hero, e.g. "MOBILE APP · AI" */
    kind: z.string(),
    /** One or two sentences under the title */
    summary: z.string(),
    summaryShort: z.string().optional(),
    /** Live product link: status chip + main button */
    live: z.object({ status: z.string(), cta: z.string(), href: z.string().url() }).optional(),
    /** Fact tiles: role, timeline, platform, team... */
    facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    /** "The brief": lead sentence + a softer tail in muted colour */
    brief: z.object({ lead: z.string(), muted: z.string().optional() }).optional(),
    challenge: card.optional(),
    whatIDid: card.optional(),
    outcome: card.optional(),
    /** "Inside the app" feature tiles; image is a path in /public */
    features: z
      .array(z.object({ title: z.string(), text: z.string(), image: z.string(), alt: z.string(), dark: z.boolean().default(false) }))
      .default([]),
    quote: z.object({ text: z.string(), name: z.string().optional(), role: z.string() }).optional(),
  }),
});

export const collections = { notes, work };
