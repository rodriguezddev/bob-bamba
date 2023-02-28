import * as utilsHandleSubscriptions from '.'

describe('test functions utils cancel subscription', () => {
  it('get ordered subscription', () => {
    const subscriptions = [
      {
        id: '76055fe6-8fc9-4583-a256-24bb97fa0bbc',
        status: 'ACTIVE',
        products: [],
        activated_at: '2023-01-31T22:49:51.000000Z',
        renew_every: 6,
        renew_period: 'MONTHLY',
        next_renewal_at: '2023-07-30T22:49:51.000000Z',
        certificate_file: null,
      },
      {
        id: '815fcbc4-f789-4787-8f9d-ef98fedef63a',
        status: 'ACTIVE',
        products: [],
        activated_at: '2023-01-31T22:52:20.000000Z',
        renew_every: 6,
        renew_period: 'MONTHLY',
        next_renewal_at: '2023-07-30T22:52:20.000000Z',
        certificate_file: null,
      },
    ]

    expect(utilsHandleSubscriptions.orderSubscriptions(subscriptions)).toEqual([
      {
        id: '815fcbc4-f789-4787-8f9d-ef98fedef63a',
        status: 'ACTIVE',
        products: [],
        activated_at: '2023-01-31T22:52:20.000000Z',
        renew_every: 6,
        renew_period: 'MONTHLY',
        next_renewal_at: '2023-07-30T22:52:20.000000Z',
        certificate_file: null,
      },
      {
        id: '76055fe6-8fc9-4583-a256-24bb97fa0bbc',
        status: 'ACTIVE',
        products: [],
        activated_at: '2023-01-31T22:49:51.000000Z',
        renew_every: 6,
        renew_period: 'MONTHLY',
        next_renewal_at: '2023-07-30T22:49:51.000000Z',
        certificate_file: null,
      },
    ])
  })

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
        certificate_file: null,
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
      certificate_file: null,
    }

    expect(
      utilsHandleSubscriptions.handleSubscriptionsCanceled(
        subscriptions,
        canceledSubscription,
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
        certificate_file: null,
      },
    ])
  })

  it('get number of subscription', () => {
    const subscriptions = [
      {
        id: '51eb2d9b-0ca5-4a52-8952-c1b962f379fb',
        status: 'ACTIVE',
        products: [],
        activated_at: '2023-01-19T23:27:07.000000Z',
        renew_every: 6,
        renew_period: 'MONTHLY',
        next_renewal_at: '2023-07-18T23:27:07.000000Z',
        certificate_file: null,
      },
    ]

    expect(
      utilsHandleSubscriptions.handleSubscriptionsNumbers(subscriptions),
    ).toEqual(1)
  })
})
