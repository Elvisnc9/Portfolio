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
export const socials = [
  { label: 'GitHub', href: 'https://github.com/Elvisnc9', menu: true },
  // TODO: add your LinkedIn profile URL
  { label: 'LinkedIn', href: '', menu: true },
  { label: 'X', href: 'https://x.com/ElvisNgwu', menu: false },
  { label: 'WhatsApp', href: 'https://wa.me/2349056982116', menu: true },
  // TODO: add your pub.dev publisher URL
  { label: 'pub.dev', href: '', menu: false },
];

export const whatsapp = socials.find((s) => s.label === 'WhatsApp')!.href;
export const cvUrl = '/NGWU_ELVIS_CV.pdf';
