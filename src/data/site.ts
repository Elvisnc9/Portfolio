// Site-wide info shared by the nav, mobile menu and footer.

export const site = {
  name: 'Elves Corps',
  owner: 'Elvis Ngwu',
  email: 'elvescorps@outlook.com',
  description: 'Elvis Ngwu, mobile and web developer. Portfolio, case studies and notes.',
  timezone: 'Africa/Lagos',
  available: true,
};

export const navLinks = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/about' },
  { label: 'Notes', href: '/notes' },
  { label: 'Contact', href: '/contact' },
] as const;

export type NavLabel = (typeof navLinks)[number]['label'];

// Links with an empty href are hidden until filled in.
// `menu` = also shown in the mobile menu.
// `contactOnly` = only in the contact page's "Find me elsewhere" grid.
// `k`, `bg`, `fg` = the app-icon tile on the contact page.
export const socials = [
  { label: 'GitHub', href: 'https://github.com/Elvisnc9', menu: true, k: 'Gh', bg: '#111110', fg: '#F4F2ED' },
  // TODO: add your LinkedIn profile URL
  { label: 'LinkedIn', href: '', menu: true, k: 'in', bg: '#0A66C2', fg: '#FFFFFF' },
  { label: 'X', href: 'https://x.com/ElvisNgwu', menu: false, k: 'X', bg: '#EEEBE4', fg: '#111110' },
  { label: 'WhatsApp', href: 'https://wa.me/2349056982116', menu: true, k: 'Wa', bg: '#25D366', fg: '#111110' },
  { label: 'Telegram', href: 'https://t.me/Elviznc', menu: false, contactOnly: true, k: 'Tg', bg: '#BFE3FA', fg: '#111110' },
  // TODO: add your Contra profile URL
  { label: 'Contra', href: '', menu: false, contactOnly: true, k: 'Ct', bg: '#FFE9A8', fg: '#111110' },
  // TODO: add your pub.dev publisher URL
  { label: 'pub.dev', href: '', menu: false, k: 'Pd', bg: '#0175C2', fg: '#FFFFFF' },
  // TODO: add your Instagram profile URL
  { label: 'Instagram', href: '', menu: false, contactOnly: true, k: 'Ig', bg: '#FFD9C9', fg: '#111110' },
];

export const whatsapp = socials.find((s) => s.label === 'WhatsApp')!.href;
export const cvUrl = '/NGWU_ELVIS_CV.pdf';
