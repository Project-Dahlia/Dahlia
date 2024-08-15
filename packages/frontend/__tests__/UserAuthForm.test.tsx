import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserAuthForm } from '@/components/auth/user-auth-form';
import { usePathname, useRouter } from 'next/navigation';
import * as authHandlers from '@/lib/handlers/auth-handler';
import * as googleAuthHandlers from '@/lib/handlers/google-auth-handler';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn()
}));

jest.mock('@/lib/handlers/auth-handler', () => ({
  createOnSubmit: jest.fn()
}));

jest.mock('@/lib/handlers/google-auth-handler', () => ({
  handleGoogleSignIn: jest.fn()
}));

describe('UserAuthForm', () => {
  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders the login form by default', () => {
    render(<UserAuthForm />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('renders the registration form if pathname is /api/auth/register', () => {
    (usePathname as jest.Mock).mockReturnValue('/api/auth/register');
    render(<UserAuthForm />);
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Register' })
    ).toBeInTheDocument();
  });

  it('renders the reset password form if pathname is /api/auth/reset-password', () => {
    (usePathname as jest.Mock).mockReturnValue('/api/auth/reset-password');
    render(<UserAuthForm />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Password')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Request Password Reset Link' })
    ).toBeInTheDocument();
  });

  it('calls createOnSubmit with correct parameters for login', async () => {
    const mockOnSubmit = jest.fn();
    (authHandlers.createOnSubmit as jest.Mock).mockReturnValue(mockOnSubmit);

    render(<UserAuthForm />);
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(authHandlers.createOnSubmit).toHaveBeenCalledWith(
        expect.any(Function),
        false,
        mockRouter
      );
    });

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        {
          email: 'test@example.com',
          password: 'password'
        },
        expect.anything()
      );
    });
  });

  it('calls createOnSubmit with correct parameters for registration', async () => {
    (usePathname as jest.Mock).mockReturnValue('/api/auth/register');
    const mockOnSubmit = jest.fn();
    (authHandlers.createOnSubmit as jest.Mock).mockReturnValue(mockOnSubmit);

    render(<UserAuthForm />);
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Test User' }
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(authHandlers.createOnSubmit).toHaveBeenCalledWith(
        expect.any(Function),
        true,
        mockRouter
      );
    });

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password'
        },
        expect.anything()
      );
    });
  });

  it('handles Google sign-in', async () => {
    render(<UserAuthForm />);
    fireEvent.click(screen.getByRole('button', { name: 'Google' }));

    await waitFor(() => {
      expect(googleAuthHandlers.handleGoogleSignIn).toHaveBeenCalledWith(
        expect.any(Function),
        mockRouter
      );
    });
  });
});
