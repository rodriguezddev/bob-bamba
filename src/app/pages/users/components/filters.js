export const filters = [
  {
    id: 'name',
    name: 'Nombre',
    placeholder: 'Nombre',
    type: 'text',
  },
  {
    id: 'lastname',
    name: 'Apellido',
    placeholder: 'Apellido paterno',
    type: 'text',
  },
  {
    id: 'cellphone',
    name: 'Celular',
    placeholder: 'Celular',
    type: 'text',
  },
  {
    id: 'email',
    name: 'Email',
    placeholder: 'Email',
    type: 'text',
  },
  {
    id: 'personal_id',
    name: 'CURP',
    placeholder: 'CURP',
    type: 'text',
  },
  {
    id: 'tax_id',
    name: 'RFC',
    placeholder: 'RFC',
    type: 'text',
  },
  {
    id: 'accepted_newsletter',
    name: 'Acepta notificaciones',
    selectDetails: [
      { value: 'true', name: 'Si' },
      { value: 'false', name: 'No' },
    ],
    type: 'select',
  },
  {
    id: 'partner_name',
    name: 'Partner',
    placeholder: 'Partner',
    type: 'text',
  },
]
