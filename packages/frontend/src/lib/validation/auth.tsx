import { z } from 'zod';

const required_error = 'This field cannot be blank.';

export const userAuthSchema = z.object({
  name: z
    .string({ required_error: 'Name is required for registration.' })
    .regex(/^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/i, 'Only letters are allowed.')
    .min(1, { message: required_error })
    .optional(),
  email: z
    .string({ required_error: 'Email is required for registration.' })
    .min(1, { message: required_error })
    .email({ message: 'Please provide a valid email.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' })
});

export const changePasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

export type ChangePasswordFormSchema = z.infer<typeof changePasswordSchema>;

export type FormSchema = z.infer<typeof userAuthSchema>;
