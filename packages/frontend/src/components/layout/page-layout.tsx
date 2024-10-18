'use client';

import { useAuth } from '@/lib/hooks/use-auth';
import { Header } from '@/components/common/site-header';
import { Sidebar } from '../common/sidebar/sidebar';
import { useCollapse } from '@/context/collapse-context';
import Search from '../search/search';
import { ParkingCardWrapper } from '../common/parking-card/parkcard-wrapper';

export function PageLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed, setIsCollapsed } = useCollapse();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {!isAuthenticated && <Header />}
      {isAuthenticated && (
        <div className="flex h-screen">
          <Sidebar toggleSidebar={toggleSidebar} />
          <div className="relative flex-auto overflow-hidden">
            <Search isCollapsed={isCollapsed} />
            {children}
          </div>
          <div className="h-full w-[270px] bg-white">
            <ParkingCardWrapper />
          </div>
        </div>
      )}
      {!isAuthenticated && <div>{children}</div>}
    </>
  );
}
