import { Metadata } from 'next';
import { ChangePasswordForm } from '@/components/change-password-form';
import Image from 'next/image';
import Logo from '@/../public/logo.svg';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Change Password',
  description: 'Change your password by entering the new password below.'
};

export default function ChangePassword() {
  return (
    <div className="change-password-container container my-10 flex flex-col items-center justify-center">
      <div className="change-password-card h-auto w-full rounded-lg border bg-white py-8 md:max-w-md">
        <div className="change-password-content w-ful mx-auto flex flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="change-password-header flex flex-col space-y-5 text-center">
            <Image
              src={Logo}
              alt="logo"
              className="mx-auto h-10 w-24 object-contain"
            />

            <h1 className="font-subheading text-2xl font-semibold tracking-tight">
              Change Password
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your new password below
            </p>
          </div>
          <ChangePasswordForm />
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
