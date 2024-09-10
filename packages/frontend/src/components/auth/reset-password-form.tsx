'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation'; // Import for token retrieval

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  resetPasswordSchema,
  ResetPasswordFormSchema
} from '@/lib/validation/auth';
import { cn } from '@/lib/utils';
import { createOnSubmit } from '@/services/reset-password'; // Import your submit logic

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams(); // To get token from URL
  const token = searchParams.get('token'); // Extract the token from query string

  const form = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: ''
    }
  });

  const { handleSubmit, setError } = form;

  // Pass the token to the submit logic
  const onSubmit = createOnSubmit(setError, token, router);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="new-password"
                  placeholder="New Password"
                  type="password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  className={cn(
                    'border bg-transparent text-muted-foreground',
                    form.formState.errors.newPassword && 'border-red-500'
                  )}
                  {...field}
                />
              </FormControl>
              {form.formState.errors.newPassword && (
                <FormMessage>
                  <p className="text-xs text-red-600">
                    {form.formState.errors.newPassword?.message}
                  </p>
                </FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="confirm-password"
                  placeholder="Confirm Password"
                  type="password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  className={cn(
                    'border bg-transparent text-muted-foreground',
                    form.formState.errors.confirmPassword && 'border-red-500'
                  )}
                  {...field}
                />
              </FormControl>
              {form.formState.errors.confirmPassword && (
                <FormMessage>
                  <p className="text-xs text-red-600">
                    {form.formState.errors.confirmPassword?.message}
                  </p>
                </FormMessage>
              )}
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-black">
          Reset Password
        </Button>
      </form>
    </Form>
  );
}
