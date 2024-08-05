import { Metadata } from 'next';
import Link from 'next/link';
import { UserAuthForm } from '@/components/user-auth-form';
import Image from 'next/image';
import Logo from '@/../public/logo.svg';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your password by entering your email below.'
};

export default function ResetPassword() {
  return (
    <div className="reset-container container my-10 flex flex-col items-center justify-center">
      <div className="reset-card h-auto w-full min-w-[300px] max-w-lg rounded-lg border bg-white py-20 md:max-w-md">
        <div className="reset-content mx-auto box-border flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="reset-header flex flex-col space-y-10 text-center ">
            <Image
              src={Logo}
              alt="logo"
              className="mx-auto h-10 w-24 object-contain"
            />
            <div className="space-y-5">
              <h1 className="font-subheading text-2xl font-semibold tracking-tight">
                Forget Password
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter password reset email below
              </p>
            </div>
          </div>
          <UserAuthForm />
          <div className="reset-actions flex flex-col gap-4 text-center text-sm text-muted-foreground">
            <span className="px-5">
              Go back to{' '}
              <Link
                href="/login"
                className="hover:text-brand text-blue-600 underline underline-offset-4"
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
