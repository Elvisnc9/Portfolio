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

export const socials = [
  { label: 'GitHub', href: 'https://github.com/Elvisnc9' },
  // TODO: add your LinkedIn profile URL
  { label: 'LinkedIn', href: '' },
  { label: 'WhatsApp', href: 'https://wa.me/2349056982116' },
];
