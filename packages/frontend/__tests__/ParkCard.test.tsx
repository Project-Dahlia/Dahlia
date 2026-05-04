import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ParkCard } from '@/components/common/parking-card/parkcard';

describe('ParkCard', () => {
  const defaultProps = {
    title: 'City Parking',
    spaces: 10,
    price: 5,
    duration: '1 hour',
    timeToDestination: '3'
  };

  it('renders the title', () => {
    render(<ParkCard {...defaultProps} />);
    expect(screen.getByText('City Parking')).toBeInTheDocument();
  });

  it('renders the number of spaces', () => {
    render(<ParkCard {...defaultProps} />);
    expect(screen.getByText('10 spaces')).toBeInTheDocument();
  });

  it('renders the price', () => {
    render(<ParkCard {...defaultProps} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders the duration', () => {
    render(<ParkCard {...defaultProps} />);
    expect(screen.getByText('1 hour')).toBeInTheDocument();
  });

  it('renders the time to destination', () => {
    render(<ParkCard {...defaultProps} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders "to destination" label', () => {
    render(<ParkCard {...defaultProps} />);
    expect(screen.getByText('to destination')).toBeInTheDocument();
  });

  it('renders "minutes" label', () => {
    render(<ParkCard {...defaultProps} />);
    expect(screen.getByText('minutes')).toBeInTheDocument();
  });

  it('renders footer icons when provided', () => {
    const footerIcons = [
      <span key="1" data-testid="icon-1">Icon1</span>,
      <span key="2" data-testid="icon-2">Icon2</span>
    ];
    render(<ParkCard {...defaultProps} footerIcons={footerIcons} />);

    expect(screen.getByTestId('icon-1')).toBeInTheDocument();
    expect(screen.getByTestId('icon-2')).toBeInTheDocument();
  });

  it('renders an empty footer placeholder when no footerIcons are provided', () => {
    const { container } = render(<ParkCard {...defaultProps} />);
    // When no icons, an empty div placeholder is rendered
    const footer = container.querySelector('.h-4.w-full');
    expect(footer).toBeInTheDocument();
  });

  it('renders an empty footer placeholder when footerIcons is an empty array', () => {
    const { container } = render(<ParkCard {...defaultProps} footerIcons={[]} />);
    const footer = container.querySelector('.h-4.w-full');
    expect(footer).toBeInTheDocument();
  });

  it('renders with different prop values correctly', () => {
    render(
      <ParkCard
        title="Downtown Garage"
        spaces={25}
        price={15}
        duration="2 hours"
        timeToDestination="8"
      />
    );
    expect(screen.getByText('Downtown Garage')).toBeInTheDocument();
    expect(screen.getByText('25 spaces')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('2 hours')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
  });
});
