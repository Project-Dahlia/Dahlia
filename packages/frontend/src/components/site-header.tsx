'use client';
import { Button } from './ui/button';
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
      className="sticky top-0 h-14 bg-white backdrop-blur-2xl sm:flex sm:justify-between"
      data-testid="header-container"
    >
      <div className="container flex items-center justify-between">
        <MainNav />
        <nav className="mx-4 flex items-center gap-6 py-2">
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
              className="px-4 font-bold"
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
