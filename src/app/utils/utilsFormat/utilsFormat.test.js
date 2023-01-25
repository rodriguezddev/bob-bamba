import * as utilsFormat from '.'

describe('test functions utils translate', () => {
  it('get formatted date', () => {
    const date = '2022-12-09T18:39:32.000000Z'
    const dateFormatType = 'en-GB'
    expect(utilsFormat.formatDate(date, dateFormatType)).toBe('09/12/2022')
  })
})
