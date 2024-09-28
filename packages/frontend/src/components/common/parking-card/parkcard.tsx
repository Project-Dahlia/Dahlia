import * as React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Icons } from '../icons';

interface ParkCardProps {
  title: string;
  spaces: number;
  price: number;
  duration: string;
  timeToDestination: string;
  footerIcons?: Array<React.ReactNode>;
}

export function ParkCard({
  title,
  spaces,
  price,
  duration,
  timeToDestination,
  footerIcons
}: ParkCardProps) {
  return (
    <Card className="mb-2 rounded-md shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
      <CardHeader className="m-0 flex flex-row items-center justify-between rounded-t-md bg-sky-100 p-0">
        <CardTitle className="p-1 text-sm font-normal">{title}</CardTitle>
        <span className="p-1 text-xs/[0.01px]">{spaces} spaces</span>
      </CardHeader>
      <CardContent className="flex flex-row items-center justify-between space-x-8 py-0">
        <div className="flex items-baseline">
          <Icons.price className="h-7 w-7 text-gray-200" />
          <span className="mt-2 flex w-full flex-col text-3xl leading-none">
            {price}
            <small className="text-xs font-normal text-gray-200">
              {duration}
            </small>
          </span>
        </div>
        <div className="flex items-baseline space-x-1">
          <Icons.clock className="h-7 w-7 text-gray-200" />
          <span className="mt-2 flex w-full flex-col">
            <span className="flex items-baseline ">
              <span className="text-3xl leading-none">{timeToDestination}</span>
              <small className="text-xs font-normal text-gray-200">
                minutes
              </small>
            </span>
            <small className="text-xs font-normal text-gray-200">
              to destination
            </small>
          </span>
        </div>
      </CardContent>
      <hr />
      <CardFooter className="mx-1 flex space-x-2 p-1">
        {footerIcons && footerIcons.length > 0 ? (
          footerIcons.map((icon, index) => (
            <span key={index} className="h-5 w-5">
              {icon}
            </span>
          ))
        ) : (
          <div className="h-4 w-full" />
        )}
      </CardFooter>
    </Card>
  );
}
