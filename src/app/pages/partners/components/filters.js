export const filters = [
  {
    id: 'name',
    name: 'Nombre',
    placeholder: 'Nombre',
    type: 'text',
  },
  {
    id: 'code',
    name: 'Código',
    placeholder: 'Código',
    type: 'text',
  },
  {
    id: 'type',
    name: 'Tipo',
    placeholder: 'Tipo',
    selectDetails: [
      { value: 'AGGREGATOR', name: 'Agregador' },
      { value: 'DISTRIBUTOR', name: 'Distribuidor' },
      { value: 'SPONSOR', name: 'Sponsor' },
    ],
    type: 'select',
  },
  {
    id: 'company',
    name: 'Compañía',
    placeholder: 'Compañía',
    type: 'text',
  },
  {
    id: 'partner',
    name: 'Partner',
    placeholder: 'Partner',
    type: 'text',
  },
]
