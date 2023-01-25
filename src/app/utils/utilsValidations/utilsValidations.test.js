import * as utilsValidations from '.'

describe('Test function in utils', () => {
  const dummyTFunction = () => 'test'
  const passwordPattern = utilsValidations.getPasswordPattern(dummyTFunction).value

  it('should return an object with the pattern and an error message in the email', () => {
    const emailAddressRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    expect(utilsValidations.getEmailPattern()).toEqual({
      value: emailAddressRegex,
      message: 'Ingrese un email válido',
    })
  })

  it('accepts valid email address', () => {
    expect(
      new RegExp(utilsValidations.getEmailPattern(dummyTFunction).value).test(
        'test@test.com',
      ),
    ).toBe(true)
  })

  it('rejects invalid email address', () => {
    expect(
      new RegExp(utilsValidations.getEmailPattern(dummyTFunction).value).test(
        'test.com',
      ),
    ).toBe(false)
  })

  it('should return an object with the pattern and an error message in the password', () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/

    expect(utilsValidations.getPasswordPattern()).toEqual({
      value: passwordRegex,
      message:
        'El password debe contener entre 8 y 20 caracteres, al menos una letra mayúscula, una letra minúscula y un dígito.',
    })
  })

  it('rejects password with less than 8 characters', () => {
    expect(new RegExp(passwordPattern).test('1234567')).toBe(false)
  })

  it('rejects password with more than 20 characters', () => {
    expect(new RegExp(passwordPattern).test('012345678901234567890')).toBe(
      false,
    )
  })

  it('rejects password without at least one uppercase letter', () => {
    expect(new RegExp(passwordPattern).test('12345678a')).toBe(false)
  })

  it('rejects password without at least one lowercase letter', () => {
    expect(new RegExp(passwordPattern).test('12345678A')).toBe(false)
  })

  it('accepts a password that successfully applies all the rules', () => {
    expect(new RegExp(passwordPattern).test('12345678Aa')).toBe(true)
  })

  it('should return an error true if they match', () => {
    const originalPassword = 'vivebambapassword'
    const repeatPasswordValidator = utilsValidations.getRepeatPasswordValidation(originalPassword)
    const matchingPassword = 'vivebambapassword'

    expect(repeatPasswordValidator(matchingPassword)).toBe(true)
  })

  it('should return an error message if they dont match', () => {
    const originalPassword = 'vivebambapassword'
    const repeatPasswordValidator = utilsValidations.getRepeatPasswordValidation(originalPassword)
    const nonMatchingPassword = 'vivebambapassworderror'

    expect(repeatPasswordValidator(nonMatchingPassword)).toBe(
      'Las contraseñas no coinciden',
    )
  })

  it('should return an object with the pattern and an error message in the RFC', () => {
    const rfcRegex = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/

    expect(utilsValidations.getRfcPattern()).toEqual({
      value: rfcRegex,
      message: 'Ingresa un RFC válido',
    })
  })

  it('accepts valid rfc', () => {
    expect(
      new RegExp(utilsValidations.getRfcPattern(dummyTFunction).value).test(
        'GORD820625GR2',
      ),
    ).toBe(true)
  })

  it('rejects invalid rfc', () => {
    expect(
      new RegExp(utilsValidations.getRfcPattern(dummyTFunction).value).test(
        'test',
      ),
    ).toBe(false)
  })

  it('should return an object with the pattern and an error message in the phone', () => {
    const phoneRegex = /^\d{10}$/

    expect(utilsValidations.getPhonePattern()).toEqual({
      value: phoneRegex,
      message: 'Ingresa un número válido a 10 dígitos',
    })
  })

  it('accepts valid phone', () => {
    expect(
      new RegExp(utilsValidations.getPhonePattern(dummyTFunction).value).test(
        '5539896106',
      ),
    ).toBe(true)
  })

  it('rejects invalid phone', () => {
    expect(
      new RegExp(utilsValidations.getPhonePattern(dummyTFunction).value).test(
        '5555',
      ),
    ).toBe(false)
  })

  it('accepts valid date', () => {
    expect(
      new RegExp(utilsValidations.getDateformat(dummyTFunction).value).test(
        '1999/09/20',
      ),
    ).toBe(true)
  })

  it('should not valid date', () => {
    expect(
      new RegExp(utilsValidations.getDateformat(dummyTFunction).value).test(
        '19/09/2000',
      ),
    ).toBe(false)
  })

  it('should valid code', () => {
    expect(
      new RegExp(utilsValidations.getCodePattern(dummyTFunction).value).test(
        'Bamba-Company',
      ),
    ).toBe(true)
  })

  it('should not valid code', () => {
    expect(
      new RegExp(utilsValidations.getCodePattern(dummyTFunction).value).test(
        'Bamba Company',
      ),
    ).toBe(false)
  })

  it('should valid sku', () => {
    expect(
      new RegExp(utilsValidations.getSkuProduct(dummyTFunction).value).test(
        'bamba-vida',
      ),
    ).toBe(true)
  })

  it('should not valid sku', () => {
    expect(
      new RegExp(utilsValidations.getSkuProduct(dummyTFunction).value).test(
        'bambavida',
      ),
    ).toBe(false)
  })
})
