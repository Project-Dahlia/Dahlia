'use client';

import { useAuth } from '@/lib/hooks/use-auth';
import { Header } from '@/components/common/site-header';
import { Sidebar } from '../common/sidebar/sidebar';
import { useCollapse } from '@/context/collapse-context';
import Search from '../search/search';

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
          <div className="relative flex flex-row">
            <Search isCollapsed={isCollapsed} />
            <div>{children}</div>
          </div>
        </div>
      )}
      {!isAuthenticated && <div>{children}</div>}
    </>
  );
}
