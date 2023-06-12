import * as utilsUploadFile from '.'

describe('Test function in utils', () => {
  it('return users without email and cellphone products', () => {
    const status = [
      {
        name: 'Bamba',
        lastName: 'Bamba',
        secondLastName: 'Bamba',
        email: '',
        gender: 'O',
        rfc: 'SARR870906098',
        phone: '',
      },
      {
        name: 'Carlos',
        lastName: 'Hermes',
        secondLastName: 'rori',
        email: 'test@gmail.com ',
        gender: 'O',
        rfc: 'SARR870906098',
        phone: '5539896106',
      },
    ]

    const result = [
      {
        name: 'Bamba',
        lastName: 'Bamba',
        secondLastName: 'Bamba',
        email: '',
        gender: 'O',
        rfc: 'SARR870906098',
        phone: '',
        error: 'Debe contener email o celular',
      },
    ]

    expect(utilsUploadFile.usersWithoutEmailAndCellphone(status)).toStrictEqual(
      result,
    )
  })

  it('return users without required data', () => {
    const status = [
      {
        name: 'Bamba',
        lastName: 'Bamba',
        secondLastName: 'Bamba',
        gender: 'O',
        sku: 'SEGURO-ACCIDENTES-100K',
        phone: '6789054321',
        email: 'test@gmail.com',
      },
      {
        name: 'Carlos',
        lastName: 'Hermes',
        secondLastName: 'rori',
        email: 'test@gmail.com ',
        gender: 'O',
        rfc: 'SARR870906098',
        phone: '5539896106',
      },
    ]

    const result = [
      {
        name: 'Bamba',
        lastName: 'Bamba',
        secondLastName: 'Bamba',
        gender: 'O',
        sku: 'SEGURO-ACCIDENTES-100K',
        phone: '6789054321',
        email: 'test@gmail.com',
        error: 'Debe contener RFC, Fecha de nacimiento, Tipo de movimiento',
      },
    ]

    expect(utilsUploadFile.validationFileUploadUsers(status)).toStrictEqual(
      result,
    )
  })

  it('return cellphone field empty error', () => {
    const status = []

    const result = [
      {
        error: 'El campo cellphone es requerido',
      },
    ]

    expect(utilsUploadFile.upperCaseOrLowerCasePhone(status)).toStrictEqual(
      result,
    )
  })
})
