import React from 'react';
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
export default function SortButton({
  sortTableData,
  sortedField,
  sortingOrder,
  field,
}: SortButtonProps) {
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
