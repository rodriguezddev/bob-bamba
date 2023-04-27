import {
  getEmailPattern,
  getRfcPattern,
} from '../../../../utils/utilsValidations'

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
  Celular: {
    prop: 'phone',
    type: String,
  },
  RFC: {
    prop: 'rfc',
    required: true,
    type: (rfc) => {
      const { value, message } = getRfcPattern()
      if (!value.test(rfc)) {
        throw new Error(message)
      }
      return rfc
    },
  },
  SKU: {
    prop: 'curp',
    required: true,
    type: String,
  },
  'Movimiento\nALTA / BAJA': {
    oneOf: ['Alta', 'ALTA', 'Baja', 'BAJA'],
    prop: 'action',
    required: true,
    type: String,
  },
  'Fecha de Movimiento\ndd/mm/aaaa': {
    prop: 'movementDate',
    type: Date,
  },
}
