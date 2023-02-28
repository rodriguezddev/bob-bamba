import { configureStore } from '@reduxjs/toolkit'
import carrierServiceReducer, {
  getCarrierServices,
  carrierSlice,
  createCarrierService,
  getCarriers,
  createCarrier,
  updateCarrier,
} from './carrierSlice'
import httpService from '../../services/api_services/HttpService'

describe('carrierServiceSlice redux', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should handle initial state', () => {
    expect(carrierServiceReducer(undefined, { type: 'unknown' })).toEqual({
      carrierServices: {
        data: [],
        meta: {},
      },
      carrierService: {},
      carriers: {
        data: [],
        meta: {},
      },
      carrier: {},
    })
  })

  it('should return carrier services state', async () => {
    const responseMock = {
      data: [
        {
          id: '36d0a7a2-5ded-4a47-86fc-b283e2bc12bf',
          name: 'Seguro de Accidentes 100K',
          sku: 'Seguro de Accidentes 100K',
          cost_per_year: 0,
          cost_per_month: 0,
          is_enabled: true,
          carrier: {
            id: 'e5e55b66-bc96-4ec3-acd4-373078fcc67b',
            name: 'BBVA',
            code: 'BBVA',
            is_enabled: true,
          },
          category: {
            id: '0e259b99-6c35-4cc2-8a03-1c525b9b25a0',
            name: 'insurance',
            code: 'INSURANCE',
          },
        },
      ],
      links: {
        first: 'http://staging.bamba.tech/admin/api/v1/carrier-services?page=1',
        last: 'http://staging.bamba.tech/admin/api/v1/carrier-services?page=2',
        prev: null,
        next: 'http://staging.bamba.tech/admin/api/v1/carrier-services?page=2',
      },
      meta: {
        current_page: 1,
        from: 1,
        last_page: 2,
        links: [
          {
            url: null,
            label: '&laquo; Anterior',
            active: false,
          },
          {
            url: 'http://staging.bamba.tech/admin/api/v1/carrier-services?page=1',
            label: '1',
            active: true,
          },
          {
            url: 'http://staging.bamba.tech/admin/api/v1/carrier-services?page=2',
            label: '2',
            active: false,
          },
          {
            url: 'http://staging.bamba.tech/admin/api/v1/carrier-services?page=2',
            label: 'Siguiente &raquo;',
            active: false,
          },
        ],
        path: 'http://staging.bamba.tech/admin/api/v1/carrier-services',
        per_page: 10,
        to: 10,
        total: 15,
      },
      code: 0,
    }

    jest.spyOn(httpService, 'get').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: carrierSlice.reducer })
    await store.dispatch(getCarrierServices())

    const { carrierServices } = await store.getState()

    expect(carrierServices).toEqual(responseMock)
  })

  it('should get carrier services thunk request', async () => {
    const dispatch = jest.fn()

    const state = {
      carrierServices: {
        data: [],
        meta: {},
      },
      carrierService: {},
      carriers: {
        data: [],
        meta: {},
      },
      carrier: {},
    }

    const thunk = getCarrierServices()

    await thunk(dispatch, () => state, undefined)

    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('list/carrierServices/pending')
    expect(calls[1][0].type).toEqual('list/carrierServices/rejected')
  })

  it('should return created carrier services', async () => {
    const formData = {
      name: 'prueba 5',
      sku: 'PRUEBA-5',
      cost_per_year: 1,
      cost_per_month: 1,
      is_enabled: false,
      carrier_id: 'a406f848-65f4-40d7-971b-519cbd6bb28c',
      category_id: '335869e3-907a-4ca6-bb40-3f3fafc57ec7',
    }

    const responseMock = {
      data: {
        id: '409630dd-3be0-4eb1-b495-bc3bcbf65111',
        name: 'prueba 5',
        sku: 'PRUEBA-5',
        cost_per_year: 1,
        cost_per_month: 1,
        is_enabled: true,
        carrier: {
          id: 'a406f848-65f4-40d7-971b-519cbd6bb28c',
          name: 'BAMBA',
          code: 'BAMBA',
          is_enabled: false,
        },
        category: {
          id: '335869e3-907a-4ca6-bb40-3f3fafc57ec7',
          name: 'insurance',
          code: 'INSURANCE',
        },
      },
      code: 0,
    }

    const state = {
      id: '409630dd-3be0-4eb1-b495-bc3bcbf65111',
      name: 'prueba 5',
      sku: 'PRUEBA-5',
      cost_per_year: 1,
      cost_per_month: 1,
      is_enabled: true,
      carrier: {
        id: 'a406f848-65f4-40d7-971b-519cbd6bb28c',
        name: 'BAMBA',
        code: 'BAMBA',
        is_enabled: false,
      },
      category: {
        id: '335869e3-907a-4ca6-bb40-3f3fafc57ec7',
        name: 'insurance',
        code: 'INSURANCE',
      },
    }

    jest.spyOn(httpService, 'post').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: carrierSlice.reducer })
    await store.dispatch(createCarrierService(formData))

    const { carrierService } = await store.getState()

    expect(carrierService).toEqual(state)
  })

  it('should create carrier thunk request', async () => {
    const dispatch = jest.fn()

    const state = {
      carrierServices: {
        data: [],
        meta: {},
      },
      carrierService: {},
      carriers: {
        data: [],
        meta: {},
      },
      carrier: {},
    }

    const thunk = createCarrierService()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('create/createCarrierService/pending')
    expect(calls[1][0].type).toEqual('create/createCarrierService/rejected')
  })

  it('should return carrier state', async () => {
    const responseMock = {
      data: [
        {
          id: '6c024359-72bd-49e7-a6fc-610edb84e20d',
          name: 'BAMBA',
          code: 'BAMBA',
          is_enabled: true,
        },
      ],
      links: {
        first: 'http://staging.bamba.tech/admin/api/v1/carriers?page=1',
        last: 'http://staging.bamba.tech/admin/api/v1/carriers?page=1',
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
            url: 'http://staging.bamba.tech/admin/api/v1/carriers?page=1',
            label: '1',
            active: true,
          },
          {
            url: null,
            label: 'Siguiente &raquo;',
            active: false,
          },
        ],
        path: 'http://staging.bamba.tech/admin/api/v1/carriers',
        per_page: 10,
        to: 3,
        total: 3,
      },
    }

    jest.spyOn(httpService, 'get').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: carrierSlice.reducer })
    await store.dispatch(getCarriers())

    const { carriers } = await store.getState()

    expect(carriers).toEqual(responseMock)
  })

  it('should get carrier thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      carrierServices: {
        data: [],
        meta: {},
      },
      carrierService: {},
      carriers: {
        data: [],
        meta: {},
      },
      carrier: {},
    }
    const thunk = getCarriers()

    await thunk(dispatch, () => state, undefined)

    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('list/carrier/pending')
    expect(calls[1][0].type).toEqual('list/carrier/rejected')
  })

  it('should return created carrier', async () => {
    const formData = {
      code: 'PRUEBA',
      name: 'prueba',
      is_enabled: true,
    }

    const responseMock = {
      data: {
        id: '7b53f516-21d6-488f-ad30-43ccd8ddb89f',
        name: 'prueba',
        code: 'PRUEBA',
        is_enabled: true,
      },
    }

    const state = {
      id: '7b53f516-21d6-488f-ad30-43ccd8ddb89f',
      name: 'prueba',
      code: 'PRUEBA',
      is_enabled: true,
    }

    jest.spyOn(httpService, 'post').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: carrierSlice.reducer })
    await store.dispatch(createCarrier(formData))

    const { carrier } = await store.getState()

    expect(carrier).toEqual(state)
  })

  it('should create carrier thunk request', async () => {
    const dispatch = jest.fn()

    const state = {
      carrierServices: {
        data: [],
        meta: {},
      },
      carrierService: {},
      carriers: {
        data: [],
        meta: {},
      },
      carrier: {},
    }

    const thunk = createCarrier()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('create/createCarrier/pending')
    expect(calls[1][0].type).toEqual('create/createCarrier/rejected')
  })

  it('should return updated carrier', async () => {
    const formData = {
      code: 'PRUEBA',
      name: 'prueba',
      is_enabled: true,
    }

    const responseMock = {
      data: {
        id: '7b53f516-21d6-488f-ad30-43ccd8ddb89f',
        name: 'prueba',
        code: 'PRUEBA',
        is_enabled: true,
      },
    }

    const state = {
      id: '7b53f516-21d6-488f-ad30-43ccd8ddb89f',
      name: 'prueba',
      code: 'PRUEBA',
      is_enabled: true,
    }

    jest.spyOn(httpService, 'patch').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: carrierSlice.reducer })
    await store.dispatch(updateCarrier(formData))

    const { carrier } = await store.getState()

    expect(carrier).toEqual(state)
  })

  it('should update carrier thunk request', async () => {
    const dispatch = jest.fn()

    const state = {
      carrierServices: {
        data: [],
        meta: {},
      },
      carrierService: {},
      carriers: {
        data: [],
        meta: {},
      },
      carrier: {},
    }

    const thunk = updateCarrier()
    await thunk(dispatch, () => state, undefined)
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('update/updateCarrier/pending')
    expect(calls[1][0].type).toEqual('update/updateCarrier/rejected')
  })
})
