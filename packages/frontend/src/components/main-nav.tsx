'use client';

import Link from 'next/link';
import Logo from '../../public/logo.svg';
import Image from 'next/image';
import { routes } from '@/config/site';

export function MainNav() {
  return (
    <div className="relative flex h-14 w-full items-center justify-between px-2 sm:px-4 lg:px-6">
      <Link href="/">
        <Image src={Logo} alt="site-logo" className="h-10 w-24" />
      </Link>
      <nav className="gap:10 mx-auto hidden items-center md:flex">
        {routes.map((route, i) => (
          <Link key={i} href={route.href} className="block px-6 font-medium">
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
