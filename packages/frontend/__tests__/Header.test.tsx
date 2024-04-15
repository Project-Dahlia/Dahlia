import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/site-header';
import { MainNav } from '@/components/main-nav';

describe('Header Component', () => {
  it('renders header with expected structure', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    const container = screen.getByTestId('header-container');
    expect(container).toBeInTheDocument();
  });

  it('renders login and register buttons', () => {
    render(<Header />);

    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();

    const registerButton = screen.getByText('Register');
    expect(registerButton).toBeInTheDocument();
  });

  it('renders MainNav component', () => {
    render(<MainNav />);

    const mainNav = screen.getByRole('navigation');
    expect(mainNav).toBeInTheDocument();
  });
});
