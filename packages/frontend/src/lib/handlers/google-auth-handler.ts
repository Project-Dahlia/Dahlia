import { signIn } from 'next-auth/react';
import { UseFormSetError } from 'react-hook-form';
import { FormSchema } from '../validation/auth';
import { useRouter } from 'next/navigation';

export const handleGoogleSignIn = async (
  setError: UseFormSetError<FormSchema>,
  router: ReturnType<typeof useRouter>
) => {
  try {
    const result = await signIn('google', {
      callbackUrl: '/',
      redirect: false
    });

    console.log('result right after sign in with google', result);

    if (result?.error) {
      setError('root', {
        type: 'manual',
        message: result.error
      });
    } else {
      // Google sign-in successful, redirect to home page
      router.push('/');
    }
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    setError('root', {
      type: 'manual',
      message: 'Google sign-in failed. Please try again.'
    });
  }
};
