// Copy and lists for the About page. Stats and stack are shared with home (see home.ts).

export const aboutIntro =
  'I build websites, mobile apps and AI-powered products that feel as good as they perform.';

export const services = [
  { n: '01', title: 'Mobile apps', text: 'Native-feeling apps built with Flutter.', bg: '#FFD9C9' },
  { n: '02', title: 'Websites', text: 'Fast, responsive sites that look sharp everywhere.', bg: '#BFE3FA' },
  { n: '03', title: 'SaaS', text: 'Products taken from idea to launch.', bg: '#E4F5B8' },
  { n: '04', title: 'AI integration', text: 'AI features built into real products.', bg: '#E6DEFF' },
];

/**
 * Certificates shown as rubber stamps. Add a url to show "View certificate".
 * Entries with draft: true are hidden until their details are filled in.
 */
export const certificates: {
  k: string;
  issuer: string;
  title: string;
  year: string;
  ring: string;
  fill: string;
  rot: number;
  url?: string;
  draft?: boolean;
}[] = [
  // TODO: confirm degree year (the journey below says 2025)
  { k: 'UNN', issuer: 'University of Nigeria', title: 'BSc Computer Science', year: '2026', ring: '#111110', fill: '#FFD9C9', rot: -10 },
  { k: 'An', issuer: 'Anthropic', title: 'AI Fluency', year: '2026', ring: '#FF6A3D', fill: '#FFFFFF', rot: 8 },
  { k: 'G', issuer: 'Google', title: 'Google AI Professional', year: '2026', ring: '#111110', fill: '#BFE3FA', rot: -6 },
  { k: 'IBM', issuer: 'IBM', title: 'Generative AI Engineering', year: '2026', ring: '#111110', fill: '#E6DEFF', rot: 10 },
  // TODO: Learn KTS certificate name + year, then remove draft
  { k: 'LK', issuer: 'Learn KTS', title: '', year: '', ring: '#FF6A3D', fill: '#E4F5B8', rot: -8, draft: true },
];

export interface Chapter {
  year: string;
  role: string;
  title: string;
  /** Colour of the circle in the chapter card's corner */
  shape: string;
  paras: string[];
  listLabel: string;
  items: { k: string; name: string; sub: string; bg: string }[];
  line: string;
}

export const journey: Chapter[] = [
  {
    year: '2022',
    role: 'STUDENT · GETTING STARTED',
    title: 'Where it all started.',
    shape: '#BFE3FA',
    paras: [
      'Started my journey into technology and Computer Science.',
      'Learned the fundamentals of programming and began understanding how software is built.',
      'Experimented with different technologies to discover what I wanted to pursue.',
    ],
    listLabel: 'THIS YEAR',
    items: [
      { k: 'CS', name: 'Computer Science', sub: 'University of Nigeria', bg: '#BFE3FA' },
      { k: '{}', name: 'First lines of code', sub: 'Programming fundamentals', bg: '#FFE9A8' },
    ],
    line: 'Curiosity first. Everything else came after.',
  },
  {
    year: '2023',
    role: 'DEVELOPER · EXPLORING',
    title: 'Going deeper.',
    shape: '#E4F5B8',
    paras: [
      'Went deeper into programming and started building real projects.',
      'Explored mobile development with Flutter alongside JavaScript, backend technologies and APIs.',
      'Started collaborating on projects and turning what I learned into working products.',
    ],
    listLabel: 'PICKED UP',
    items: [
      { k: 'Fl', name: 'Flutter', sub: 'Mobile development', bg: '#BFE3FA' },
      { k: 'Js', name: 'JavaScript', sub: 'Web foundations', bg: '#FFE9A8' },
      { k: 'Api', name: 'Backends & APIs', sub: 'Connecting the pieces', bg: '#E4F5B8' },
    ],
    line: 'From tutorials to things that actually run.',
  },
  {
    year: '2024',
    role: 'FREELANCER · BUILDING',
    title: 'Building for real people.',
    shape: '#FFD9C9',
    paras: [
      'Moved from simply learning to building for real people and real use cases.',
      'Worked on mobile and web projects, collaborated with teams, and took on freelance work.',
      'Built Campipal, Bailey and Elves Meet while expanding my development stack.',
    ],
    listLabel: 'SHIPPED',
    items: [
      { k: 'Cp', name: 'Campipal', sub: 'Mobile app', bg: '#E4F5B8' },
      { k: 'Ba', name: 'Bailey', sub: 'Mobile app', bg: '#FFD9C9' },
      { k: 'Em', name: 'Elves Meet', sub: 'Video calling app', bg: '#BFE3FA' },
    ],
    line: 'The first time strangers used something I built.',
  },
  {
    year: '2025',
    role: 'CS GRADUATE · PROFESSIONAL',
    title: 'Graduated. Went pro.',
    shape: '#FF6A3D',
    paras: [
      'Graduated with a degree in Computer Science after four years of learning, building and problem-solving.',
      'Kept working on real-world applications while growing as a Flutter developer.',
      'Focused on professional projects, collaboration, cloud technologies and delivering complete products.',
    ],
    listLabel: 'MILESTONES',
    items: [
      { k: 'BSc', name: 'BSc Computer Science', sub: 'University of Nigeria', bg: '#FFD9C9' },
      { k: 'Fl', name: 'Flutter developer', sub: 'Professional projects', bg: '#BFE3FA' },
    ],
    line: 'Four years of school, one very long build.',
  },
  {
    year: '2026',
    role: 'FLUTTER DEV · AI & CLOUD',
    title: 'AI, cloud and new tools.',
    shape: '#E6DEFF',
    paras: [
      'Expanded beyond traditional app development into AI, AI integrations and new developer tools.',
      'Kept building mobile and web products while experimenting with cloud and modern workflows.',
      'Added new certifications and kept turning ideas into more capable products.',
    ],
    listLabel: 'CERTIFIED',
    items: [
      { k: 'An', name: 'AI Fluency', sub: 'Anthropic', bg: '#FFD9C9' },
      { k: 'G', name: 'Google AI Professional', sub: 'Google', bg: '#BFE3FA' },
      { k: 'IBM', name: 'Generative AI Engineering', sub: 'IBM', bg: '#E6DEFF' },
    ],
    line: 'Teaching products to think a little.',
  },
];

/** Index of the chapter shown first (0 = 2022) */
export const startChapter = 0;
