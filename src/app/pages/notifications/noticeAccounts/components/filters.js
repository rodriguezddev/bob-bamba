export const filters = [
  {
    id: 'name',
    name: 'Nombre',
    placeholder: 'Nombre',
    type: 'text',
  },
  {
    id: 'notification_type',
    name: 'Tipo de notificación',
    placeholder: 'Tipo de notificación',
    type: 'text',
  },
  {
    id: 'provider',
    name: 'Proveedor',
    placeholder: 'Proveedor',
    type: 'text',
  },
  {
    id: 'is_enabled',
    name: 'Habilitado',
    placeholder: 'Habilitado',
    selectDetails: [
      { value: 'true', name: 'Sí' },
      { value: 'false', name: 'No' },
    ],
    type: 'select',
  },
]
