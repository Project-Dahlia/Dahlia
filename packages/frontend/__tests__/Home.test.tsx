import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/app/page';
import { useAuth } from '@/lib/hooks/use-auth'; // Adjust the import path as needed
import { CollapseProvider } from '@/context/collapse-context'; // Adjust the import path as needed

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

  const renderWithCollapseProvider = (ui: React.ReactElement) => {
    return render(<CollapseProvider>{ui}</CollapseProvider>);
  };

  it('renders "Loading..." when isLoading is true', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      isLoading: true,
      isAuthenticated: false,
      user: null
    });

    renderWithCollapseProvider(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('renders the Map component when not loading', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      isLoading: false,
      isAuthenticated: true,
      user: { name: 'Test User' }
    });

    renderWithCollapseProvider(<Home />);

    // Check if Map renders
    await waitFor(() => {
      expect(screen.getByTestId('map')).toBeInTheDocument();
    });
  });
});
