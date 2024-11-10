'use client';

import React from 'react';
import { useAuth } from '@/lib/hooks/use-auth'; // Adjust the import path as needed

const Parking = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <div className="parking-container container my-10 flex flex-col">
        <h1 className="font-subheading text-2xl font-semibold tracking-tight" style={{marginLeft: 288+'px', marginTop: 50+'px'}}>
          Parking Page
        </h1>
        <p>Information about available parking belongs on this page.</p>
    </div>
  );
};

export default Parking;