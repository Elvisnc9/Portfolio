// Copy and lists for the home page. Edit text here, not in components.

/** "short" labels are used where space is tight (About page on mobile) */
export const stats = {
  shipped: { value: '20+', label: 'apps & websites', short: 'apps & sites' },
  teamwork: { value: '10+', label: 'collaborations', short: 'collabs' },
  years: { value: '4+', label: 'years building', short: 'years', since: 2022 },
};

/** "k" is the two-letter monogram shown on the app icon */
export const stack = [
  { k: 'Fl', name: 'Flutter', bg: '#02569B', fg: '#FFFFFF' },
  { k: 'Da', name: 'Dart', bg: '#0175C2', fg: '#FFFFFF' },
  { k: 'Kt', name: 'Kotlin', bg: '#7F52FF', fg: '#FFFFFF' },
  { k: 'Sp', name: 'Serverpod', bg: '#BFE3FA', fg: '#111110' },
  { k: 'Fb', name: 'Firebase', bg: '#FFCA28', fg: '#111110' },
  { k: 'Nd', name: 'Node.js', bg: '#3C873A', fg: '#FFFFFF' },
  { k: 'Pg', name: 'Postgres', bg: '#336791', fg: '#FFFFFF' },
  { k: 'n8', name: 'n8n', bg: '#FF6A3D', fg: '#111110' },
];

export const trustedBy = ['Genspark', 'Bitwyre', 'Kidemis', 'Articos', 'Activedge', 'Nikah Forever'];

export const heroQuote = { text: 'Looks premium and works beautifully.', name: 'Saleem', company: 'Nikah Forever' };

export const ribbon = ['MOBILE APPS', 'WEBSITES', 'SAAS', 'AI INTEGRATION'];

/** Side projects. Add an href to make a row clickable. */
export const experiments: { k: string; name: string; type: string; bg: string; href?: string }[] = [
  { k: 'Bl', name: 'Blail', type: 'Mobile app', bg: '#FFD9C9' },
  { k: 'Em', name: 'Elves Meet', type: 'Video calling app', bg: '#BFE3FA' },
  { k: 'Cp', name: 'Campipal', type: 'Mobile app', bg: '#E4F5B8' },
  { k: 'Vd', name: 'Voice Detection', type: 'AI experiment', bg: '#E6DEFF' },
  { k: 'Ge', name: 'Genie', type: 'AR / Mobile', bg: '#FFE9A8' },
  { k: 'Au', name: 'Aurelle', type: 'Frontend', bg: '#F4F2ED' },
];

export const aboutChips = ['Based in Nigeria', 'BSc Computer Science', 'Flutter · Serverpod · AI'];

/** Chat bubbles alternate sides. "short" is used on mobile when set. */
export const testimonials: { quote: string; short?: string; name: string; company: string; tone: 'orange' | 'surface' | 'sky' }[] = [
  {
    quote: "You delivered something that looks premium and works beautifully. I couldn't have asked for a better result.",
    name: 'Saleem',
    company: 'Nikah Forever',
    tone: 'orange',
  },
  {
    quote: 'Communication was excellent, the project was delivered on time, and the final product exceeded every expectation.',
    short: 'Communication was excellent, delivered on time, and the final product exceeded every expectation.',
    name: 'Michelle',
    company: 'Kidemis',
    tone: 'surface',
  },
  {
    quote: 'Multiple integrations and moving parts, but Elvis handled them with confidence. His troubleshooting really stood out.',
    short: 'Multiple integrations and moving parts, but Elvis handled them with confidence.',
    // TODO: Genspark PM's name
    name: '',
    company: 'Product Manager, Genspark',
    tone: 'sky',
  },
  {
    quote: 'Elvis, you crushed it when you switched to backend.',
    name: 'Sandra',
    company: 'Activedge Technologies',
    tone: 'surface',
  },
];

/** Home preview of the notes board (the full list moves to a content collection in the Notes phase) */
export const notesPreview = {
  total: 9,
  items: [
    { n: '01', title: 'Building from Africa', text: 'World-class products can come from anywhere. Great ideas don’t need permission from a zip code.', bg: '#FFD9C9', rot: -2 },
    { n: '02', title: 'Designing for trust', text: 'People need to trust a product before they rely on it. That balance is where good products are made.', bg: '#BFE3FA', rot: 1.5 },
    { n: '03', title: 'The future is immersive', text: 'AR blends the digital and physical instead of replacing one with the other.', bg: '#F4F2ED', rot: -1 },
    { n: '04', title: 'Beauty in simplicity', text: 'Good products don’t need to be complicated. Clear experiences make tech feel natural.', bg: '#E4F5B8', rot: 2 },
  ],
};
