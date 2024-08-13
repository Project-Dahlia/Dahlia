'use client';
import { Button } from './ui/button';
import { MainNav } from './main-nav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export function Header({ isAuthenticated }: { isAuthenticated: boolean }) {
  const pathName = usePathname();

  // Conditional rendering of the auth buttons
  const showLoginButton = pathName !== '/api/auth/login';
  const showRegisterButton = pathName !== '/api/auth/register';

  return (
    <header
      className="sticky inset-x-0 top-0 z-50 h-14 w-full border-b border-border bg-white px-4 backdrop-blur-lg"
      data-testid="header-container"
    >
      <div className="mx-auto flex h-full items-center justify-between px-2.5 md:max-w-screen-xl lg:px-10">
        <MainNav />
        <nav className="flex min-w-[190px] flex-shrink-0 items-center justify-end gap-4">
          {showLoginButton && !isAuthenticated && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-gray-400 bg-white px-4 font-bold"
              aria-label="Login"
            >
              <Link href="/api/auth/login">Login</Link>
            </Button>
          )}
          {showRegisterButton && !isAuthenticated && (
            <Button
              asChild
              variant="default"
              className="font-bold sm:px-4 lg:px-6"
              size="sm"
              aria-label="Register"
            >
              <Link href="/api/auth/register">Register</Link>
            </Button>
          )}

          {isAuthenticated && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-gray-400 bg-white px-4 font-bold"
              onClick={() => signOut()}
            >
              <Link href="/api/auth/login">Logout</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
