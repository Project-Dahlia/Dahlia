import React from 'react';
import { Input } from '../ui/input';
import { Icons } from '../common/icons';
import { cn } from '@/lib/utils';
import Button from '../buttons/Button';
import { Separator } from '../ui/separator';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';
import { CalendarForm } from '../common/calendar';
import IconButton from '../common/icon-button';

export interface SearchProps {
  isCollapsed: boolean;
}
const Search = ({ isCollapsed }: SearchProps) => {
  const [showFilter, setShowFilter] = React.useState(false);
  const [sliderValue, setSliderValue] = React.useState(0);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
  };

  return (
    <div
      className={cn(
        'transition-width absolute left-0 top-0 z-20 ml-4 flex h-full flex-col items-start px-4 pt-4 duration-300',
        isCollapsed ? 'ml-[87px]' : 'ml-[288px]',
        showFilter ? 'border-l-2 border-[#d9d9d9] bg-white' : ''
      )}
    >
      <div className="relative flex">
        <Input
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
          className={cn(
            'text-md h-[46px] w-[308px] bg-white px-4 py-2 pr-[80px] text-[#828282] placeholder-[#828282] focus:outline-none',
            showFilter
              ? 'rounded-none border-none'
              : 'rounded-[12px] border border-[#d9d9d9] bg-opacity-90'
          )}
        />

        <div className="absolute right-2 flex space-x-1 pt-2">
          <Button variant="ghost" className="h-8 px-2">
            <Icons.search className="h-4 w-4 " />
          </Button>
          <Button
            variant="ghost"
            className="h-8 px-2"
            onClick={() => setShowFilter(!showFilter)}
          >
            {showFilter ? (
              <Icons.cancel className="h-4 w-4" />
            ) : (
              <Icons.filter className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      {showFilter && <Separator className="w-[308px]" />}

      {showFilter && (
        <>
          <div className="mt-10 flex w-[308px] flex-col space-y-10">
            <div>
              <Label className="font-semibold">Parking Type</Label>
              <ToggleGroup
                type="multiple"
                variant="outline"
                className="mt-4 w-full"
              >
                <ToggleGroupItem value="lot" className="h-[54px] w-full">
                  Lot
                </ToggleGroupItem>
                <ToggleGroupItem value="garage" className="h-[54px] w-full">
                  Garage
                </ToggleGroupItem>
                <ToggleGroupItem value="street" className="h-[54px] w-full">
                  Street
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <IconButton name="location" placeholder="Zip/Postal Code">
              {<Icons.location className="h-5 w-5" />}
            </IconButton>

            <div>
              <Label className="font-semibold">Distance</Label>
              <Slider
                max={100}
                step={1}
                className={cn('mt-4 w-[100%]')}
                onValueChange={(value) => handleSliderChange(value[0])}
                value={[sliderValue]}
              />
              <div className="pt-2 text-xs font-semibold">{sliderValue}km</div>
            </div>
            <div className="space-y-4">
              <CalendarForm />
              <IconButton name="time" placeholder="Time">
                {<Icons.time className="h-5 w-5" />}
              </IconButton>
            </div>
          </div>
          <Button className="absolute bottom-10 w-[308px]">
            Advanced Search
          </Button>
        </>
      )}
    </div>
  );
};

export default Search;
