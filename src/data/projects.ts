// Selected work shown on the home page. Case study pages (/work/[slug])
// are built in a later phase.

export type Category = 'Mobile' | 'Web' | 'AI';

export interface Project {
  slug: string;
  title: string;
  /** Shorter title for small tiles */
  shortTitle?: string;
  tag: string;
  categories: Category[];
  bg: string;
  /** Pill colours: light tile = dark title pill, dark tile = light title pill, vivid = white title pill */
  tone: 'light' | 'dark' | 'vivid';
  /** How the image sits in the tile */
  media: 'phones' | 'contain' | 'cover' | 'phone-bottom';
  images: { src: string; alt: string; width: number; height: number }[];
}

const img = (name: string, alt: string, width: number, height: number) => ({
  src: `/images/projects/${name}.webp`,
  alt,
  width,
  height,
});

export const projects: Project[] = [
  {
    slug: 'genspark-ai',
    title: 'Genspark AI',
    tag: 'Mobile · AI',
    categories: ['Mobile', 'AI'],
    bg: '#E6ECF5',
    tone: 'light',
    media: 'phones',
    images: [
      img('genspark1', 'Genspark AI Slides screen', 665, 1440),
      img('genspark2', 'Genspark AI Docs screen', 665, 1440),
    ],
  },
  {
    slug: 'articos',
    title: 'Articos',
    tag: 'Web · SaaS · AI',
    categories: ['Web', 'AI'],
    bg: '#15110B',
    tone: 'dark',
    media: 'contain',
    images: [img('articos', 'Articos landing page', 512, 306)],
  },
  {
    slug: 'wealthfolio',
    title: 'Wealthfolio',
    tag: 'Web · Finance',
    categories: ['Web'],
    bg: '#0B0B0C',
    tone: 'dark',
    media: 'cover',
    images: [img('wealthfolio', 'Wealthfolio dashboards', 640, 523)],
  },
  {
    slug: 'kidemis',
    title: 'Kidemis',
    tag: 'Web · Biotech',
    categories: ['Web'],
    bg: '#BFE3FA',
    tone: 'light',
    media: 'contain',
    images: [img('kidemis', 'Kidemis brand', 402, 223)],
  },
  {
    slug: 'bitwyre',
    title: 'Bitwyre Exchange',
    shortTitle: 'Bitwyre',
    tag: 'Web · Crypto',
    categories: ['Web'],
    bg: '#000000',
    tone: 'dark',
    media: 'contain',
    images: [img('bitwyre', 'Bitwyre logo', 500, 314)],
  },
  {
    slug: 'muslim-matrimony',
    title: 'Muslim Matrimony',
    shortTitle: 'Matrimony',
    tag: 'Mobile · Social',
    categories: ['Mobile'],
    bg: '#E0245E',
    tone: 'vivid',
    media: 'phone-bottom',
    images: [img('matrimony', 'Muslim Matrimony app screen', 166, 296)],
  },
];

export const latestShip = {
  project: projects[0],
  subtitle: 'AI workspace · Mobile app',
};
