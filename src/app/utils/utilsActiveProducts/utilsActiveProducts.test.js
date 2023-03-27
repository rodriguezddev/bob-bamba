import * as utilsActiveProducts from '.'

describe('test functions utils validation products', () => {
  it('get validation products', () => {
    const products = {
      data: [
        {
          id: '2175ea81-97c0-40f3-8a2e-33f34dee3094',
          sku: 'test-daniel',
          name: 'Producto Test Daniel',
          is_recurrent: false,
          expiration_unit: 1,
          expiration_period: 'DAY',
          status: 'ACTIVE',
          prices: [],
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
          prices: [],
          categories: [],
          description: null,
          brief: '',
          terms: '',
        },
      ],
      links: {
        first: 'http://staging.bamba.tech/admin/api/v1/products?page=1',
        last: 'http://staging.bamba.tech/admin/api/v1/products?page=3',
        prev: null,
        next: 'http://staging.bamba.tech/admin/api/v1/products?page=2',
      },
      meta: {
        current_page: 1,
        from: 1,
        last_page: 3,
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
            url: 'http://staging.bamba.tech/admin/api/v1/products?page=3',
            label: '3',
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
        total: 29,
      },
      code: 0,
    }

    const selectedProducts = [
      {
        id: 'b173c25e-27ec-4170-89f2-40a6cbed5e2b',
        sku: 'bamba-pan',
        name: 'pan',
        is_recurrent: true,
        expiration_unit: 1,
        expiration_period: 'ANNUAL',
        status: 'ACTIVE',
        prices: [],
        categories: [],
        description: null,
        brief: '',
        terms: '',
      },
    ]

    expect(
      utilsActiveProducts.handleAvailableProducts(products, selectedProducts),
    ).toEqual([
      {
        id: '2175ea81-97c0-40f3-8a2e-33f34dee3094',
        sku: 'test-daniel',
        name: 'Producto Test Daniel',
        is_recurrent: false,
        expiration_unit: 1,
        expiration_period: 'DAY',
        status: 'ACTIVE',
        prices: [],
        categories: [],
        description: null,
        brief: '',
        terms: '',
      },
    ])
  })

  it('get validation Active products', () => {
    const productsByPartner = {
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
              price: 534,
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

    const formattedProducts = [
      {
        sku: 'test-daniel',
        currency_code: 'MXN',
        price: 534,
        isShowButton: false,
      },
      {
        sku: 'bamba-pan',
        currency_code: 'MXN',
        price: 534,
        isShowButton: false,
      },
    ]

    const selectedProducts = [
      {
        sku: 'test-daniel',
        currency_code: 'MXN',
        price: 534,
        isShowButton: false,
      },
      {
        sku: 'bamba-pan',
        currency_code: 'MXN',
        price: 534,
        isShowButton: false,
      },
    ]

    expect(
      utilsActiveProducts.handleActiveProducts(
        selectedProducts,
        formattedProducts,
        productsByPartner,
      ),
    ).toEqual([
      {
        sku: 'test-daniel',
        currency_code: 'MXN',
        price: 534,
        isShowButton: false,
      },
      {
        sku: 'bamba-pan',
        currency_code: 'MXN',
        price: 534,
        isShowButton: false,
      },
    ])
  })

  it('get validation format products', () => {
    const productsByPartners = {
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
              price: 534,
              currency_code: 'MXN',
            },
            {
              partner: 'Angela Benson',
              price: 423,
              currency_code: 'MXN',
            },
          ],
          categories: [],
          description: null,
          brief: '',
          terms: '',
        },
      ],
    }

    const partner = 'Bamba'

    expect(
      utilsActiveProducts.handleProductsFormat(productsByPartners, partner),
    ).toEqual([
      {
        sku: 'test-daniel',
        currency_code: 'MXN',
        price: 534,
        isShowButton: false,
      },
    ])
  })
})
