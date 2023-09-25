import * as utilsFormat from '.'

describe('test functions utils translate', () => {
  it('get formatted date', () => {
    const date = '2022-12-09T18:39:32.000000Z'
    const dateFormatType = 'en-GB'
    expect(utilsFormat.formatDate(date, dateFormatType)).toBe('09/12/2022')
  })

  it('get formatted code partner', () => {
    const code = 'TEST CODE NÁME @BAMBA'

    expect(utilsFormat.formatCodePartner(code)).toBe('TEST-CODE-NAME-BAMBA')
  })

  it('get key type config', () => {
    const config = {
      EMAIL: {
        providers: {
          MANDRILL: {
            key_types: {
              from_email: {
                description: 'Correo por el que se va mandar',
                type: 'email',
                required: true,
              },
              from_name: {
                description: 'Nombre de la cuenta de correo',
                type: 'string',
                required: true,
              },
            },
          },
        },
      },
    }

    expect(utilsFormat.getKeyTypes(config)).toHaveProperty('from_email')
    expect(utilsFormat.getKeyTypes(config)).toHaveProperty('from_name')
  })
})
