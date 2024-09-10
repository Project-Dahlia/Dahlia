'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

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
  requestPasswordResetSchema,
  RequestPasswordResetFormSchema
} from '@/lib/validation/auth';
import { cn } from '@/lib/utils';
import { createOnSubmit } from '@/services/request-password-reset';

export function RequestPasswordResetForm() {
  const router = useRouter();

  // Initialize the form with React Hook Form and Zod resolver
  const form = useForm<RequestPasswordResetFormSchema>({
    resolver: zodResolver(requestPasswordResetSchema), // Zod schema for request password reset
    defaultValues: {
      email: ''
    }
  });

  const { handleSubmit, setError } = form;

  // On submit handler
  const onSubmit = createOnSubmit(setError, router);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  className={cn(
                    'border bg-transparent text-muted-foreground',
                    form.formState.errors.email && 'border-red-500'
                  )}
                  {...field}
                />
              </FormControl>
              {form.formState.errors.email && (
                <FormMessage>
                  <p className="text-xs text-red-600">
                    {form.formState.errors.email?.message}
                  </p>
                </FormMessage>
              )}
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="bg-black">
          Request Password Reset Link
        </Button>
      </form>
    </Form>
  );
}
