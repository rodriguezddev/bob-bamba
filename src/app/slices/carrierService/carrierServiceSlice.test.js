import { configureStore } from '@reduxjs/toolkit'
import carrierServiceReducer, {
  getCarrierServices,
  carrierServiceSlice,
} from './carrierServiceSlice'
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

    const store = configureStore({ reducer: carrierServiceSlice.reducer })
    await store.dispatch(getCarrierServices())

    const { carrierServices } = await store.getState()

    expect(carrierServices).toEqual(responseMock)
  })
})
