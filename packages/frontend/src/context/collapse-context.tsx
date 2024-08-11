'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react';

// Define the context
const CollapseContext = createContext<
  | {
      isCollapsed: boolean;
      setIsCollapsed: (collapsed: boolean) => void;
    }
  | undefined
>(undefined);

// Provider component
export const CollapseProvider = ({ children }: { children: ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  useEffect(() => {
    const storedCollapsed = localStorage.getItem('isCollapsed');
    if (storedCollapsed) {
      setIsCollapsed(JSON.parse(storedCollapsed));
    }
  }, [setIsCollapsed]);

  useEffect(() => {
    localStorage.setItem('isCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  return (
    <CollapseContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </CollapseContext.Provider>
  );
};

// Custom hook to use the CollapseContext
export const useCollapse = () => {
  const context = useContext(CollapseContext);
  if (!context) {
    throw new Error('useCollapse must be used within a CollapseProvider');
  }
  return context;
};
