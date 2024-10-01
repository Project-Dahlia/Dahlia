import { SubmitHandler, UseFormSetError } from 'react-hook-form';
import { RequestPasswordResetFormSchema } from '@/lib/validation/auth';
import { toast } from 'sonner';

// URL for backend password reset endpoint
const PASSWORD_RESET_URL = `http://localhost:3001/api/v1/auth/request-password-reset`;

export const createOnSubmit = (
  setError: UseFormSetError<RequestPasswordResetFormSchema>
): SubmitHandler<RequestPasswordResetFormSchema> => {
  return async (data: RequestPasswordResetFormSchema) => {
    try {
      // Make an API request to the backend to request a password reset
      const response = await fetch(PASSWORD_RESET_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: data.email // Sending the email as part of the request body
        })
      });

      const result = await response.json();

      // Check if the response was successful
      if (!response.ok) {
        setError('email', {
          type: 'manual',
          message: result.message || 'Failed to send password reset link'
        });
        toast.error(result.message || 'Failed to send password reset link');
        return;
      }

      // Success message
      toast.success(
        'Password reset link has been sent to your email. Please check your email and access the link to rest password'
      );
    } catch (error) {
      console.error('Error during password reset request:', error);
      setError('email', {
        type: 'manual',
        message: 'An unexpected error occurred. Please try again.'
      });
      toast.error('An unexpected error occurred. Please try again.');
    }
  };
};
