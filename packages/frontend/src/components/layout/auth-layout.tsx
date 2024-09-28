'use client';

import { useAuth } from '@/lib/hooks/use-auth';
import { Header } from '@/components/common/site-header';
import { Sidebar } from '../common/sidebar/sidebar';
import { useCollapse } from '@/context/collapse-context';
import { ParkingCardWrapper } from '../common/parking-card/parkcard-wrapper';

export function AuthLayout({ children }: { children: React.ReactNode }) {
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
          <div className="flex-auto overflow-hidden">{children}</div>
          <div className="h-full w-[270px] bg-white">
            <ParkingCardWrapper />
          </div>
        </div>
      )}
      {!isAuthenticated && <div>{children}</div>}
    </>
  );
}
