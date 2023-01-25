export const filters = [
  {
    id: 'name',
    name: 'Nombre',
    placeholder: 'Nombre',
    type: 'text',
  },
  {
    id: 'sku',
    name: 'Sku',
    placeholder: 'Sku',
    type: 'text',
  },
  {
    id: 'status',
    name: 'Estatus',
    placeholder: 'Estatus',
    selectDetails: [
      { value: 'ACTIVE', name: 'Activo' },
      { value: 'INACTIVE', name: 'Inactivo' },
      { value: 'OUT_STOCK', name: 'Fuera de stock' },
    ],
    type: 'select',
  },
  {
    id: 'category',
    name: 'Categoría',
    placeholder: 'Categoría',
    type: 'text',
  },
  {
    id: 'partner',
    name: 'Partner',
    placeholder: 'Partner',
    type: 'text',
  },
]
