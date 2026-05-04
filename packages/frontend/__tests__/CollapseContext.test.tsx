import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CollapseProvider, useCollapse } from '@/context/collapse-context';

// Helper component to access the context value in tests
const CollapseConsumer = () => {
  const { isCollapsed, setIsCollapsed } = useCollapse();
  return (
    <div>
      <span data-testid="collapsed-value">{String(isCollapsed)}</span>
      <button onClick={() => setIsCollapsed(true)}>Collapse</button>
      <button onClick={() => setIsCollapsed(false)}>Expand</button>
    </div>
  );
};

describe('CollapseProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders children without crashing', () => {
    render(
      <CollapseProvider>
        <div data-testid="child">Hello</div>
      </CollapseProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('provides default isCollapsed value of false', () => {
    render(
      <CollapseProvider>
        <CollapseConsumer />
      </CollapseProvider>
    );
    expect(screen.getByTestId('collapsed-value')).toHaveTextContent('false');
  });

  it('reads initial state from localStorage when available', () => {
    localStorage.setItem('isCollapsed', JSON.stringify(true));

    render(
      <CollapseProvider>
        <CollapseConsumer />
      </CollapseProvider>
    );

    // After the useEffect reads from localStorage, the value should be true
    expect(screen.getByTestId('collapsed-value')).toHaveTextContent('true');
  });

  it('updates isCollapsed and persists to localStorage when setIsCollapsed is called', () => {
    render(
      <CollapseProvider>
        <CollapseConsumer />
      </CollapseProvider>
    );

    act(() => {
      screen.getByText('Collapse').click();
    });

    expect(screen.getByTestId('collapsed-value')).toHaveTextContent('true');
    expect(localStorage.getItem('isCollapsed')).toBe('true');
  });

  it('updates isCollapsed to false and persists to localStorage', () => {
    localStorage.setItem('isCollapsed', JSON.stringify(true));

    render(
      <CollapseProvider>
        <CollapseConsumer />
      </CollapseProvider>
    );

    act(() => {
      screen.getByText('Expand').click();
    });

    expect(screen.getByTestId('collapsed-value')).toHaveTextContent('false');
    expect(localStorage.getItem('isCollapsed')).toBe('false');
  });
});

describe('useCollapse', () => {
  it('throws an error when used outside of CollapseProvider', () => {
    // Suppress expected error output
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const ThrowingComponent = () => {
      useCollapse();
      return null;
    };

    expect(() => render(<ThrowingComponent />)).toThrow(
      'useCollapse must be used within a CollapseProvider'
    );

    consoleSpy.mockRestore();
  });
});
