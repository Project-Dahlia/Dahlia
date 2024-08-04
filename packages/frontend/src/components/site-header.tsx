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
      className="sticky top-0 h-14 bg-white backdrop-blur-2xl sm:flex sm:justify-between"
      data-testid="header-container"
    >
      <div className="flex w-full items-center justify-between">
        <MainNav />
        <nav className="flex items-center gap-6 py-2 sm:mx-4 lg:mx-6">
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
              className="lg:px-6font-bold sm:px-4"
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
