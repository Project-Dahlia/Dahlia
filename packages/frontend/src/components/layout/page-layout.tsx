'use client';

import { useAuth } from '@/lib/hooks/use-auth';
import { Header } from '@/components/common/site-header';
import { Sidebar } from '../common/sidebar/sidebar';
import { useCollapse } from '@/context/collapse-context';
import Search from '../search/search';
import { ParkingCardWrapper } from '../common/parking-card/parkcard-wrapper';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const { isCollapsed, setIsCollapsed } = useCollapse();
  const { isAuthenticated, isLoading } = useAuth();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <div>{children}</div>
      </>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar with z-index to ensure it's above other elements */}
      <div className={`relative z-20`}>
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>

      {/* Main content area */}
      <div className="relative z-10 flex-auto bg-gray-100">
        <Search isCollapsed={isCollapsed} />
        {children}
      </div>
      {/* Right-side parking card */}
      <div className="z-10 h-full w-[270px] bg-white">
        <ParkingCardWrapper />
      </div>
    </div>
  );
}
