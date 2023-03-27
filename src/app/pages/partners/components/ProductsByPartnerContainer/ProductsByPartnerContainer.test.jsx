import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { act } from 'react-dom/test-utils'
import theme from '../../../../theme'
import ProductsByPartnerContainer from './ProductsByPartnerContainer'
import store from '../../../../store'
import httpService from '../../../../services/api_services/HttpService'
import '@testing-library/jest-dom'

describe('ProductsByPartnerContainer components', () => {
  it('should show ProductsByPartnerContainer', async () => {
    const mockDispatch = jest.fn()

    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useDispatch: () => mockDispatch,
    }))

    const props = {
      id: '99dc7f27-594d-434f-884a-a5e0f2c38597',
      name: 'Bimbo SA',
      code: 'BIMBO-1',
      type: 'SPONSOR',
      meta: null,
      company: {
        id: '398ab10a-47c2-44c7-8c70-e41ad796af17',
        name: 'Bimbo SA',
        email: 'bimbo@fake-company.com',
        phone_number: '5212131416',
        tax_id: null,
        country_code: 'MX',
      },
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
              partner: 'Bimbo',
              price: 312,
              currency_code: 'MXN',
            },
            {
              partner: 'Burger king',
              price: 423,
              currency_code: 'MXN',
            },
            {
              partner: 'Athena Jennings',
              price: 312,
              currency_code: 'MXN',
            },
            {
              partner: 'Bamba',
              price: 534,
              currency_code: 'MXN',
            },
            {
              partner: 'April Woods',
              price: 63,
              currency_code: 'MXN',
            },
            {
              partner: 'Bimbo SA',
              price: 423,
              currency_code: 'MXN',
            },
            {
              partner: 'Angela Benson',
              price: 423,
              currency_code: 'MXN',
            },
          ],
          categories: [],
          carrier_services: [],
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
        total: 12,
      },
      code: 0,
    }

    jest.spyOn(httpService, 'get').mockResolvedValueOnce({ responseMock })

    await act(async () => {
      render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <ProductsByPartnerContainer partner={props} />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>,
      )
    })

    const paginationIcon = screen.getByTestId('FirstPageIcon')

    expect(paginationIcon).toBeInTheDocument()
  })
})
