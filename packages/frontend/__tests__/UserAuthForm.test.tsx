import { render, screen } from '@testing-library/react';
import { UserAuthForm } from '@/components/user-auth-form';

const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname() {
    return mockUsePathname();
  }
}));

describe('Test the user auth form component', () => {
  beforeEach(() => {
    mockUsePathname.mockClear();
  });

  it('renders register form for /register path', () => {
    mockUsePathname.mockReturnValue('/register');
    render(<UserAuthForm />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Register/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Google/i })).toBeInTheDocument();
    expect(screen.queryByText('Forget Password?')).not.toBeInTheDocument();
  });

  it('renders login form for /login path', () => {
    mockUsePathname.mockReturnValue('/login');
    render(<UserAuthForm />);

    expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Google/i })).toBeInTheDocument();
    expect(screen.getByText('Forget Password?')).toBeInTheDocument();
  });
});
