import * as React from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';
import Link from 'next/link';

export function UserAuthForm() {
  return (
    <div className={cn('grid gap-6')}>
      <form>
        <div className="grid gap-5">
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
          <Link href="#" className="text-end text-sm text-blue-600">
            Forget Password?
          </Link>
          <button className={cn(buttonVariants(), 'bg-black')}>Login</button>
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
