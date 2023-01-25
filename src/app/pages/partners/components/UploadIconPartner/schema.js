import { getEmailPattern } from '../../../../utils/utilsValidations'

export const schema = {
  Nombre: {
    prop: 'name',
    required: true,
    type: String,
  },
  'Primer Apellido': {
    prop: 'lastName',
    required: true,
    type: String,
  },
  'Segundo Apellido': {
    prop: 'secondLastName',
    required: true,
    type: String,
  },
  id: {
    prop: 'id',
    type: String,
  },
  email: {
    prop: 'email',
    required: true,
    type: (email) => {
      const { value, message } = getEmailPattern()
      if (!value.test(email)) {
        throw new Error(message)
      }
      return email
    },
  },
  'Sexo\nF / M': {
    oneOf: ['M', 'F', 'O'],
    prop: 'gender',
    required: true,
    type: String,
  },
  'Fecha de nacimiento\ndd/mm/aaaa': {
    prop: 'birthdate',
    required: true,
    type: Date,
  },
  'Movimiento\nALTA / BAJA': {
    oneOf: ['Alta', 'ALTA', 'Baja', 'BAJA'],
    prop: 'action',
    required: true,
    type: String,
  },
  RFC: {
    prop: 'rfc',
    required: true,
    type: String,
  },
  SKU: {
    prop: 'curp',
    required: true,
    type: String,
  },
}
