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
})
