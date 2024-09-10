import { SubmitHandler, UseFormSetError } from 'react-hook-form';
import { ResetPasswordFormSchema } from '@/lib/validation/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const RESET_PASSWORD_URL = '/api/v1/auth/reset-password';

export const createOnSubmit = (
  setError: UseFormSetError<ResetPasswordFormSchema>,
  token: string | null,
  router: ReturnType<typeof useRouter>
): SubmitHandler<ResetPasswordFormSchema> => {
  return async (data: ResetPasswordFormSchema) => {
    const { password, confirmPassword } = data;

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match'
      });
      toast.error('Passwords do not match');
      return;
    }

    // Ensure token is present
    if (!token) {
      setError('password', {
        type: 'manual',
        message: 'Invalid or missing token'
      });
      toast.error('Invalid or missing token');
      return;
    }

    try {
      // Make API request to reset password
      const response = await fetch(RESET_PASSWORD_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token,
          password
        })
      });

      const result = await response.json();

      // Handle API errors
      if (!response.ok) {
        if (result.errors) {
          // Set errors for individual fields
          Object.keys(result.errors).forEach((field) => {
            setError(field as keyof ResetPasswordFormSchema, {
              type: 'manual',
              message: result.errors[field]
            });
          });
        } else {
          setError('password', {
            type: 'manual',
            message: result.message || 'Failed to reset the password'
          });
        }
        toast.error(result.message || 'Failed to reset the password');
        return;
      }

      // Success message and redirection
      toast.success('Your password has been successfully reset');
      router.push('/auth/login');
    } catch (error) {
      console.error('Error during password reset:', error);
      setError('password', {
        type: 'manual',
        message: 'An unexpected error occurred. Please try again.'
      });
      toast.error('An unexpected error occurred. Please try again.');
    }
  };
};
