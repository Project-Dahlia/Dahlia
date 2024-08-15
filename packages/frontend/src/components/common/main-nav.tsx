'use client';

import Link from 'next/link';
import Logo from '@/../public/logo.svg';
import Image from 'next/image';
import { routes } from '@/config/site';

export function MainNav() {
  return (
    <div
      className="relative flex h-14 w-full items-center justify-stretch px-2 sm:px-4 lg:px-6"
      data-testid="main-nav"
    >
      <Link href="/">
        <Image src={Logo} alt="site-logo" className="h-10 w-24" />
      </Link>
      <nav className=" mx-auto hidden items-center gap-10 md:flex">
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
