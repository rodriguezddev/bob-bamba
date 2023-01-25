import * as utilsHandleSubscriptions from '.'

describe('test functions utils cancel subscription', () => {
  it('get cancel subscription', () => {
    const subscriptions = [
      {
        id: '51eb2d9b-0ca5-4a52-8952-c1b962f379fb',
        status: 'ACTIVE',
        products: [],
        activated_at: '2023-01-19T23:27:07.000000Z',
        renew_every: 6,
        renew_period: 'MONTHLY',
        next_renewal_at: '2023-07-18T23:27:07.000000Z',
        certificate_file: '',
      },
    ]

    const canceledSubscription = {
      id: '51eb2d9b-0ca5-4a52-8952-c1b962f379fb',
      status: 'CANCELED',
      products: [],
      activated_at: '2023-01-19T23:27:07.000000Z',
      renew_every: 6,
      renew_period: 'MONTHLY',
      next_renewal_at: '2023-07-18T23:27:07.000000Z',
      certificate_file: '',
    }

    expect(
      utilsHandleSubscriptions.handleSubscriptions(
        canceledSubscription,
        subscriptions,
      ),
    ).toEqual([
      {
        id: '51eb2d9b-0ca5-4a52-8952-c1b962f379fb',
        status: 'CANCELED',
        products: [],
        activated_at: '2023-01-19T23:27:07.000000Z',
        renew_every: 6,
        renew_period: 'MONTHLY',
        next_renewal_at: '2023-07-18T23:27:07.000000Z',
        certificate_file: '',
      },
    ])
  })
})
