import { configureStore } from '@reduxjs/toolkit'
import userReducer, {
  createUsers,
  getUser,
  getUsers,
  resetCreateUsers,
  userSlice,
} from './userSlice'
import httpService from '../../services/api_services/HttpService'

describe('UserSlice redux', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual({
      users: {
        data: [],
        meta: {},
        createUsers: {},
      },
      user: {},
    })
  })

  it('should return user state', async () => {
    const responseMock = {
      code: 0,
      data: [
        {
          id: '6f5fd268-b7fa-44d3-9867-a53f451a1e87',
          name: 'Abe',
          lastname: 'Altenwerth',
          photo:
            '/storage/profiles/c4ca4238a0b923820dcc509a6f75849b/1360ef19eb2b34d7700e8db9a03bbb30.jpeg?v=1666304702',
          birthdate: '1996-11-27',
          gender: 'O',
          email: 'alanis.pouros@example.net',
          tax_id: 'WADH113511OEA',
          personal_id: 'JKIP925031TKJWHR93',
          subscriptions: [],
        },
        {
          id: '754ffde1-6cf3-40f8-956f-ea9a90e6c872',
          name: 'Jona',
          lastname: 'Prueba',
          photo: '',
          birthdate: '1993-11-12',
          gender: 'M',
          email: 'prueba1@gmail.com',
          tax_id: 'asas1212',
          personal_id: 'asas1313',
          subscriptions: [],
        },
      ],
      links: {
        first: 'http://staging.bamba.tech/admin/api/v1/users?page=1',
        last: 'http://staging.bamba.tech/admin/api/v1/users?page=1',
        prev: null,
        next: null,
      },
      meta: {
        current_page: 1,
        from: 1,
        last_page: 1,
        links: [],
        path: 'http://staging.bamba.tech/admin/api/v1/users',
        per_page: 10,
        to: 2,
        total: 2,
      },
    }

    jest.spyOn(httpService, 'get').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: userSlice.reducer })
    await store.dispatch(getUsers())

    const { users } = await store.getState()

    expect(users).toEqual(responseMock)
  })

  it('should get users thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      users: {
        data: [],
        meta: {},
        createUsers: {},
      },
      user: {},
    }
    const thunk = getUsers()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('list/users/pending')
    expect(calls[1][0].type).toEqual('list/users/rejected')
  })

  it('should return get user state', async () => {
    const responseMock = {
      data: {
        id: 'd48e2f13-503a-44df-a362-aee6c4de464b',
        name: 'Chris',
        lastname: 'Gorczany',
        birthdate: '1970-05-31',
        gender: 'F',
        email: 'tierra84@example.net',
        tax_id: 'BNIY169754NKL',
        personal_id: 'ZIFJ964199LUPXTR54',
        subscriptions: [
          {
            id: '46edf55e-ea6e-443c-b07d-3f8e3798712b',
            status: 'ACTIVE',
            products: [
              {
                id: '91216cb0-5d2c-4720-b389-96c52ddd2466',
                sku: 'voluptatem-ex',
                name: 'Voluptatem ex.',
                is_recurrent: true,
                expiration_unit: 7,
                expiration_period: 'MONTHLY',
                status: 'OUT_STOCK',
                prices: [
                  {
                    partner: 'Bamba',
                    price: 1905.99,
                    currency_code: 'MXN',
                  },
                ],
                categories: ['Inventore quo quo.'],
                description: null,
                brief: '',
                terms: '',
              },
            ],
            activated_at: '2022-10-11 11:09:29',
            renew_every: 7,
            renew_period: 'MONTHLY',
            next_renewal_at: null,
            certificate_file: '',
          },
        ],
      },
      code: 0,
    }

    const userState = {
      id: 'd48e2f13-503a-44df-a362-aee6c4de464b',
      name: 'Chris',
      lastname: 'Gorczany',
      birthdate: '1970-05-31',
      gender: 'F',
      email: 'tierra84@example.net',
      tax_id: 'BNIY169754NKL',
      personal_id: 'ZIFJ964199LUPXTR54',
      subscriptions: [
        {
          id: '46edf55e-ea6e-443c-b07d-3f8e3798712b',
          status: 'ACTIVE',
          products: [
            {
              id: '91216cb0-5d2c-4720-b389-96c52ddd2466',
              sku: 'voluptatem-ex',
              name: 'Voluptatem ex.',
              is_recurrent: true,
              expiration_unit: 7,
              expiration_period: 'MONTHLY',
              status: 'OUT_STOCK',
              prices: [
                {
                  partner: 'Bamba',
                  price: 1905.99,
                  currency_code: 'MXN',
                },
              ],
              categories: ['Inventore quo quo.'],
              description: null,
              brief: '',
              terms: '',
            },
          ],
          activated_at: '2022-10-11 11:09:29',
          renew_every: 7,
          renew_period: 'MONTHLY',
          next_renewal_at: null,
          certificate_file: '',
        },
      ],
    }

    jest.spyOn(httpService, 'get').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: userSlice.reducer })
    await store.dispatch(getUser())

    const { user } = await store.getState()

    expect(user).toEqual(userState)
  })

  it('should get user thunk request', async () => {
    const dispatch = jest.fn()

    const state = {
      users: {
        data: [],
        meta: {},
        createUsers: {},
      },
      user: {},
    }
    const thunk = getUser()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('user/details/pending')
    expect(calls[1][0].type).toEqual('user/details/rejected')
  })

  it('should return user state create with file', async () => {
    const responseMock = {
      code: 0,
      data: {
        isSuccess: true,
        rows_processed: 24,
      },
    }

    const state = {
      data: [],
      meta: {},
      createUsers: {
        isSuccess: true,
        rows_processed: 24,
      },
    }

    jest.spyOn(httpService, 'post').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: userSlice.reducer })
    await store.dispatch(createUsers())

    const { users } = await store.getState()

    expect(users).toEqual(state)
  })

  it('should create users thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      users: {
        data: [],
        meta: {},
        createUsers: {},
      },
      user: {},
    }

    const thunk = createUsers()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('create/users/pending')
    expect(calls[1][0].type).toEqual('create/users/rejected')
  })

  it('should handle resetCreateUsers', () => {
    const state = {
      users: {
        data: [],
        meta: {},
        createUsers: { id: 1 },
      },
      user: {},
    }
    const actualState = userReducer(state, resetCreateUsers())

    expect(actualState.users.createUsers).toEqual({})
  })
})
