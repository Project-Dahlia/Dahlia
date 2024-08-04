'use client';

import Map from '@/components/map/Map';
import React from 'react';
import { useAuth } from '@/lib/hooks/use-auth'; // Adjust the import path as needed

const Home = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main>
      {isAuthenticated && user ? (
        <h1>Logged in as {user.name}</h1>
      ) : (
        <h1>Not logged in</h1>
      )}
      <Map />
    </main>
  );
};

export default Home;
