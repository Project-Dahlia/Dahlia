import { signIn, SignInOptions } from 'next-auth/react';
import { SubmitHandler, UseFormSetError } from 'react-hook-form';
import { SignInPayload, RegisterPayload } from '@/types';
import { FormSchema } from '@/lib/validation/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const createOnSubmit = (
  setError: UseFormSetError<FormSchema>,
  isRegister: boolean,
  router: ReturnType<typeof useRouter>
): SubmitHandler<FormSchema> => {
  return async (data: FormSchema) => {
    try {
      // Create the base payload
      const basePayload: SignInPayload = {
        redirect: false,
        callbackUrl: '/api/auth/session',
        email: data.email,
        password: data.password
      };

      // Conditionally extend the payload for registration
      const payload: SignInPayload | RegisterPayload = isRegister
        ? { ...basePayload, name: data.name }
        : basePayload;

      // Call signIn with the constructed payload
      const result = await signIn('credentials', payload as SignInOptions);

      // Check if signIn was successful
      if (!result) {
        throw new Error('Sign in failed');
      }

      if (result?.error) {
        setError('root', {
          type: 'manual',
          message: result.error
        });
        toast.error(result.error);
      } else {
        // Save user profile to localStorage
        if (result?.ok) {
          router.push('/');
        }
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setError('root', {
        type: 'manual',
        message: 'An unexpected error occurred. Please try again.'
      });
      toast.error('An unexpected error occurred. Please try again.');
    }
  };
};
