'use client';
import { Button } from '../ui/button';
import { MainNav } from './main-nav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathName = usePathname();

  // Conditional rendering of the auth buttons
  const showLoginButton = pathName !== '/api/auth/login';
  const showRegisterButton = pathName !== '/api/auth/register';

  return (
    <header
      className="sticky inset-x-0 top-0 z-50 h-14 w-full justify-between border-b border-border bg-white px-4 backdrop-blur-lg"
      data-testid="header-container"
    >
      {/* sticky top-0 h-14 bg-white backdrop-blur-2xl sm:flex sm:justify-between" */}
      <div className="flex h-full items-center justify-between px-2.5  lg:px-10">
        <MainNav />
        <nav className="flex items-center py-2 sm:mx-4 lg:mx-6">
          {showLoginButton && (
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
          {showRegisterButton && (
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
        </nav>
      </div>
    </header>
  );
}
