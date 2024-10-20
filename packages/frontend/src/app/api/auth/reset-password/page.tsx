import { Metadata } from 'next';
import Link from 'next/link';
import { UserAuthForm } from '@/components/auth/user-auth-form';
import { Logo } from '@/components/common/logo';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your password by entering your email below.'
};

export default function ResetPassword() {
  return (
    <div className="reset-container container my-10 flex flex-col items-center justify-center">
      <div className="reset-card min-h-[636px] w-full rounded-lg border bg-white py-14 md:max-w-md">
        <div className="reset-content mx-auto flex w-full flex-col justify-center space-y-10 sm:w-[350px]">
          <header className="reset-header flex flex-col space-y-5 text-center">
            <Logo className="mx-auto h-10 w-24 object-contain" />
            <h1 className="font-subheading text-2xl font-semibold tracking-tight">
              Forget Password
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter password reset email below
            </p>
          </header>
          <UserAuthForm />
          <div className="reset-actions bottom-10 flex flex-col pt-40 text-center text-sm text-muted-foreground">
            <span>
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
