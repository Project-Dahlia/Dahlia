import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/app/page';

describe('Home Component', () => {
  test('renders Home component without crashing', () => {
    render(<Home />);
    const header = screen.getByRole('banner');

    expect(header).toBeInTheDocument();
  });
});
