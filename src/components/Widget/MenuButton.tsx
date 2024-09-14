import { TriangleIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface MenuButtonProps {
  children: React.ReactNode;
}
export default function MenuButton({ children }: MenuButtonProps) {
  return (
    <Button
      variant={'secondary'}
      className="relative w-full justify-start pl-4 pr-8 py-8 text-lg gap-4 mb-1"
    >
      {children}
      <TriangleIcon
        fill="currentColor"
        stroke="currentColor"
        size={10}
        className="absolute right-5 text-tertiary rotate-180"
      />
    </Button>
  );
}
