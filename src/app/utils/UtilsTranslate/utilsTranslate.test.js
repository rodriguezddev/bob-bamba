import * as utilsTranslate from '.'

describe('test functions utils translate', () => {
  it('get type partner', () => {
    const type = 'DISTRIBUTOR'

    expect(utilsTranslate.getTypePartner(type)).toBe('Distribuidor')
  })

  it('should format currency', () => {
    const amount = 39690
    const currency = utilsTranslate.formatCurrency(amount)

    expect(currency).toEqual('39,690')
  })

  it('get status products', () => {
    const status = 'ACTIVE'

    expect(utilsTranslate.getStatusProducts(status)).toBe('Activo')
  })

  it('get undefined status products', () => {
    expect(utilsTranslate.getStatusProducts(undefined)).toBe('-')
  })

  it('get period product', () => {
    const period = 'ANNUAL'

    expect(utilsTranslate.getPeriodProducts(period)).toBe('Año')
  })

  it('get undefined period product', () => {
    expect(utilsTranslate.getPeriodProducts(undefined)).toBe('-')
  })

  it('get null when error message is undefined', () => {
    expect(utilsTranslate.handleErrorMessage(undefined)).toBe(null)
  })

  it('get null when error message is void', () => {
    expect(utilsTranslate.handleErrorMessage('')).toBe(null)
  })

  it('get error message', () => {
    const textError = 'El email de la compañía ya existe. No autenticado.'
    const errors = {
      email: ['El valor del campo company.email ya está en uso.'],
      details: ['Unauthenticated'],
    }

    expect(utilsTranslate.handleErrorMessage(errors)).toBe(textError)
  })

  it('get text error upload file', () => {
    const errors = 'invalid_rfc_for_sku'
    const textError = 'El RFC no válido para el sku'

    expect(utilsTranslate.getTextErrorUploadFile(errors)).toBe(textError)
  })

  it('get text action upload file', () => {
    const actionCanceled = 'CANCELED'
    const textActionCanceled = 'Baja'

    expect(utilsTranslate.getTextActionUploadFile(actionCanceled)).toBe(
      textActionCanceled,
    )
  })
})
