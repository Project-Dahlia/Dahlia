import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/app/page';
import { getServerSession } from 'next-auth';

// Mock next-auth
jest.mock('next-auth', () => ({
  getServerSession: jest.fn()
}));

describe('Home', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders "Not logged in" when there is no session', async () => {
    (getServerSession as jest.Mock).mockResolvedValue(null);

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Not logged in')).toBeInTheDocument();
    });
  });

  it('renders the user name when there is a session', async () => {
    const mockSession = {
      user: {
        name: 'Test User'
      }
    };
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Logged in as Test User')).toBeInTheDocument();
    });
  });
});
