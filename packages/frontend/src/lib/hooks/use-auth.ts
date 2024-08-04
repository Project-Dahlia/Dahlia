'use client';

import { UserProfile } from '@/types';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';

export function useAuth() {
  const { data: session, status } = useSession();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const handleAuthenticated = (session: Session) => {
      const storedProfile = localStorage.getItem('userProfile');
      if (storedProfile) {
        setUserProfile(JSON.parse(storedProfile));
      } else {
        const profile = createProfileFromSession(session);
        localStorage.setItem('userProfile', JSON.stringify(profile));
        setUserProfile(profile);
      }
    };

    const handleUnauthenticated = () => {
      localStorage.removeItem('userProfile');
      setUserProfile(null);
    };

    if (status === 'authenticated' && session?.user) {
      handleAuthenticated(session);
    } else if (status === 'unauthenticated') {
      handleUnauthenticated();
    }
  }, [session, status]);

  return {
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    user: userProfile
  };
}

function createProfileFromSession(session: Session): UserProfile {
  if ('data' in session.user && session.user.data?.user) {
    return {
      id: session.user.data.user.id || '',
      name: session.user.data.user.name || '',
      email: session.user.data.user.email || ''
    };
  } else {
    return {
      id: session.user.id || '',
      name: session.user.name || '',
      email: session.user.email || ''
    };
  }
}
