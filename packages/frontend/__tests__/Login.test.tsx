import { fireEvent, render, screen } from '@testing-library/react';
import Login from '@/app/(auth)/login/page';

describe('Test the login component', () => {
  it('render the login form with two button', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /Login/i });
    const googleButton = screen.getByRole('button', { name: /Google/i });
    expect(submitButton).toBeInTheDocument();
    expect(googleButton).toBeInTheDocument();
  });

  it('email input field should accept email', () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'example@gmail.com' } });
    expect(emailInput.value).toBe('example@gmail.com');
  });

  it('password input should have type password', () => {
    render(<Login />);
    const passwordInput = screen.getByPlaceholderText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
