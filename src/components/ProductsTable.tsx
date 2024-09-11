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

export default function ProductsTable() {
  const [tableData, setTableData] = useState(data);
  const [editedId, setEditedId] = useState<string | null>(null);
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

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Баркод</TableHead>
          <TableHead>Предмет</TableHead>
          <TableHead>Артикул Поставщика</TableHead>
          <TableHead className="text-right">Размер</TableHead>
          <TableHead className="text-right">Доступно к заказу</TableHead>
          <TableHead className="text-right">
            Товары в пути (заказы и возвраты)
          </TableHead>
          <TableHead className="text-right">Итого кол-во товаров</TableHead>
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
  );
}
