// Site-wide info shared by the nav, mobile menu and footer.

export const site = {
  name: 'Elves Corps',
  owner: 'Elvis Ngwu',
  email: 'elvescorps@outlook.com',
  /** Web3Forms access key for the contact form (public by design: it can only send to your inbox) */
  web3formsKey: '063ea004-09b3-4ea3-b77a-83a165355924',
  description: 'Elvis Ngwu — I build websites and apps that help businesses get found and win customers.',
  timezone: 'Africa/Lagos',
  available: true,
};

// One-page site: Work goes to the top of the home page, the rest scroll to their section.
// `section` is what the nav highlights while scrolling (scrollspy in Nav.astro).
export const navLinks = [
  { label: 'Work', href: '/', section: 'top' },
  { label: 'About', href: '/#about', section: 'about' },
  { label: 'Notes', href: '/#notes', section: 'notes' },
  { label: 'Contact', href: '/#contact', section: 'contact' },
] as const;

export type NavLabel = (typeof navLinks)[number]['label'];

// Links with an empty href are hidden until filled in.
// `menu` = also shown in the mobile menu.
// `contactOnly` = only in the contact page's "Find me elsewhere" grid.
// `k`, `bg`, `fg` = the app-icon tile on the contact page.
export const socials = [
  { label: 'GitHub', href: 'https://github.com/Elvisnc9', menu: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/elviznc', menu: true },
  { label: 'X', href: 'https://x.com/ElvisNgwu', menu: false },
  { label: 'WhatsApp', href: 'https://wa.me/2349056982116', menu: true },
  { label: 'Telegram', href: 'https://t.me/Elviznc', menu: false, contactOnly: true },
  { label: 'Instagram', href: 'https://www.instagram.com/elvisngwu', menu: false, contactOnly: true },
];

export const whatsapp = socials.find((s) => s.label === 'WhatsApp')!.href;
export const cvUrl = '/NGWU_ELVIS_CV.pdf';
