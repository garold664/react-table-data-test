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

export default function ProductsTable() {
  const [tableData, setTableData] = useState(data);

  const availableTotal = tableData.reduce(
    (acc, value) => acc + +value.available,
    0
  );

  const inTransitTotal = tableData.reduce(
    (acc, value) => acc + +value.inTransit,
    0
  );

  const total = tableData.reduce((acc, value) => acc + +value.total, 0);

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
            <TableCell>{item.barcode}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.size}</TableCell>
            <TableCell>{item.available}</TableCell>
            <TableCell>{item.inTransit}</TableCell>
            <TableCell>{item.total}</TableCell>
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
