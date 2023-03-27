import { configureStore } from '@reduxjs/toolkit'
import productReducer, {
  createProduct,
  getProducts,
  getProductsByPartners,
  getProductDetails,
  getProductsNotActive,
  productSlice,
} from './productSlice'
import httpService from '../../services/api_services/HttpService'

describe('ProductSlice redux', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should handle initial state', () => {
    expect(productReducer(undefined, { type: 'unknown' })).toEqual({
      products: {
        data: [],
        meta: {},
      },
      product: {},
      productsNotActive: {
        data: [],
      },
      productsByPartners: {
        data: [],
        meta: {},
      },
      productDetails: {},
    })
  })

  it('should return product list', async () => {
    const responseMock = {
      data: [
        {
          id: 'e8046494-2092-4e84-98b0-91c0aaeddd4a',
          sku: 'dolorem-non-et',
          name: 'Dolorem non et.',
          is_recurrent: true,
          expiration_unit: 6,
          expiration_period: 'ANNUAL',
          status: 'ACTIVE',
          prices: [
            {
              partner: 'Bamba',
              price: 999.5,
              currency_code: 'MXN',
            },
            {
              partner: 'Angela Benson',
              price: 999.5,
              currency_code: 'MXN',
            },
          ],
          categories: [
            'Culpa voluptas.',
            'Eaque laborum quia.',
            'Qui quas provident.',
          ],
          description: null,
          brief: '',
          terms: '',
        },
        {
          id: '39196066-965d-4db6-bfee-84fd7963410e',
          sku: 'ut-quos-quaerat',
          name: 'Ut quos quaerat.',
          is_recurrent: true,
          expiration_unit: 9,
          expiration_period: 'ANNUAL',
          status: 'OUT_STOCK',
          prices: [],
          categories: [
            'Culpa voluptas.',
            'Eaque laborum quia.',
            'Qui quas provident.',
          ],
          description: null,
          brief: '',
          terms: '',
        },
      ],
      links: {
        first: 'http://staging.bamba.tech/admin/api/v1/products?page=1',
        last: 'http://staging.bamba.tech/admin/api/v1/products?page=2',
        prev: null,
        next: 'http://staging.bamba.tech/admin/api/v1/products?page=2',
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
            url: 'http://staging.bamba.tech/admin/api/v1/products?page=1',
            label: '1',
            active: true,
          },
          {
            url: 'http://staging.bamba.tech/admin/api/v1/products?page=2',
            label: '2',
            active: false,
          },
          {
            url: 'http://staging.bamba.tech/admin/api/v1/products?page=2',
            label: 'Siguiente &raquo;',
            active: false,
          },
        ],
        path: 'http://staging.bamba.tech/admin/api/v1/products',
        per_page: 10,
        to: 10,
        total: 17,
      },
      code: 0,
    }

    jest.spyOn(httpService, 'get').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: productSlice.reducer })
    await store.dispatch(getProducts())

    const { products } = await store.getState()

    expect(products).toEqual(responseMock)
  })

  it('should get products thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      products: {
        data: [],
        meta: {},
      },
      product: {},
      productsNotActive: {
        data: [],
      },
      productsByPartners: {
        data: [],
        meta: {},
      },
      productDetails: {},
    }

    const thunk = getProducts()
    await thunk(dispatch, () => state, undefined)

    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('list/products/pending')
    expect(calls[1][0].type).toEqual('list/products/rejected')
  })

  it('should return product details', async () => {
    const responseMock = {
      data: {
        id: '74408485-5e8d-48ea-95d7-f4313dec3873',
        sku: 'SEGURO-ACCIDENTES-25K',
        name: 'Seguro de Accidentes',
        is_recurrent: false,
        expiration_unit: 6,
        expiration_period: 'MONTHLY',
        status: 'ACTIVE',
        prices: [
          {
            partner: 'Claro Pay',
            price: 129,
            currency_code: 'MXN',
          },
        ],
        categories: ['insurance', 'assistance'],
        carrier_services: [
          {
            id: '2f4f6039-fbe6-48e9-b6ad-014cf2b4d96c',
            name: 'Seguro de Accidentes 25K',
            sku: 'BBVA-ACCIDENTES-25K',
            carrier: 'BBVA',
          },
        ],
        description: [],
        brief: 'Si te accidentas, te reembolsa hasta $25,000 mxn',
        terms: 'https://www.vivebamba.com/terminos-condiciones',
      },
      code: 0,
    }

    jest.spyOn(httpService, 'get').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: productSlice.reducer })
    await store.dispatch(getProductDetails())

    const { productDetails } = await store.getState()

    expect(productDetails).toEqual(responseMock.data)
  })

  it('should get products details thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      products: {
        data: [],
        meta: {},
      },
      product: {},
      productsNotActive: {
        data: [],
      },
      productsByPartners: {
        data: [],
        meta: {},
      },
      productDetails: {},
    }

    const thunk = getProductDetails()
    await thunk(dispatch, () => state, undefined)

    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('list/productDetails/pending')
    expect(calls[1][0].type).toEqual('list/productDetails/rejected')
  })

  it('should return created product', async () => {
    const formData = {
      sku: 'test',
      name: 'test',
      is_recurrent: true,
      expiration_unit: '1',
      expiration_period: 'ANNUAL',
      status: 'ACTIVE',
      carrier_service_id: '3db1175f-4745-415e-ba31-4b7798597f7a',
      category_id: '87cdb7f4-c8d1-4a45-87ba-2d3cdab25bfb',
    }

    const responseMock = {
      data: {
        id: '8123d6ea-fa95-4e0b-abfb-5b97fa12d9f3',
        sku: 'test',
        name: 'test',
        is_recurrent: true,
        expiration_unit: 1,
        expiration_period: 'ANNUAL',
        status: 'ACTIVE',
        prices: [],
        categories: ['Culpa voluptas.'],
        description: null,
        brief: '',
        terms: '',
      },
      code: 0,
    }

    const state = {
      id: '8123d6ea-fa95-4e0b-abfb-5b97fa12d9f3',
      sku: 'test',
      name: 'test',
      is_recurrent: true,
      expiration_unit: 1,
      expiration_period: 'ANNUAL',
      status: 'ACTIVE',
      prices: [],
      categories: ['Culpa voluptas.'],
      description: null,
      brief: '',
      terms: '',
    }

    jest.spyOn(httpService, 'post').mockResolvedValueOnce(responseMock)
    const store = configureStore({ reducer: productSlice.reducer })

    await store.dispatch(createProduct(formData))

    const { product } = await store.getState()

    expect(product).toEqual(state)
  })

  it('should return product not active list', async () => {
    const responseMock = {
      data: [
        {
          id: '271f85ba-68c5-4aab-b0f7-96efea0bd5dc',
          sku: 'SEGURO-VIDA-30K',
          name: 'Seguro por Fallecimiento que paga hasta $30,000',
          is_recurrent: false,
          expiration_unit: 6,
          expiration_period: 'MONTHLY',
          status: 'ACTIVE',
          prices: [
            {
              partner: 'Bamba',
              price: 13,
              currency_code: 'MXN',
            },
            {
              partner: 'Claro Pay',
              price: 75,
              currency_code: 'MXN',
            },
          ],
          categories: ['assistance', 'insurance'],
          description: [],
          brief: 'En caso de que fallezcas, tu familia recibe $30,000 mxn',
          terms: 'https://www.vivebamba.com/terminos-condiciones',
        },
      ],
      code: 0,
    }

    jest.spyOn(httpService, 'get').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: productSlice.reducer })
    await store.dispatch(getProductsNotActive())

    const { productsNotActive } = await store.getState()

    expect(productsNotActive).toEqual(responseMock)
  })

  it('should get products not active thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      products: {
        data: [],
        meta: {},
      },
      product: {},
      productsNotActive: {
        data: [],
      },
      productsByPartners: {
        data: [],
        meta: {},
      },
      productDetails: {},
    }

    const thunk = getProductsNotActive()
    await thunk(dispatch, () => state, undefined)

    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('list/productsNotActive/pending')
    expect(calls[1][0].type).toEqual('list/productsNotActive/rejected')
  })

  it('should return product active list', async () => {
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
              partner: 'Burger king',
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
              price: 534,
              currency_code: 'MXN',
            },
          ],
          categories: [],
          description: null,
          brief: '',
          terms: '',
        },
      ],
      links: {
        first: 'http://staging.bamba.tech/admin/api/v1/products?page=1',
        last: 'http://staging.bamba.tech/admin/api/v1/products?page=1',
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
            url: 'http://staging.bamba.tech/admin/api/v1/products?page=1',
            label: '1',
            active: true,
          },
          {
            url: null,
            label: 'Siguiente &raquo;',
            active: false,
          },
        ],
        path: 'http://staging.bamba.tech/admin/api/v1/products',
        per_page: 10,
        to: 2,
        total: 2,
      },
      code: 0,
    }

    jest.spyOn(httpService, 'get').mockResolvedValueOnce(responseMock)

    const store = configureStore({ reducer: productSlice.reducer })
    await store.dispatch(getProductsByPartners('Bamba'))

    const { productsByPartners } = await store.getState()

    expect(productsByPartners).toEqual(responseMock)
  })

  it('should get products active thunk request', async () => {
    const dispatch = jest.fn()
    const state = {
      products: {
        data: [],
        meta: {},
      },
      product: {},
      productsNotActive: {
        data: [],
      },
      productsByPartners: {
        data: [],
        meta: {},
      },
      productDetails: {},
    }

    const thunk = getProductsByPartners()
    await thunk(dispatch, () => state, undefined)

    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)
    expect(calls[0][0].type).toEqual('list/productsByPartner/pending')
    expect(calls[1][0].type).toEqual('list/productsByPartner/rejected')
  })
})
