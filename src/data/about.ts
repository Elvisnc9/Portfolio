// Copy and lists for the About page. Stats and stack are shared with home (see home.ts).

export const aboutIntro =
  'Always shipping. I build mobile apps, websites and AI products that help businesses solve real problems and win customers.';

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
  { k: 'UNN', issuer: 'University of Nigeria', title: 'BSc Computer Science', year: '2025', ring: '#111110', fill: '#FFD9C9', rot: -10 },
  { k: 'Anthropic', issuer: 'Anthropic', title: 'AI Fluency', year: '2026', ring: '#FF6A3D', fill: '#FFFFFF', rot: 8 },
  { k: 'Google', issuer: 'Google', title: 'Google AI Professional', year: '2026', ring: '#111110', fill: '#BFE3FA', rot: -6 },
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
      'I started Computer Science at the University of Nigeria with more curiosity than direction.',
      'I learned the fundamentals, broke a lot of things, and slowly figured out how software really gets built.',
      'I tried a bit of everything, looking for the part I wanted to go deep on.',
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
    role: 'MOBILE · FLUTTER',
    title: 'Mobile first, with Flutter.',
    shape: '#E4F5B8',
    paras: [
      'Flutter is where it clicked: one codebase, apps on Android and iOS, and something on my phone I could show people.',
      'I paired it with JavaScript, backends and APIs, so my apps could work with real data.',
      'Tutorials turned into working apps, and working apps gave me the confidence to build bigger.',
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
    role: 'FREELANCER · GOING BIGGER',
    title: 'Building bigger things.',
    shape: '#FFD9C9',
    paras: [
      'I took on harder problems: real-time video calling with Elves Meet, plus Campipal and Bailey.',
      'I pushed into AI and AR too, with a hands-free email app (Blail), a voice detection experiment and Genie, an AR app.',
      'Freelance work and team projects taught me to build for real people, not just for the demo.',
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
    title: 'Code that solves real problems.',
    shape: '#FF6A3D',
    paras: [
      'I graduated with a BSc in Computer Science and went pro.',
      'Real products with real teams changed how I measure my work: Flutter on Genspark AI, backend on Bitwyre, a private, safe matchmaking app with Muslim Matrimony.',
      'The question stopped being “can I build it?” and became “does it solve someone’s problem?”',
    ],
    listLabel: 'MILESTONES',
    items: [
      { k: 'BSc', name: 'BSc Computer Science', sub: 'University of Nigeria', bg: '#FFD9C9' },
      { k: 'Fl', name: 'Flutter developer', sub: 'Professional projects', bg: '#BFE3FA' },
    ],
    line: 'Code matters most when it solves someone’s real problem.',
  },
  {
    year: '2026',
    role: 'DEVELOPER · BUSINESSES & AI',
    title: 'Building more, going bigger.',
    shape: '#E6DEFF',
    paras: [
      'I’m building more than ever and taking on bigger work, helping businesses solve real problems with mobile apps, websites and AI.',
      'I keep sharpening the AI side with certificates from Google, IBM, Anthropic and Learn KTS.',
      'I’m busy and shipping, and I still make room for the right project. If your business has a problem worth solving, let’s build the answer together.',
    ],
    listLabel: 'CERTIFIED',
    items: [
      { k: 'An', name: 'AI Fluency', sub: 'Anthropic', bg: '#FFD9C9' },
      { k: 'G', name: 'Google AI Professional', sub: 'Google', bg: '#BFE3FA' },
      { k: 'IBM', name: 'Generative AI Engineering', sub: 'IBM', bg: '#E6DEFF' },
    ],
    line: 'Your business could be the next chapter.',
  },
];

/** Index of the chapter shown first (0 = 2022) */
export const startChapter = 0;
