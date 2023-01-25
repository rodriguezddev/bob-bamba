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
})
