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

export const collections = { notes };
