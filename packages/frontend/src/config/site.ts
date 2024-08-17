import { NavItem, SiteConfig, SidebarItem } from '@/types';

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

export const sidebarRoutes: SidebarItem[] = [
  {
    href: '/parking',
    label: 'Parking',
    icon: 'parking'
  },
  {
    href: '/events',
    label: 'Events',
    icon: 'events'
  },
  {
    href: '/insights',
    label: 'Insights',
    icon: 'insights'
  },
  {
    href: '/notifications',
    label: 'Notifications',
    icon: 'notifications'
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: 'settings'
  },
  {
    href: '/support',
    label: 'Support',
    icon: 'support'
  }
];
