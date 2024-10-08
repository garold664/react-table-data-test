import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

import data from '../../data.json';
import { useCallback, useEffect, useState } from 'react';
import EditableCell from './EditableCell';
import { Product } from '../../types/types';
import SortButton from './SortButton';
import Cell from './Cell';
import FormBlock from '../FormBlock/FormBlock';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { productFieldNames, productFields } from '../../data/data';

export default function ProductsTable() {
  const [tableData, setTableData] = useState(data as Product[]);
  const [filteredData, setFilteredData] = useState(tableData);
  const [editedId, setEditedId] = useState<string | null>(null);
  const [sortingOrder, setSortingOrder] = useState<'asc' | 'desc' | null>(null);
  const [sortedField, setSortedField] = useState<keyof Product | null>(null);
  const availableTotal = filteredData.reduce(
    (acc, value) => acc + +value.available,
    0
  );

  const inTransitTotal = filteredData.reduce(
    (acc, value) => acc + value.inTransit,
    0
  );

  const total = filteredData.reduce((acc, value) => acc + +value.total, 0);

  useEffect(() => {
    setFilteredData(tableData);
  }, [tableData]);

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

  const sortTableData = useCallback(
    (field: keyof Product) => () => {
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
      setFilteredData((data) => {
        if (newSortingOrder === 'asc') {
          return [...data].sort((a, b) => {
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
    },
    [sortedField, sortingOrder]
  );

  const HeadCell = ({
    children,
    field,
  }: {
    children: string;
    field: keyof Product;
  }) => {
    return (
      <TableHead className="font-normal">
        <div
          className={`relative flex items-center gap-2 2xl:w-max ${
            children.includes('(заказы и возвраты)') ? 'pb-4' : 'pb-9'
          }`}
        >
          {children.includes('(заказы и возвраты)') ? (
            <div>
              <div className="flex items-center gap-2">
                {children.slice(0, '(заказы и возвраты)'.length * -1)}
                <SortButton
                  sortTableData={sortTableData}
                  sortedField={sortedField}
                  sortingOrder={sortingOrder}
                  field={field}
                />
              </div>
              <div className="text-slate-300">(заказы и возвраты)</div>
            </div>
          ) : (
            <>
              {children}
              <SortButton
                sortTableData={sortTableData}
                sortedField={sortedField}
                sortingOrder={sortingOrder}
                field={field}
              />
            </>
          )}
        </div>
      </TableHead>
    );
  };

  const EditableCellWrapper = ({
    children,
    field,
    barcode,
  }: {
    children: string | number;
    field: keyof Product;
    barcode: string;
  }) => {
    return (
      <EditableCell
        update={updateTableData}
        setEditedId={setEditedId}
        isEdited={editedId === barcode + field}
        field={field}
        barcode={barcode}
      >
        {children}
      </EditableCell>
    );
  };

  return (
    <>
      <FormBlock setTableData={setFilteredData} tableData={tableData} />
      <ScrollArea
        type="auto"
        className="w-full px-5 pt-14 pb-5 bg-white rounded-xl  shadow-sm "
      >
        <ScrollBar
          orientation="horizontal"
          className="bottom-auto top-5 bg-muted mx-5 rounded-full "
        />

        <Table className="border-separate border-spacing-1.5">
          <TableHeader>
            <TableRow>
              {productFields.map((field) => (
                <HeadCell key={field} field={field}>
                  {productFieldNames[field]}
                </HeadCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.barcode}>
                {productFields.map((field) => (
                  <EditableCellWrapper
                    key={field}
                    barcode={item.barcode}
                    field={field}
                  >
                    {item[field]}
                  </EditableCellWrapper>
                ))}
              </TableRow>
            ))}

            {filteredData.length !== 0 && (
              <TableRow>
                <Cell colSpan={4}>Итого:</Cell>
                <Cell>{availableTotal}</Cell>
                <Cell>{inTransitTotal} </Cell>
                <Cell>{total}</Cell>
              </TableRow>
            )}
          </TableBody>
          {filteredData.length === 0 && (
            <TableCaption>
              Нет данных. Чтобы загрузить данные, нажмите на кнопку "Загрузить
              данные из csv"
            </TableCaption>
          )}
        </Table>
      </ScrollArea>
    </>
  );
}
