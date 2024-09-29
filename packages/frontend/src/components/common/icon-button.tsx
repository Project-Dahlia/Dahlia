import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

interface IconButtonProps {
  children: React.ReactNode;
  className?: string;
  name: string;
  placeholder: string;
}

const IconButton = ({
  name,
  placeholder,
  children,
  className
}: IconButtonProps) => (
  <div className="relative flex">
    <Input
      type="text"
      name={name}
      id={name}
      placeholder={placeholder}
      className={cn(
        'h-[46px] w-full rounded-md border border-[#d9d9d9] bg-white text-sm text-[#828282] placeholder-[#828282] focus:outline-none',
        className
      )}
    />
    <div className="absolute right-4 flex pt-3">{children}</div>
  </div>
);

export default IconButton;
