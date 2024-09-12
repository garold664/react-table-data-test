import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

import data from '../data.json';
import { useCallback, useState } from 'react';
import EditableCell from './EditableCell';
import { ChevronsDownIcon } from 'lucide-react';
import { Product } from '../types/types';
import SortButton from './SortButton';

export default function ProductsTable() {
  const [tableData, setTableData] = useState(data);
  const [editedId, setEditedId] = useState<string | null>(null);
  const [sortingOrder, setSortingOrder] = useState<'asc' | 'desc' | null>(null);
  const [sortedField, setSortedField] = useState<keyof Product | null>(null);
  const availableTotal = tableData.reduce(
    (acc, value) => acc + +value.available,
    0
  );

  const inTransitTotal = tableData.reduce(
    (acc, value) => acc + value.inTransit,
    0
  );

  const total = tableData.reduce((acc, value) => acc + +value.total, 0);

  const updateTableData = useCallback(
    (id: string, field: string, value: string | number) => {
      setTableData((prev) => {
        return prev.map((item) => {
          if (item.barcode === id) {
            return { ...item, [field]: value };
          }
          return item;
        });
      });
    },
    []
  );

  const sortTableData =
    (field: keyof Product) => (e: React.MouseEvent<HTMLButtonElement>) => {
      setSortedField(field);
      let newSortingOrder: 'asc' | 'desc' | null = null;
      if (!sortingOrder || sortedField !== field) {
        newSortingOrder = 'asc';
        setSortingOrder('asc');
      } else {
        setSortingOrder((order) => {
          newSortingOrder = order === 'asc' ? 'desc' : 'asc';
          return newSortingOrder;
        });
      }
      setTableData((data) => {
        if (newSortingOrder === 'asc') {
          return [...data].sort((a, b) => {
            // if (typeof a[field] === 'number' && typeof b[field] === 'number') {
            if (
              field === 'total' ||
              field === 'available' ||
              field === 'inTransit'
            ) {
              return a[field] - b[field];
            }
            return a[field].localeCompare(b[field]);
          });
        } else {
          return [...data].sort((a, b) => {
            if (
              field === 'total' ||
              field === 'available' ||
              field === 'inTransit'
            ) {
              return b[field] - a[field];
            }
            return b[field].localeCompare(a[field]);
          });
        }
      });
    };

  console.log(sortingOrder);

  return (
    <>
      <form action="">
        <input
          type="file"
          name=""
          id=""
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;
            // console.log(file);
            if (file.type !== 'application/json') return;
            // console.log(file.type === 'application/json');
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
              const jsonData = JSON.parse(e.target?.result as string);
              setTableData(jsonData);
            };
            reader.readAsText(file);
          }}
        />
      </form>
      <button
        onClick={() => {
          const textFile = new Blob([JSON.stringify(tableData, null, 2)], {
            type: 'text/plain;charset=utf-8',
          });

          const href = URL.createObjectURL(textFile);
          const link = document.createElement('a');
          link.target = '_blank';
          link.download = 'data.json';
          link.href = href;
          link.click();
        }}
      >
        Экспорт
      </button>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              Баркод{' '}
              <SortButton
                sortTableData={sortTableData}
                sortedField={sortedField}
                sortingOrder={sortingOrder}
                field="barcode"
              />
            </TableHead>
            <TableHead>
              Предмет{' '}
              <SortButton
                sortTableData={sortTableData}
                sortedField={sortedField}
                sortingOrder={sortingOrder}
                field="type"
              />
            </TableHead>
            <TableHead>
              Артикул Поставщика{' '}
              <SortButton
                sortTableData={sortTableData}
                sortedField={sortedField}
                sortingOrder={sortingOrder}
                field="name"
              />
            </TableHead>
            <TableHead className="text-right">
              Размер{' '}
              <SortButton
                sortTableData={sortTableData}
                sortedField={sortedField}
                sortingOrder={sortingOrder}
                field="size"
              />
            </TableHead>
            <TableHead className="text-right">
              Доступно к заказу{' '}
              <SortButton
                sortTableData={sortTableData}
                sortedField={sortedField}
                sortingOrder={sortingOrder}
                field="available"
              />
            </TableHead>
            <TableHead className="text-right">
              Товары в пути (заказы и возвраты){' '}
              <SortButton
                sortTableData={sortTableData}
                sortedField={sortedField}
                sortingOrder={sortingOrder}
                field="inTransit"
              />
            </TableHead>
            <TableHead className="text-right">
              Итого кол-во товаров
              <SortButton
                sortTableData={sortTableData}
                sortedField={sortedField}
                sortingOrder={sortingOrder}
                field="total"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((item) => (
            <TableRow key={item.barcode}>
              <EditableCell
                update={updateTableData}
                setEditedId={setEditedId}
                isEdited={editedId === item.barcode + 'barcode'}
                field="barcode"
                barcode={item.barcode}
              >
                {item.barcode}
              </EditableCell>
              <EditableCell
                update={updateTableData}
                setEditedId={setEditedId}
                isEdited={editedId === item.barcode + 'type'}
                field="type"
                barcode={item.barcode}
              >
                {item.type}
              </EditableCell>
              <EditableCell
                update={updateTableData}
                setEditedId={setEditedId}
                isEdited={editedId === item.barcode + 'name'}
                field="name"
                barcode={item.barcode}
              >
                {item.name}
              </EditableCell>
              <EditableCell
                update={updateTableData}
                setEditedId={setEditedId}
                isEdited={editedId === item.barcode + 'size'}
                field="size"
                barcode={item.barcode}
              >
                {item.size}
              </EditableCell>
              <EditableCell
                update={updateTableData}
                setEditedId={setEditedId}
                isEdited={editedId === item.barcode + 'available'}
                field="available"
                barcode={item.barcode}
              >
                {item.available}
              </EditableCell>
              <EditableCell
                update={updateTableData}
                setEditedId={setEditedId}
                isEdited={editedId === item.barcode + 'inTransit'}
                field="inTransit"
                barcode={item.barcode}
              >
                {item.inTransit}
              </EditableCell>
              <EditableCell
                update={updateTableData}
                setEditedId={setEditedId}
                isEdited={editedId === item.barcode + 'total'}
                field="total"
                barcode={item.barcode}
              >
                {item.total}
              </EditableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="text-left" colSpan={4}>
              Итого:
            </TableCell>
            <TableCell>{availableTotal}</TableCell>
            <TableCell>{inTransitTotal} </TableCell>
            <TableCell>{total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
