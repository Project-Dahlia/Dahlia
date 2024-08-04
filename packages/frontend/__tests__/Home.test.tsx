import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/app/page';
import { useAuth } from '@/lib/hooks/use-auth'; // Adjust the import path as needed

jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map">{children}</div>
  ),
  TileLayer: () => <div />,
  Marker: () => <div />,
  Popup: () => <div />
}));

// Mock useAuth hook
jest.mock('@/lib/hooks/use-auth', () => ({
  useAuth: jest.fn()
}));

describe('Home', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders "Loading..." when isLoading is true', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      isLoading: true,
      isAuthenticated: false,
      user: null
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('renders "Not logged in" when not authenticated', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      isLoading: false,
      isAuthenticated: false,
      user: null
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Not logged in')).toBeInTheDocument();
    });
  });

  it('renders the user name when authenticated', async () => {
    const mockUser = {
      name: 'Test User'
    };
    (useAuth as jest.Mock).mockReturnValue({
      isLoading: false,
      isAuthenticated: true,
      user: mockUser
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Logged in as Test User')).toBeInTheDocument();
    });

    // Check if Map renders
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
