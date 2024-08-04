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

export interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
}

export type SignInPayload = {
  redirect: false;
  email: string;
  password: string;
  callbackUrl: string;
};

export type RegisterPayload = SignInPayload & {
  name: string;
};
