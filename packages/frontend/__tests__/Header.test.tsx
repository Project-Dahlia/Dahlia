import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/site-header';
import { usePathname } from 'next/navigation';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}));

// Mock the next-auth/react module
jest.mock('next-auth/react', () => ({
  signOut: jest.fn()
}));

describe('Header Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders header with expected structure', () => {
    render(<Header isAuthenticated={false} />);

    const header = screen.getByTestId('header-container');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass(
      'sticky inset-x-0 top-0 z-50 h-14 w-full border-b border-border bg-white px-4 backdrop-blur-lg'
    );
  });

  it('renders login and register buttons when not authenticated', () => {
    render(<Header isAuthenticated={false} />);

    const loginButton = screen.getByRole('link', { name: /login/i });
    expect(loginButton).toBeInTheDocument();

    const registerButton = screen.getByRole('link', { name: /register/i });
    expect(registerButton).toBeInTheDocument();
  });

  it('renders logout button when authenticated', () => {
    render(<Header isAuthenticated={true} />);

    const logoutButton = screen.getByRole('link', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();

    expect(
      screen.queryByRole('link', { name: /login/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /register/i })
    ).not.toBeInTheDocument();
  });

  it('does not render login button on login page', () => {
    (usePathname as jest.Mock).mockReturnValue('/api/auth/login');
    render(<Header isAuthenticated={false} />);

    expect(
      screen.queryByRole('link', { name: /login/i })
    ).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
  });

  it('does not render register button on register page', () => {
    (usePathname as jest.Mock).mockReturnValue('/api/auth/register');
    render(<Header isAuthenticated={false} />);

    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /register/i })
    ).not.toBeInTheDocument();
  });

  it('renders MainNav component', () => {
    render(<Header isAuthenticated={false} />);

    // Assuming MainNav renders a nav element
    const mainNav = screen.getAllByRole('navigation')[0];
    expect(mainNav).toBeInTheDocument();
  });
});
