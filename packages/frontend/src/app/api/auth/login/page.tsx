import { Metadata } from 'next';
import Link from 'next/link';
import { UserAuthForm } from '@/components/auth/user-auth-form';
import { Logo } from '@/components/common/logo';
import React from 'react';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your account securely and easily.'
};

export default function Login() {
  return (
    <div className="login-container container my-10 flex flex-col items-center justify-center">
      <div className="login-card h-auto w-full rounded-lg border bg-white py-8 md:max-w-md">
        <div className="login-content w-ful mx-auto flex flex-col justify-center space-y-6 sm:w-[350px]">
          <header className="login-header flex flex-col space-y-5 text-center">
            <Logo className="mx-auto h-10 w-24 object-contain" />
            <h1 className="font-subheading text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email to sign in to your account
            </p>
          </header>
          <UserAuthForm />
          <div className="login-actions flex flex-col gap-4 text-center text-sm text-muted-foreground">
            <span className="px-5">
              Don&apos;t have an account? Click here to{' '}
              <Link
                href="/api/auth/register"
                className="hover:text-brand text-blue-600 underline underline-offset-4"
              >
                Register
              </Link>
            </span>
            <span className="px-12">
              By clicking continue, you agree to our{' '}
              <Link href="#" className="underline underline-offset-4">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="#" className="underline underline-offset-4">
                Privacy Policy
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
