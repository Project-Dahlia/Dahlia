'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { routes } from '@/config/site';

export function MainNav() {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center">
        <Link href="/">
          <Logo alt="site-logo" className="h-10 w-24" />
        </Link>
      </div>
      <nav className="mx-auto hidden items-center md:flex">
        {routes.map((route, i) => (
          <Link
            key={i}
            href={route.href}
            className="text-md block px-6 font-medium"
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
