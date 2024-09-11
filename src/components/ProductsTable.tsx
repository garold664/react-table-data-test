import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

import React from 'react';

import data from '../data.json';

export default function ProductsTable() {
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
        {data.map((item) => (
          <TableRow key={item.barcode}>
            <TableCell className="font-medium">{item.barcode}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell className="text-right">{item.size}</TableCell>
            <TableCell className="text-right">{item.available}</TableCell>
            <TableCell className="text-right">{item.inTransit}</TableCell>
            <TableCell className="text-right">{item.total}</TableCell>
          </TableRow>
        ))}
        {/* <TableRow>
          <TableCell className="font-medium">2037618545904</TableCell>
          <TableCell>Одежда</TableCell>
          <TableCell>Кардиган</TableCell>
          <TableCell className="text-right">50-60</TableCell>
          <TableCell className="text-right">0</TableCell>
          <TableCell className="text-right">40</TableCell>
          <TableCell className="text-right">30</TableCell>
        </TableRow> */}
      </TableBody>
    </Table>
  );
}
