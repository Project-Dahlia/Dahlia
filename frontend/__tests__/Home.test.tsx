import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/app/page';

describe('Home Component', () => {
  test('renders Home component without crashing', () => {
    render(<Home />);
    const linkElement = screen.getByText(/Dahlia/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('renders buttons with correct variants', () => {
    render(<Home />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(5);
  });
});
