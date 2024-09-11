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
import { useState } from 'react';
import Item from './Item';

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

  const updateTableData = (
    id: string,
    field: string,
    value: string | number
  ) => {
    setTableData((prev) => {
      return prev.map((item) => {
        if (item.barcode === id) {
          return { ...item, [field]: value };
        }
        return item;
      });
    });
  };

  console.log(tableData);

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
            <TableCell>
              <Item
                update={updateTableData}
                setEditedId={setEditedId}
                editedId={editedId}
                field="barcode"
                barcode={item.barcode}
              >
                {item.barcode}
              </Item>
            </TableCell>
            <TableCell>
              <Item
                update={updateTableData}
                setEditedId={setEditedId}
                editedId={editedId}
                field="type"
                barcode={item.barcode}
              >
                {item.type}
              </Item>
            </TableCell>
            <TableCell>
              <Item
                update={updateTableData}
                setEditedId={setEditedId}
                editedId={editedId}
                field="name"
                barcode={item.barcode}
              >
                {item.name}
              </Item>
            </TableCell>
            <TableCell>
              <Item
                update={updateTableData}
                setEditedId={setEditedId}
                editedId={editedId}
                field="size"
                barcode={item.barcode}
              >
                {item.size}
              </Item>
            </TableCell>
            <TableCell>
              <Item
                update={updateTableData}
                setEditedId={setEditedId}
                editedId={editedId}
                field="available"
                barcode={item.barcode}
              >
                {item.available}
              </Item>
            </TableCell>
            <TableCell>
              <Item
                update={updateTableData}
                setEditedId={setEditedId}
                editedId={editedId}
                field="inTransit"
                barcode={item.barcode}
              >
                {item.inTransit}
              </Item>
            </TableCell>
            <TableCell>
              <Item
                update={updateTableData}
                setEditedId={setEditedId}
                editedId={editedId}
                field="total"
                barcode={item.barcode}
              >
                {item.total}
              </Item>
            </TableCell>
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
