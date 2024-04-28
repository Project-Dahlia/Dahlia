'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function UserAuthForm() {
  const pathName = usePathname();
  const isRegister = pathName === '/register';

  return (
    <div className={cn('grid gap-6')}>
      <form>
        <div className="grid gap-5">
          {isRegister && (
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Name"
                type="text"
                autoComplete="name"
                autoCorrect="off"
                className="bg-transparent text-muted-foreground outline-none focus:ring-0"
              />
            </div>
          )}
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="bg-transparent text-muted-foreground outline-none focus:ring-0"
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              className="bg-transparent text-muted-foreground outline-none"
            />
          </div>
          {!isRegister && (
            <Link href="#" className="text-end text-sm text-blue-600">
              Forget Password?
            </Link>
          )}
          <button className={cn(buttonVariants(), 'bg-black')}>
            {isRegister ? 'Register' : 'Login'}
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="mx-7 w-full border border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'bg-transparent text-lg font-bold'
        )}
      >
        <Icons.google className="mr-2 h-6 w-6" />
        Google
      </button>
    </div>
  );
}
