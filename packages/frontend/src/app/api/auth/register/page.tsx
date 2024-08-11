import { Metadata } from 'next';
import Link from 'next/link';
import { UserAuthForm } from '@/components/auth/user-auth-form';
import Image from 'next/image';
import Logo from '@/../public/logo.svg';

export const metadata: Metadata = {
  title: 'Register your account',
  description: 'Join our community and unlock exclusive features!'
};

export default function Register() {
  return (
    <div className="register-container container my-10 flex flex-col items-center justify-center">
      <div className="register-card h-auto w-full rounded-lg border bg-white py-8 md:max-w-md">
        <div className="register-content w-ful mx-auto flex flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="register-header flex flex-col space-y-5 text-center">
            <Image
              src={Logo}
              alt="logo"
              className="mx-auto h-10 w-24 object-contain"
            />
            <h1 className="font-subheading text-2xl font-semibold tracking-tight">
              Create an Account
            </h1>
            <p className="px-12 text-sm text-muted-foreground">
              Enter your email and password below to create your account
            </p>
          </div>
          <UserAuthForm />
          <div className="login-actions flex flex-col gap-4 text-center text-sm text-muted-foreground">
            <span className="px-5">
              Already have an account? Click here to{' '}
              <Link
                href="/api/auth/login"
                className="hover:text-brand text-blue-600 underline underline-offset-4"
              >
                Login
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
