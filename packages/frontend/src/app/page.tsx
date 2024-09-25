'use client';

import Map from '@/components/map/getposition';
import React from 'react';
import { useAuth } from '@/lib/hooks/use-auth'; // Adjust the import path as needed

const Home = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main>
      <Map />
    </main>
  );
};

export default Home;
