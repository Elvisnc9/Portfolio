// Copy and lists for the home page. Edit text here, not in components.

/** "short" labels are used where space is tight (About page on mobile) */
export const stats = {
  shipped: { value: '20+', label: 'apps & websites', short: 'apps & sites' },
  teamwork: { value: '10+', label: 'collaborations', short: 'collabs' },
  years: { value: '4+', label: 'years building', short: 'years', since: 2022 },
};

/** Tech stack, shown as logos only (the name is the image's alt text and tooltip) */
export const stack = [
  { name: 'Flutter', icon: '/images/stack/flutter.png' },
  { name: 'Dart', icon: '/images/stack/dart.png' },
  { name: 'Kotlin', icon: '/images/stack/kotlin.png' },
  { name: 'Serverpod', icon: '/images/stack/serverpod.png' },
  { name: 'Firebase', icon: '/images/stack/firebase.png' },
  { name: 'Node.js', icon: '/images/stack/nodejs.png' },
  { name: 'PostgreSQL', icon: '/images/stack/postgres.png' },
  { name: 'n8n', icon: '/images/stack/n8n.png' },
];

export const stackByName = (name: string) => stack.find((s) => s.name === name);

export const trustedBy = ['Genspark', 'Bitwyre', 'Kidemis', 'Articos', 'Activedge', 'Nikah Forever'];

export const heroQuote = { text: 'Looks premium and works beautifully.', name: 'Saleem', company: 'Nikah Forever' };

export const ribbon = ['MOBILE APPS', 'WEBSITES', 'SAAS', 'AI INTEGRATION'];

/** Side projects. `icon` is a name from Icon.astro. Add an href to make a row clickable. */
export const experiments: {
  icon: 'mail' | 'video' | 'campus' | 'waveform' | 'ar' | 'layout';
  name: string;
  type: string;
  bg: string;
  href?: string;
}[] = [
  { icon: 'mail', name: 'Blail', type: 'Hands-free email app', bg: '#FFD9C9' },
  { icon: 'video', name: 'Elves Meet', type: 'Video calling app', bg: '#BFE3FA' },
  { icon: 'campus', name: 'Campipal', type: 'Campus app', bg: '#E4F5B8', href: 'https://play.google.com/store/apps/details?id=com.mobile.campuspalng.app' },
  { icon: 'waveform', name: 'Voice Detection', type: 'AI experiment', bg: '#E6DEFF' },
  { icon: 'ar', name: 'Genie', type: 'AR app', bg: '#FFE9A8' },
  { icon: 'layout', name: 'Aurelle', type: 'Frontend', bg: '#F4F2ED' },
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
