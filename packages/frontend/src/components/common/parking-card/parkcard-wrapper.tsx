import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ParkCard } from './parkcard';
import { Icons } from '../icons';
import { cn } from '@/lib/utils';

export function ParkingCardWrapper() {
  const [activeTab, setActiveTab] = useState<'distance' | 'price'>('distance');

  return (
    <div className="absolute mx-2 mt-1 ">
      <Tabs
        defaultValue="distance"
        onValueChange={(value) => setActiveTab(value as 'distance' | 'price')}
        className=""
      >
        <TabsList className="h-10 w-full bg-gray-100">
          <TabsTrigger
            value="distance"
            className={cn(
              'w-full rounded-lg',
              'data-[state=active]:bg-white data-[state=active]:text-black'
            )}
          >
            <Icons.parking
              active={activeTab === 'distance'}
              className="mr-2 h-6 w-6"
            />
            {'Distance'}
          </TabsTrigger>
          <TabsTrigger
            value="price"
            className={cn(
              'w-full rounded-lg',
              'data-[state=active]:bg-white data-[state=active]:text-black'
            )}
          >
            <Icons.price
              active={activeTab === 'price'}
              className="mr-2 h-6 w-6"
            />
            {'Price'}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="distance">
          <ParkCard
            title="City Center Parking"
            spaces={15}
            price={10}
            duration="1 hour"
            timeToDestination="5"
          />
          <ParkCard
            title="Downtown Parking"
            spaces={20}
            price={20}
            duration="2 hours"
            timeToDestination="10"
            footerIcons={[
              <Icons.CreditCard key="credit-card" />,
              <Icons.Bike key="bike" />,
              <Icons.Car key="car" />,
              <Icons.Zap key="zap" />
            ]}
          />
        </TabsContent>

        <TabsContent value="price">
          <ParkCard
            title="Downtown Parking"
            spaces={20}
            price={20}
            duration="2 hours"
            timeToDestination="10"
            footerIcons={[
              <Icons.CreditCard key="credit-card" />,
              <Icons.Bike key="bike" />,
              <Icons.Car key="car" />,
              <Icons.Zap key="zap" />
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
