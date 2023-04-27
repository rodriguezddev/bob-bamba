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
  'Apellido Paterno': {
    prop: 'lastName',
    required: true,
    type: String,
  },
  'Apellido Materno': {
    prop: 'secondLastName',
    required: true,
    type: String,
  },
  'Fecha de nacimiento\ndd/mm/aaaa': {
    prop: 'birthdate',
    type: Date,
  },
  Email: {
    prop: 'email',
    type: (email) => {
      const { value, message } = getEmailPattern()
      if (!value.test(email)) {
        throw new Error(message)
      }
      return email
    },
  },
  Genero: {
    oneOf: ['M', 'F', 'O'],
    prop: 'gender',
    required: true,
    type: String,
  },
  RFC: {
    prop: 'rfc',
    type: (rfc) => {
      const { value, message } = getRfcPattern()
      if (!value.test(rfc)) {
        throw new Error(message)
      }
      return rfc
    },
  },
  CURP: {
    prop: 'curp',
    type: String,
  },
  'ID externo': {
    prop: 'id',
    type: String,
  },
  Celular: {
    prop: 'phone',
    type: String,
  },
}
