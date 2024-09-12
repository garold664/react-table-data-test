import React, { memo } from 'react';
import { Product } from '../types/types';
import { ChevronsDownIcon } from 'lucide-react';

interface SortButtonProps {
  sortTableData: (
    field: keyof Product
  ) => (e: React.MouseEvent<HTMLButtonElement>) => void;
  sortedField: keyof Product | null;
  sortingOrder: 'asc' | 'desc' | null;
  field: keyof Product;
}
const SortButton = memo(
  ({ sortTableData, sortedField, sortingOrder, field }: SortButtonProps) => {
    return (
      <button onClick={sortTableData(field)}>
        <ChevronsDownIcon
          className={
            sortingOrder === 'desc' && sortedField === field ? 'rotate-180' : ''
          }
        />
      </button>
    );
  }
);
export default SortButton;
