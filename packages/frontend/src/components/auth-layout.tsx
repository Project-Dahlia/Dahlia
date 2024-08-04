'use client';

import { useAuth } from '@/lib/hooks/use-auth';
import { Header } from '@/components/site-header';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      {isLoading ? <div>Loading...</div> : children}
    </>
  );
}
