import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/app/page';

jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map">{children}</div>
  ),
  TileLayer: () => <div />,
  Marker: () => <div />,
  Popup: () => <div />
}));

describe('Home Component', () => {
  test('renders Home component without crashing', () => {
    render(<Home />);

    // Check if Map renders
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
