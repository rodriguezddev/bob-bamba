import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Products from './Products'
import store from '../../store'
import theme from '../../theme'
import httpService from '../../services/api_services/HttpService'

import '@testing-library/jest-dom/extend-expect'

test('renders list users view', async () => {
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
      {
        id: '081a43f5-5017-4adb-b014-ae96b0fbe735',
        sku: 'magni-placeat-autem',
        name: 'Magni placeat autem.',
        is_recurrent: false,
        expiration_unit: 1,
        expiration_period: 'MONTHLY',
        status: 'INACTIVE',
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

  httpService.get = jest.fn().mockResolvedValue(responseMock)

  await act(async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Products />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )
  })

  const textHeader = screen.getByText('Productos')

  expect(textHeader).toHaveTextContent('Productos')
})
