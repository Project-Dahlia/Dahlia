'use client';

import React from 'react';
import { useAuth } from '@/lib/hooks/use-auth'; // Adjust the import path as needed

const Events = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <div className="events-container container my-10 flex flex-col">
        <h1 className="font-subheading text-2xl font-semibold tracking-tight" style={{marginLeft: 288+'px', marginTop: 50+'px'}}>
            Events Page
        </h1>
    </div>
  );
};

export default Events;