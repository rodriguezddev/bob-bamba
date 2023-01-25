import { configureStore } from '@reduxjs/toolkit'
import { cancelSubscription, subscriptionsSlice } from './subscriptionsSlice'
import httpService from '../../services/api_services/HttpService'

describe('UserSlice redux', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should return cancel subscription state', async () => {
    const stateSubscription = {
      id: '749d7a59-9d88-4c2a-98cf-82d48e9752a3',
      status: 'CANCELED',
      products: [],
      activated_at: '2023-01-11T01:57:23.000000Z',
      renew_every: 6,
      renew_period: 'MONTHLY',
      next_renewal_at: '2023-07-10T01:57:23.000000Z',
      certificate_file: '',
      isSuccess: true,
    }

    const responseMock = {
      data: {
        id: '749d7a59-9d88-4c2a-98cf-82d48e9752a3',
        status: 'CANCELED',
        products: [],
        activated_at: '2023-01-11T01:57:23.000000Z',
        renew_every: 6,
        renew_period: 'MONTHLY',
        next_renewal_at: '2023-07-10T01:57:23.000000Z',
        certificate_file: '',
      },
    }

    jest.spyOn(httpService, 'post').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: subscriptionsSlice.reducer })
    await store.dispatch(
      cancelSubscription('749d7a59-9d88-4c2a-98cf-82d48e9752a3'),
    )

    const { canceledSubscription } = await store.getState()

    expect(canceledSubscription).toEqual(stateSubscription)
  })

  it('should cancel subscription thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      canceledSubscription: {},
    }

    const thunk = cancelSubscription()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('cancel/subscriptions/pending')
    expect(calls[1][0].type).toEqual('cancel/subscriptions/rejected')
  })
})
