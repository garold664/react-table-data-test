import { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../lib/utils';
import { TableCell } from '../ui/table';

interface CellProps extends ComponentPropsWithoutRef<'td'> {
  children: React.ReactNode;
  className?: string;
}

export default function Cell({ children, className, ...props }: CellProps) {
  return (
    <TableCell
      className={cn(
        'bg-muted-light shadow-sm shadow-gray-300 group-even:bg-muted first:rounded-s-lg py-7 pl-4 pr-6',
        className
      )}
      {...props}
    >
      {children}
    </TableCell>
  );
}
