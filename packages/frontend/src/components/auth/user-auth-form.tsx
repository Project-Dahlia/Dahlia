'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/common/icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { userAuthSchema, FormSchema } from '@/lib/validation/auth';
import { createOnSubmit } from '@/lib/handlers/auth-handler';
import { handleGoogleSignIn } from '@/lib/handlers/google-auth-handler';

export function UserAuthForm() {
  const pathName = usePathname();
  const isRegister = pathName === '/api/auth/register';
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormSchema>({
    resolver: zodResolver(userAuthSchema)
  });

  const onSubmit = createOnSubmit(setError, isRegister, router);

  return (
    <div className={cn('grid gap-6')}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                className={`border bg-transparent text-muted-foreground ${
                  errors.name && 'border-red-500'
                } outline-none focus:ring-0`}
                {...register('name')}
              />
              {errors?.name && (
                <p className="px-1 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
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
              className={`border bg-transparent text-muted-foreground ${
                errors.email && 'border-red-500'
              } outline-none focus:ring-0`}
              {...register('email')}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
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
              className={`border bg-transparent text-muted-foreground ${
                errors.password && 'border-red-500'
              } outline-none focus:ring-0`}
              {...register('password')}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          {!isRegister && (
            <Link href="#" className="text-end text-sm text-blue-600">
              Forget Password?
            </Link>
          )}
          <button type="submit" className={cn(buttonVariants(), 'bg-black')}>
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
        onClick={() => handleGoogleSignIn(setError, router)}
      >
        <Icons.google className="mr-2 h-6 w-6" />
        Google
      </button>
    </div>
  );
}
