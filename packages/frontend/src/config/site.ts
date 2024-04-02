import { NavItem, SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Dahlia',
  description:
    'Dahlia is an on-demand parking application designed to help users find available parking spaces in their city.',
  github: 'https://github.com/Project-Dahlia/Dahlia'
};

export const routes: NavItem[] = [
  {
    href: '/about',
    label: 'About Us'
  },
  {
    href: '/help',
    label: 'Help'
  }
];
