import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/app/page';

test('renders header with logo image', () => {
  render(<Home />);

  const header = screen.getByRole('banner');

  expect(header).toBeInTheDocument();
});
