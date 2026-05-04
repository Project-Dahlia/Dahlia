import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from '@/components/search/search';

// ResizeObserver is not available in jsdom; mock it for Radix UI components
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('Search', () => {
  it('renders the search input', () => {
    render(<Search isCollapsed={false} />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('does not show the filter panel initially', () => {
    render(<Search isCollapsed={false} />);
    expect(screen.queryByText('Parking Type')).not.toBeInTheDocument();
    expect(screen.queryByText('Distance')).not.toBeInTheDocument();
  });

  it('shows the filter panel when the filter button is clicked', () => {
    render(<Search isCollapsed={false} />);

    // The filter icon button (second button)
    const buttons = screen.getAllByRole('button');
    const filterButton = buttons[1];
    fireEvent.click(filterButton);

    expect(screen.getByText('Parking Type')).toBeInTheDocument();
    expect(screen.getByText('Distance')).toBeInTheDocument();
  });

  it('shows parking type toggle options when filter is open', () => {
    render(<Search isCollapsed={false} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);

    expect(screen.getByText('Lot')).toBeInTheDocument();
    expect(screen.getByText('Garage')).toBeInTheDocument();
    expect(screen.getByText('Street')).toBeInTheDocument();
  });

  it('shows the Advanced Search button when filter is open', () => {
    render(<Search isCollapsed={false} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);

    expect(screen.getByText('Advanced Search')).toBeInTheDocument();
  });

  it('hides the filter panel when the cancel button is clicked', () => {
    render(<Search isCollapsed={false} />);
    const buttons = screen.getAllByRole('button');
    const filterButton = buttons[1];

    // Open filter panel
    fireEvent.click(filterButton);
    expect(screen.getByText('Parking Type')).toBeInTheDocument();

    // Close filter panel using the same button (now showing cancel icon)
    fireEvent.click(filterButton);
    expect(screen.queryByText('Parking Type')).not.toBeInTheDocument();
  });

  it('renders correctly when sidebar is collapsed', () => {
    render(<Search isCollapsed={true} />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });
});
