// import { render, screen } from '@testing-library/react';
// import { UserAuthForm } from '@/components/user-auth-form';

// const mockUsePathname = jest.fn();

// jest.mock('next/navigation', () => ({
//   usePathname() {
//     return mockUsePathname();
//   }
// }));

// describe('Test the user auth form component', () => {
//   beforeEach(() => {
//     mockUsePathname.mockClear();
//   });

//   it('renders register form for /register path', () => {
//     mockUsePathname.mockReturnValue('/api/auth/register');
//     render(<UserAuthForm />);

//     expect(screen.getByLabelText('Name')).toBeInTheDocument();
//     expect(screen.getByLabelText('Email')).toBeInTheDocument();
//     expect(screen.getByLabelText('Password')).toBeInTheDocument();
//     expect(
//       screen.getByRole('button', { name: /Register/i })
//     ).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /Google/i })).toBeInTheDocument();
//     expect(screen.queryByText('Forget Password?')).not.toBeInTheDocument();
//   });

//   it('renders login form for /login path', () => {
//     mockUsePathname.mockReturnValue('/api/auth/login');
//     render(<UserAuthForm />);

//     expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
//     expect(screen.getByLabelText('Email')).toBeInTheDocument();
//     expect(screen.getByLabelText('Password')).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /Google/i })).toBeInTheDocument();
//     expect(screen.getByText('Forget Password?')).toBeInTheDocument();
//   });
// });

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserAuthForm } from '@/components/user-auth-form';
import { usePathname } from 'next/navigation';
import { signIn } from 'next-auth/react';

// Mock next-auth and next/router
jest.mock('next-auth/react', () => ({
  signIn: jest.fn()
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}));

describe('UserAuthForm', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders the login form by default', () => {
    render(<UserAuthForm />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders the registration form if pathname is /api/auth/register', () => {
    (usePathname as jest.Mock).mockReturnValue('/api/auth/register');
    render(<UserAuthForm />);
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('submits the form with email and password for login', async () => {
    render(<UserAuthForm />);
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' }
    });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        redirect: false,
        email: 'test@example.com',
        password: 'password'
      });
    });
  });

  it('submits the form with name, email, and password for registration', async () => {
    (usePathname as jest.Mock).mockReturnValue('/api/auth/register');
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

    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        redirect: false,
        email: 'test@example.com',
        password: 'password',
        name: 'Test User'
      });
    });
  });

  it('handles Google sign-in', async () => {
    render(<UserAuthForm />);
    fireEvent.click(screen.getByText('Google'));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('google');
    });
  });
});
