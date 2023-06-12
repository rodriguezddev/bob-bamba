import { configureStore } from '@reduxjs/toolkit'
import partnerReducer, {
  assignProducts,
  createPartner,
  createSubscriptionBatch,
  createUserBatch,
  createUsersWithFile,
  getPartners,
  handleSubscriptionIsSuccess,
  partnerSlice,
  resetPartner,
  resetResultSubscriptionFile,
  resetUsersBatch,
  updatePartner,
} from './partnerSlice'
import httpService from '../../services/api_services/HttpService'

describe('PartnerSlice redux', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should handle initial state', () => {
    expect(partnerReducer(undefined, { type: 'unknown' })).toEqual({
      partners: {
        data: [],
        meta: {},
        products: {},
      },
      partner: {},
      resultSubscriptionFile: {
        isSuccess: false,
      },
      usersWithFile: {
        isSuccess: false,
      },
      usersBatch: {
        errors: [],
        isSuccess: false,
        rowsProcessed: 0,
      },
    })
  })

  it('should return partner state', async () => {
    const responseMock = {
      data: [
        {
          id: '4bc8032d-b758-473b-91b9-2f3206419378',
          name: 'Bamba',
          code: 'bamba',
          type: 'SPONSOR',
          meta: null,
          company: {
            id: 'c5fd44be-93a6-4dea-865f-64b78d87c68b',
            name: 'Reinventando el Sistema SAPI de CV',
            email: 'hola@vivebamba.com',
            phone_number: '5555555555',
            tax_id: null,
            country_code: 'MX',
          },
        },
        {
          id: '903b5e52-bb48-49df-bcaf-5055323575e6',
          name: 'Rohan PLC',
          code: 'rohan-plc',
          type: 'AGGREGATOR',
          meta: null,
          company: {
            id: '49bd3e87-3aa0-4f93-8476-865395448166',
            name: 'Rohan PLC',
            email: 'fausto22@example.net',
            phone_number: '+18727201613',
            tax_id: null,
            country_code: 'MX',
          },
        },
      ],
      links: {
        first: 'http://staging.bamba.tech/admin/api/v1/partners?page=1',
        last: 'http://staging.bamba.tech/admin/api/v1/partners?page=1',
        prev: null,
        next: null,
      },
      meta: {
        current_page: 1,
        from: 1,
        last_page: 1,
        links: [
          {
            url: null,
            label: '&laquo; Anterior',
            active: false,
          },
          {
            url: 'http://staging.bamba.tech/admin/api/v1/partners?page=1',
            label: '1',
            active: true,
          },
          {
            url: null,
            label: 'Siguiente &raquo;',
            active: false,
          },
        ],
        path: 'http://staging.bamba.tech/admin/api/v1/partners',
        per_page: 10,
        to: 2,
        total: 2,
      },
    }

    jest.spyOn(httpService, 'get').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: partnerSlice.reducer })
    await store.dispatch(getPartners())

    const { partners } = await store.getState()

    expect(partners).toEqual(responseMock)
  })

  it('should get Partners thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      partners: {
        data: [],
        meta: {},
        products: {},
      },
      partner: {
        isSuccess: false,
      },
    }
    const thunk = getPartners()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('list/partners/pending')
    expect(calls[1][0].type).toEqual('list/partners/rejected')
  })

  it('should return create partner state', async () => {
    const statePartner = {
      data: [
        {
          id: 'd5491660-4b64-4628-9fdd-76a4f4197a6b',
          name: 'Test Corregido3',
          code: 'Test-Corregido3',
          type: 'SPONSOR',
          meta: {
            type: 'collective',
            policy: 'C000BA018XX',
          },
          company: {
            id: 'fcda2bbc-f1db-4cca-82bf-e65222ee8631',
            name: 'corregido5',
            email: 'corregido5@fake-company.com',
            phone_number: '5212131415',
            tax_id: 'FAKE981105M05',
            country_code: 'MX',
          },
        },
      ],
      meta: {},
      products: {},
    }

    const responseMock = {
      data: {
        id: 'd5491660-4b64-4628-9fdd-76a4f4197a6b',
        name: 'Test Corregido3',
        code: 'Test-Corregido3',
        type: 'SPONSOR',
        meta: {
          type: 'collective',
          policy: 'C000BA018XX',
        },
        company: {
          id: 'fcda2bbc-f1db-4cca-82bf-e65222ee8631',
          name: 'corregido5',
          email: 'corregido5@fake-company.com',
          phone_number: '5212131415',
          tax_id: 'FAKE981105M05',
          country_code: 'MX',
        },
      },
      code: 0,
    }

    jest.spyOn(httpService, 'post').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: partnerSlice.reducer })
    await store.dispatch(createPartner({}))

    const { partners } = await store.getState()

    expect(partners).toEqual(statePartner)
  })

  it('should createPartner thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      partners: {
        data: [],
        meta: {},
        products: {},
      },
      partner: {},
      resultSubscriptionFile: {
        isSuccess: false,
      },
    }
    const thunk = createPartner()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('partner/createUser/pending')
    expect(calls[1][0].type).toEqual('partner/createUser/rejected')
  })

  it('should handle resetPartner', () => {
    const state = {
      partners: {
        data: [],
        meta: {},
        products: {},
      },
      partner: { id: 1 },
    }
    const actualState = partnerReducer(state, resetPartner())

    expect(actualState.partner).toEqual({})
  })

  it('should return assigned products to partner state', async () => {
    const statePartnerProducts = {
      partnerId: 'f625c9de-e69a-48f5-9ba8-f9d52cb5953c',
      products: [
        {
          sku: 'test-daniel',
          currency_code: 'MXN',
          price: '312',
        },
        {
          sku: 'bamba-pan',
          currency_code: 'MXN',
          price: '342',
        },
      ],
    }

    const responseMock = {
      data: [
        {
          id: '2175ea81-97c0-40f3-8a2e-33f34dee3094',
          sku: 'test-daniel',
          name: 'Producto Test Daniel',
          is_recurrent: false,
          expiration_unit: 1,
          expiration_period: 'DAY',
          status: 'ACTIVE',
          prices: [
            {
              partner: 'Bamba',
              price: 4234,
              currency_code: 'MXN',
            },
            {
              partner: 'Athena Jennings',
              price: 312,
              currency_code: 'MXN',
            },
          ],
          categories: [],
          description: null,
          brief: '',
          terms: '',
        },
        {
          id: 'b173c25e-27ec-4170-89f2-40a6cbed5e2b',
          sku: 'bamba-pan',
          name: 'pan',
          is_recurrent: true,
          expiration_unit: 1,
          expiration_period: 'ANNUAL',
          status: 'ACTIVE',
          prices: [
            {
              partner: 'Bamba',
              price: 452452,
              currency_code: 'MXN',
            },
            {
              partner: 'Athena Jennings',
              price: 342,
              currency_code: 'MXN',
            },
          ],
          categories: [],
          description: null,
          brief: '',
          terms: '',
        },
      ],
      isSuccess: true,
    }

    const state = {
      data: [
        {
          id: '2175ea81-97c0-40f3-8a2e-33f34dee3094',
          sku: 'test-daniel',
          name: 'Producto Test Daniel',
          is_recurrent: false,
          expiration_unit: 1,
          expiration_period: 'DAY',
          status: 'ACTIVE',
          prices: [
            {
              partner: 'Bamba',
              price: 4234,
              currency_code: 'MXN',
            },
            {
              partner: 'Athena Jennings',
              price: 312,
              currency_code: 'MXN',
            },
          ],
          categories: [],
          description: null,
          brief: '',
          terms: '',
        },
        {
          id: 'b173c25e-27ec-4170-89f2-40a6cbed5e2b',
          sku: 'bamba-pan',
          name: 'pan',
          is_recurrent: true,
          expiration_unit: 1,
          expiration_period: 'ANNUAL',
          status: 'ACTIVE',
          prices: [
            {
              partner: 'Bamba',
              price: 452452,
              currency_code: 'MXN',
            },
            {
              partner: 'Athena Jennings',
              price: 342,
              currency_code: 'MXN',
            },
          ],
          categories: [],
          description: null,
          brief: '',
          terms: '',
        },
      ],
      isSuccess: true,
    }

    jest.spyOn(httpService, 'put').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: partnerSlice.reducer })
    await store.dispatch(assignProducts(statePartnerProducts))

    const { partners } = await store.getState()

    expect(partners.products).toEqual(state)
  })

  it('should assignProducts thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      partners: {
        data: [],
        meta: {},
        products: {},
      },
      partner: {},
    }
    const thunk = assignProducts()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('partner/assignProducts/pending')
    expect(calls[1][0].type).toEqual('partner/assignProducts/rejected')
  })

  it('should return resultSubscriptionFile', async () => {
    const stateResultUploadFile = {
      total_processed: 11,
      total_unprocessed: 11,
      unprocessed_users: [
        {
          user: {
            id: '03e6bdd1-447e-412c-a0c8-8d0b27c02bd2',
            name: 'DIANA Test',
            lastname: 'Mona',
            second_lastname: 'HERRE',
            email: 'ninatest@gmail.com',
            cellphone: '5551946889',
            gender: 'F',
            birthdate: '1970-01-01T06:00:00.000000Z',
            email_verified_at: null,
            tax_id: 'GUBC730406PL7',
            personal_id: null,
            country_code: 'MX',
            deleted_at: null,
            created_at: '2023-01-06T00:41:39.000000Z',
            updated_at: '2023-01-06T00:41:39.000000Z',
            metadata: null,
          },
          sku: 'bamba-test',
          action: 'REGISTRATION',
        },
      ],
      isSuccess: true,
    }

    const responseMock = {
      code: 0,
      data: {
        total_processed: 11,
        total_unprocessed: 11,
        unprocessed_users: [
          {
            user: {
              id: '03e6bdd1-447e-412c-a0c8-8d0b27c02bd2',
              name: 'DIANA Test',
              lastname: 'Mona',
              second_lastname: 'HERRE',
              email: 'ninatest@gmail.com',
              cellphone: '5551946889',
              gender: 'F',
              birthdate: '1970-01-01T06:00:00.000000Z',
              email_verified_at: null,
              tax_id: 'GUBC730406PL7',
              personal_id: null,
              country_code: 'MX',
              deleted_at: null,
              created_at: '2023-01-06T00:41:39.000000Z',
              updated_at: '2023-01-06T00:41:39.000000Z',
              metadata: null,
            },
            sku: 'bamba-test',
            action: 'REGISTRATION',
          },
        ],
      },
    }

    jest.spyOn(httpService, 'post').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: partnerSlice.reducer })
    await store.dispatch(createSubscriptionBatch({ partner: 'Bamba' }))

    const { resultSubscriptionFile } = await store.getState()

    expect(resultSubscriptionFile).toEqual(stateResultUploadFile)
  })

  it('should createSubscriptionBatch thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      partners: {
        data: [],
        meta: {},
        products: {},
      },
      partner: {},
    }
    const thunk = createSubscriptionBatch()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('partner/subscription/pending')
    expect(calls[1][0].type).toEqual('partner/subscription/rejected')
  })

  it('should handle resetResultUploadFile', () => {
    const state = {
      partners: {
        data: [],
        meta: {},
        products: {},
      },
      partner: {},
      resultSubscriptionFile: {
        sku: 'bamba-test',
      },
    }
    const actualState = partnerReducer(state, resetResultSubscriptionFile())

    expect(actualState.resultSubscriptionFile).toEqual({})
  })

  it('should handle handleSuccess', () => {
    const state = {
      partners: {
        data: [],
        meta: {},
        products: {},
      },
      partner: {},
      resultSubscriptionFile: {
        isSuccess: true,
      },
    }
    const actualState = partnerReducer(state, handleSubscriptionIsSuccess())

    expect(actualState.resultSubscriptionFile.isSuccess).toEqual(false)
  })

  it('should return usersBatch', async () => {
    const stateUsersBatch = {
      rowsProcessed: 3,
      isSuccess: true,
      errors: [
        [
          'There was an error on row 2. El campo celular ya existe para este partner',
        ],
        [
          'There was an error on row 2. El campo email ya existe para este partner',
        ],
        [
          'There was an error on row 3. El campo celular ya existe para este partner',
        ],
      ],
    }

    const responseMock = {
      code: 0,
      data: {
        total_rows: 3,
        errors: [
          [
            'There was an error on row 2. El campo celular ya existe para este partner',
          ],
          [
            'There was an error on row 2. El campo email ya existe para este partner',
          ],
          [
            'There was an error on row 3. El campo celular ya existe para este partner',
          ],
        ],
      },
    }

    jest.spyOn(httpService, 'post').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: partnerSlice.reducer })
    await store.dispatch(createUserBatch({ partner: 'Bamba' }))

    const { usersBatch } = await store.getState()

    expect(usersBatch).toEqual(stateUsersBatch)
  })

  it('should handle resetUsersBatch', () => {
    const state = {
      partners: {
        data: [],
        meta: {},
        products: {},
      },
      partner: {},
      resultSubscriptionFile: {
        isSuccess: true,
      },
      usersBatch: {
        errors: [],
        isSuccess: false,
        rowsProcessed: 0,
      },
    }
    const actualState = partnerReducer(state, resetUsersBatch())

    expect(actualState.usersBatch.isSuccess).toEqual(false)
  })

  it('should createUserBatch thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      partners: {
        data: [],
        meta: {},
        products: {},
      },
      partner: {},
      usersBatch: {
        errors: [],
        isSuccess: false,
        rowsProcessed: 0,
      },
    }
    const thunk = createUserBatch()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('partner/userBatch/pending')
    expect(calls[1][0].type).toEqual('partner/userBatch/rejected')
  })

  it('should return resultUploadUserFile', async () => {
    const stateResultUploadFile = {
      rows_total: 1,
      processed_total: 0,
      failed_data: [
        {
          row: {
            nombre: 'Juan',
            primer_apellido: 'Perez',
            segundo_apellido: 'Gomez',
            id: null,
            email: 'e@gmail.com',
            sexo_f_m: 'M',
            fecha_de_nacimiento_ddmmaaaa: '36469',
            celular: '1234567890',
            rfc: 'GORD820625GR6',
            sku: null,
            movimiento_alta_baja: 'ALTA',
            fecha_de_movimiento_ddmmaaaa: null,
          },
          errors: ['user_belong_to_partner'],
        },
      ],
      isSuccess: true,
    }

    const responseMock = {
      code: 0,
      data: {
        rows_total: 1,
        processed_total: 0,
        failed_data: [
          {
            row: {
              nombre: 'Juan',
              primer_apellido: 'Perez',
              segundo_apellido: 'Gomez',
              id: null,
              email: 'e@gmail.com',
              sexo_f_m: 'M',
              fecha_de_nacimiento_ddmmaaaa: '36469',
              celular: '1234567890',
              rfc: 'GORD820625GR6',
              sku: null,
              movimiento_alta_baja: 'ALTA',
              fecha_de_movimiento_ddmmaaaa: null,
            },
            errors: ['user_belong_to_partner'],
          },
        ],
      },
    }

    jest.spyOn(httpService, 'post').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: partnerSlice.reducer })
    await store.dispatch(createUsersWithFile({ partner: 'Bamba' }))

    const { usersWithFile } = await store.getState()
    expect(usersWithFile).toEqual(stateResultUploadFile)
  })

  it('should createUsersBatchWithFile thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      partners: {
        data: [],
        meta: {},
        products: {},
      },
      partner: {},
      resultSubscriptionFile: {
        isSuccess: false,
      },
      usersWithFile: {
        isSuccess: false,
      },
      usersBatch: {
        errors: [],
        isSuccess: false,
        rowsProcessed: 0,
      },
    }
    const thunk = createUsersWithFile()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('partner/users/pending')
    expect(calls[1][0].type).toEqual('partner/users/rejected')
  })

  it('should return update partner state', async () => {
    const responseMock = {
      data: {
        id: '623e7d13-03a0-4233-9865-ec9613d221dd',
        name: 'April Woods',
        code: 'UT-QUIA',
        type: 'AGGREGATOR',
        meta: null,
        company: {
          id: '59e6222d-9b28-4917-a3c8-5b7a875fd3ad',
          name: 'Harrison Love Trading',
          email: 'myga@mailinator.com',
          phone_number: '2281297310',
          tax_id: null,
          country_code: 'MX',
        },
      },
      code: 0,
    }

    const state = {
      data: [
        {
          id: '623e7d13-03a0-4233-9865-ec9613d221dd',
          name: 'April Woods',
          code: 'UT-QUIA',
          type: 'AGGREGATOR',
          meta: null,
          company: {
            id: '59e6222d-9b28-4917-a3c8-5b7a875fd3ad',
            name: 'Harrison Love Trading',
            email: 'myga@mailinator.com',
            phone_number: '2281297310',
            tax_id: null,
            country_code: 'MX',
          },
        },
      ],
      meta: {},
      products: {},
    }

    jest.spyOn(httpService, 'put').mockResolvedValueOnce(responseMock)

    const store = configureStore({
      reducer: partnerSlice.reducer,
    })
    await store.dispatch(
      updatePartner({
        id: 'dac3e',
        data: {},
      }),
    )

    const { partners } = await store.getState()

    expect(partners).toEqual(state)
  })

  it('should update noticeAccountTemplate thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      noticeAccounts: {
        data: [],
        meta: {},
      },
      noticeAccount: {
        isSuccess: false,
      },
      config: {},
    }
    const thunk = updatePartner()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('update/updatePartner/pending')
    expect(calls[1][0].type).toEqual('update/updatePartner/rejected')
  })
})
