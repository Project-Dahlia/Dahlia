import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/common/site-header';
import { usePathname } from 'next/navigation';
import { CollapseProvider } from '@/context/collapse-context'; // Adjust the import path as needed

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}));

describe('Header Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  const renderWithCollapseProvider = (ui: React.ReactElement) => {
    return render(<CollapseProvider>{ui}</CollapseProvider>);
  };

  it('renders header with expected structure', () => {
    renderWithCollapseProvider(<Header />);

    const header = screen.getByTestId('header-container');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass(
      'sticky top-0 h-14 bg-white backdrop-blur-2xl sm:flex sm:justify-between'
    );
  });

  it('renders login and register buttons when not on their respective pages', () => {
    renderWithCollapseProvider(<Header />);

    const loginButton = screen.getByRole('link', { name: /login/i });
    expect(loginButton).toBeInTheDocument();

    const registerButton = screen.getByRole('link', { name: /register/i });
    expect(registerButton).toBeInTheDocument();
  });

  it('does not render login button on login page', () => {
    (usePathname as jest.Mock).mockReturnValue('/api/auth/login');
    renderWithCollapseProvider(<Header />);

    expect(
      screen.queryByRole('link', { name: /login/i })
    ).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
  });

  it('does not render register button on register page', () => {
    (usePathname as jest.Mock).mockReturnValue('/api/auth/register');
    renderWithCollapseProvider(<Header />);

    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /register/i })
    ).not.toBeInTheDocument();
  });

  it('renders MainNav component', () => {
    renderWithCollapseProvider(<Header />);

    // Assuming MainNav renders a nav element
    const mainNav = screen.getByTestId('main-nav');
    expect(mainNav).toBeInTheDocument();
  });
});
