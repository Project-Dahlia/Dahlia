'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { sidebarRoutes } from '@/config/site';
import { SidebarHeader } from './sidebar-header';
import { SidebarNavigation } from './sidebar-navigation';
import { SidebarFooter } from './sidebar-footer';
import { cn } from '@/lib/utils';
import { SidebarProps } from '@/types';
import { useCollapse } from '@/context/collapse-context';

export function Sidebar({ toggleSidebar }: SidebarProps): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'light' | 'dark'>('light');
  const { isCollapsed } = useCollapse();

  return (
    <div
      className={cn(
        'transition-width fixed left-0 top-0 flex h-full flex-col bg-white  text-gray-700 duration-300',
        isCollapsed ? 'w-[87px]' : 'w-[288px]'
      )}
    >
      <SidebarHeader isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <SidebarNavigation
        routes={sidebarRoutes}
        pathname={pathname}
        isCollapsed={isCollapsed}
      />
      <SidebarFooter
        isCollapsed={isCollapsed}
        firstName={'John'}
        lastName={'Doe'}
        email={'johndoe@mail.com'}
        name={''}
        router={router}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
