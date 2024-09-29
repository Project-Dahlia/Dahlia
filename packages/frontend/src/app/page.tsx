'use client';

import Map from '@/components/map/getposition';
import React from 'react';
import { useAuth } from '@/lib/hooks/use-auth'; // Adjust the import path as needed
import { ParkingCardWrapper } from '@/components/common/parking-card/parkcard-wrapper';

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
    <main className="flex h-screen flex-1">
      <div className="h-full flex-1">
        <Map />
      </div>
    </main>
  );
};

export default Home;
