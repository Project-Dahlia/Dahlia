import { Route } from 'next';

export type SiteConfig = {
  name: string;
  description: string;
  github: string;
};

export type NavItem = {
  href: Route;
  label: string;
};
