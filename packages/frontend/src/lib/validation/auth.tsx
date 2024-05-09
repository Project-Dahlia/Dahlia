import { z } from 'zod';

const required_error = 'This field cannot be blank.';

export const userAuthSchema = z.object({
  name: z
    .string({ required_error })
    .regex(/^[A-Za-z]+$/i, 'Only letters are allowed.')
    .min(1, {
      message: required_error
    }),
  email: z
    .string({ required_error })
    .min(1, { message: required_error })
    .email({
      message: 'Please provide a valid email.'
    }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  })
});
