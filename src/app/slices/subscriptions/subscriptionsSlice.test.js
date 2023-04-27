import { configureStore } from '@reduxjs/toolkit'
import subscriptionReducer, {
  cancelSubscription,
  createSubscription,
  resetSubscription,
  subscriptionsSlice,
} from './subscriptionsSlice'
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

  it('should return create subscription state', async () => {
    const responseMock = {
      id: '8b176d1e-c1a5-4422-a13d-ad4b788ef481',
      status: 'PENDING_ACTIVATION',
      products: [
        {
          id: '018a1797-eb9e-4097-a5da-3d7bde52d47c',
          sku: 'LEGACY-PLAN-ALTO-AI0920',
          name: 'Protección Alta: Accidentes + Orientación Médica + Consultas con Especialista',
          is_recurrent: true,
          expiration_unit: 1,
          expiration_period: 'MONTHLY',
          status: 'ACTIVE',
          prices: [
            {
              partner: 'Lans',
              price: 0,
              currency_code: 'MXN',
            },
            {
              partner: 'Jolc',
              price: 0,
              currency_code: 'MXN',
            },
            {
              partner: 'Symplifica',
              price: 1545.81,
              currency_code: 'MXN',
            },
          ],
          categories: ['health'],
          carrier_services: [
            {
              id: 'f3b2d95d-f7d5-483f-8c67-3529006b22ff',
              name: 'Seguro de Accidentes 50K',
              sku: 'BBVA-ACCIDENTES-50K',
              carrier: 'BBVA',
            },
            {
              id: '03616ddc-8e5e-4b13-9017-0ea5ccd8a019',
              name: 'Consultas con Médico Especialista x8',
              sku: 'BAMBA-ESPECIALISTA-8',
              carrier: 'BAMBA',
            },
          ],
          description: [
            {
              section: '¿Qué incluye?',
              body: [
                'Si tienes algún tipo de accidente, estás cubierto hasta por $50,000 mxn por cualquier gasto médico derivado de ese accidente.',
                'Si te sientes mal, puedes pedir Orientación Médica por teléfono las 24 horas los 365 del año.',
                '8 consultas al año con Médicos Especialistas.',
              ],
            },
          ],
          brief:
            'Si te accidentas, te reembolsa hasta $50,000 mxn. Incluye 8 consultas con Médicos Especialistas al año y Orientación Médica por teléfono.',
          terms: '',
        },
      ],
      activated_at: '2023-04-06T06:00:00.000000Z',
      renew_every: 1,
      renew_period: 'MONTHLY',
      next_renewal_at: null,
      certificate_file: '',
    }

    jest.spyOn(httpService, 'post').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: subscriptionsSlice.reducer })
    await store.dispatch(createSubscription({ userId: 'bamba', products: [] }))

    const { subscriptionActivated } = await store.getState()

    expect(subscriptionActivated.isSuccess).toEqual(true)
  })

  it('should create subscription thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      subscriptionActivated: {
        isSuccess: false,
      },
    }

    const thunk = createSubscription()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('create/subscriptions/pending')
    expect(calls[1][0].type).toEqual('create/subscriptions/rejected')
  })

  it('should handle resetSubscription', () => {
    const state = {
      subscriptions: {
        data: [],
        meta: {},
      },
      canceledSubscription: {
        isSuccess: true,
      },
      subscriptionActivated: {
        isSuccess: true,
      },
    }
    const actualState = subscriptionReducer(state, resetSubscription())

    expect(actualState.canceledSubscription).toEqual({})
    expect(actualState.subscriptionActivated).toEqual({ isSuccess: false })
  })
})
