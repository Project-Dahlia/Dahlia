import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ParkCard } from './parkcard';
import { Icons } from '../icons';

export function ParkingCardWrapper() {
  const [activeTab, setActiveTab] = useState<'distance' | 'price'>('distance');

  return (
    <div className="absolute mx-2 mt-2 w-[270px]">
      <Tabs
        defaultValue="distance"
        onValueChange={(value) => setActiveTab(value as 'distance' | 'price')}
        className=""
      >
        <TabsList className="h-10 w-full">
          <TabsTrigger value="distance" className="w-full">
            <Icons.parking
              active={activeTab === 'distance'}
              className="mr-2 h-6 w-6"
            />
            {'Distance'}
          </TabsTrigger>
          <TabsTrigger value="price" className="w-full">
            <Icons.price
              active={activeTab === 'price'}
              className="mr-2 h-6 w-6"
            />
            {'Price'}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="distance" className="">
          <ParkCard />
        </TabsContent>
        <TabsContent value="price">
          <ParkCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
