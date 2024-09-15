export const productFields = [
  'barcode',
  'type',
  'name',
  'size',
  'available',
  'inTransit',
  'total',
] as const;

export const productFieldNames = {
  barcode: 'Баркод',
  type: 'Предмет',
  name: 'Артикул поставщика',
  size: 'Размер',
  available: 'Доступно к заказу',
  inTransit: 'Товары в пути (заказы и возвраты)',
  total: 'Итого',
};
