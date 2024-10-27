import React from 'react';
import Link from 'next/link';
import { Icons } from '@/components/common/icons';
import { cn } from '@/lib/utils';
import { getIconClassNames } from '@/lib/components/sidebar-helpers';
import { SidebarItem } from '@/types';

interface SidebarNavigationItemProps {
  route: SidebarItem;
  isPath: (path: string) => boolean;
  isCollapsed: boolean;
}

export function SidebarNavigationItem({
  route,
  isPath,
  isCollapsed
}: SidebarNavigationItemProps): JSX.Element {
  const Icon = Icons[route.icon as keyof typeof Icons];

  return (
    <li>
      <Link
        href={route.href}
        className={cn(
          'text-md flex h-12 items-center rounded-md font-medium transition-colors',
          isCollapsed ? 'justify-center' : 'px-4 py-2',
          isPath(route.href)
            ? 'hover:none bg-primary font-bold'
            : 'hover:bg-gray-100'
        )}
      >
        <Icon
          className={cn(getIconClassNames(route.href, isCollapsed, isPath))}
        />
        {!isCollapsed && (
          <div className="ml-[10px] flex w-full items-center">
            <span>{route.label}</span>
          </div>
        )}
      </Link>
    </li>
  );
}
