import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toggle } from '@/components/ui/toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getInitials } from '@/lib/components/sidebar-helpers';
import { Icons } from '@/components/common/icons';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface SidebarFooterProps {
  isCollapsed: boolean;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  name: string | null;
  router: ReturnType<typeof useRouter>;
  activeTab: 'light' | 'dark';
  setActiveTab: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

export function SidebarFooter({
  isCollapsed,
  firstName,
  lastName,
  email,
  name,
  activeTab,
  setActiveTab
}: SidebarFooterProps): JSX.Element {
  return (
    <div className="mt-auto p-5">
      {!isCollapsed ? (
        <Tabs
          defaultValue="light"
          onValueChange={(value) => setActiveTab(value as 'light' | 'dark')}
          className="mb-8"
        >
          <TabsList className="h-10 w-full bg-gray-50">
            <TabsTrigger value="dark" className="w-full">
              <Icons.dark
                className={cn(
                  'mr-2 h-6 w-6',
                  activeTab === 'light' ? 'fill-gray-200' : ''
                )}
              />{' '}
              {'Dark'}
            </TabsTrigger>
            <TabsTrigger value="light" className="w-full">
              <Icons.light
                className={cn(
                  'mr-2 h-6 w-6',
                  activeTab === 'dark' ? 'fill-gray-200' : ''
                )}
              />{' '}
              {'Light'}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      ) : (
        <Toggle
          className="bg-color-white mb-8 h-[40px] w-[42px] rounded-[6px] border-[1px] border-gray-100 bg-white p-0"
          onClick={() => setActiveTab(activeTab === 'light' ? 'dark' : 'light')}
        >
          {activeTab === 'light' ? (
            <Icons.light className="h-6 w-6" />
          ) : (
            <Icons.dark className="h-6 w-6" />
          )}
        </Toggle>
      )}

      <div className="mb-8 flex items-center py-3">
        {firstName && (
          <>
            <Avatar className={cn('h-10 w-10', isCollapsed ? 'ml-1' : 'ml-3')}>
              <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
              <AvatarFallback>
                {getInitials(firstName || 'John', lastName || 'Doe')}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div
                className={cn(
                  'ml-3 transition-opacity duration-300',
                  isCollapsed ? 'opacity-0' : 'opacity-100'
                )}
              >
                <div className="text-left text-lg font-semibold text-gray-900">
                  {name || 'John Doe'}
                </div>
                <div className="text-xs font-medium text-gray-700">
                  {email || 'john.doe@mail.com'}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <Button
        className={cn(
          'hover:bg-primary-100 mb-6 mt-auto h-12 bg-[#F6F8FA] font-semibold text-gray-900',
          !isCollapsed ? 'w-full' : 'w-[47px] p-0'
        )}
        onClick={() => signOut()}
      >
        <Icons.logout
          className={cn('h-6 w-6 ', isCollapsed ? 'ml-0' : 'mr-4')}
        />{' '}
        {!isCollapsed && 'Logout'}
      </Button>
    </div>
  );
}
