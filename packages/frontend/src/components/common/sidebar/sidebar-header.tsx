import React from 'react';
import Link from 'next/link';
import { Icons } from '@/components/common/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarHeaderProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export function SidebarHeader({
  isCollapsed,
  toggleSidebar
}: SidebarHeaderProps): JSX.Element {
  return (
    <div className="mt-2 flex items-center justify-between p-5">
      {!isCollapsed && (
        <Link
          href="/"
          className={cn(
            'ml-4 flex h-6 justify-start transition-opacity duration-300',
            isCollapsed ? 'opacity-0' : 'opacity-100'
          )}
        >
          <Icons.logo className="h-7 w-7" />
          <div className="ml-2 text-lg font-bold text-primary">Dahlia_</div>
        </Link>
      )}
      <Button
        variant="ghost"
        className={cn(
          'hover:bg-primary-50 h-10 w-10 p-0 transition-transform duration-300',
          isCollapsed ? 'ml-1' : ''
        )}
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <Icons.expand className="h-6 w-6" />
        ) : (
          <Icons.collapse className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
}
