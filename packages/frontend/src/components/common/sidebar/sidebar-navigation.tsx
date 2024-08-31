import React from 'react';
import { Separator } from '@/components/ui/separator';
import { SidebarNavigationItem } from './sidebar-navigation-item';
import { SidebarItem } from '@/types';

interface SidebarNavigationProps {
  routes: SidebarItem[];
  pathname: string;
  isCollapsed: boolean;
}

export function SidebarNavigation({
  routes,
  pathname,
  isCollapsed
}: SidebarNavigationProps): JSX.Element {
  const isPath = (path: string): boolean =>
    pathname === path || pathname.startsWith(path);

  return (
    <nav className="flex-1 overflow-y-auto">
      <ul className="space-y-4 px-5">
        <Separator className="border-gray-100" />
        {routes.map((route, i) => (
          <SidebarNavigationItem
            key={i}
            route={route}
            isPath={isPath}
            isCollapsed={isCollapsed}
          />
        ))}
        <Separator className="border-gray-100" />
      </ul>
    </nav>
  );
}
