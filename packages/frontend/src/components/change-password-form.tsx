'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
  changePasswordSchema,
  ChangePasswordFormSchema
} from '@/lib/validation/auth';
import { cn } from '@/lib/utils';

export function ChangePasswordForm() {
  const form = useForm<ChangePasswordFormSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = (data: ChangePasswordFormSchema) => {
    // handle form submission
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          control={form.control}
          name="password"
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
                    'border',
                    form.formState.errors.password && 'border-red-500'
                  )}
                  {...field}
                />
              </FormControl>
              {form.formState.errors.password && (
                <FormMessage>
                  <p className="text-xs text-red-600">
                    {form.formState.errors.password?.message}
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
                    'border',
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
          Change Password
        </Button>
      </form>
    </Form>
  );
}
