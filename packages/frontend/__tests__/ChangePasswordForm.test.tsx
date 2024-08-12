import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChangePasswordForm } from '@/components/change-password-form';

describe('ChangePasswordForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the change password form correctly', () => {
    render(<ChangePasswordForm />);

    expect(screen.getByPlaceholderText('New Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Change Password' })
    ).toBeInTheDocument();
  });

  it('shows validation errors when the form is submitted with empty fields', async () => {
    render(<ChangePasswordForm />);

    fireEvent.click(screen.getByRole('button', { name: 'Change Password' }));

    expect(
      await screen.findByText(/Password must be at least 6 characters/i)
    ).toBeInTheDocument();
  });

  it('shows an error when the passwords do not match', async () => {
    render(<ChangePasswordForm />);

    fireEvent.change(screen.getByPlaceholderText('New Password'), {
      target: { value: 'password123' }
    });

    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password456' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Change Password' }));

    await waitFor(() => {
      expect(screen.getByText(/Passwords don't match/i)).toBeInTheDocument();
    });
  });

  it('submits the form with valid data', async () => {
    const mockSubmit = jest.fn();

    jest.spyOn(console, 'log').mockImplementation(mockSubmit);

    render(<ChangePasswordForm />);

    fireEvent.change(screen.getByPlaceholderText('New Password'), {
      target: { value: 'password123' }
    });

    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Change Password' }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        password: 'password123',
        confirmPassword: 'password123'
      });
    });
  });
});
