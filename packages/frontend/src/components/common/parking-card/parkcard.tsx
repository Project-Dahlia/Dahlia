import * as React from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Icons } from '../icons';

export function ParkCard() {
  return (
    <Card className="mb-2 rounded-md  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
      <CardHeader className="m-0 flex flex-row items-center justify-between rounded-t-md bg-sky-100 p-0">
        <CardTitle className="p-1 text-sm font-normal">
          Downtown Parking
        </CardTitle>
        <span className="p-1 text-xs/[0.01px]">20 spaces</span>
      </CardHeader>
      <CardContent className="mx-5 flex justify-between gap-10 p-0">
        <div className="flex items-center">
          <Icons.price className=" h-7 w-7 text-gray-200" />
          <span className="mt-3 flex flex-col text-3xl font-semibold leading-none">
            20
            <span className="text-xs font-normal text-gray-200">2 hours</span>
          </span>
        </div>
        <div className="flex items-center">
          <Icons.clock className="h-7 w-7 text-gray-200" />
          <span className="mt-3 text-3xl font-semibold leading-none">
            10
            <span className="text-xs font-normal text-gray-200 ">
              {' '}
              minutes to destination
            </span>
          </span>
        </div>
      </CardContent>
      <hr className="" />
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
