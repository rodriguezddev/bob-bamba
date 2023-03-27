import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'
import ProductContainer from './ProductContainer'
import store from '../../../store'
import httpService from '../../../services/api_services/HttpService'
import '@testing-library/jest-dom'

describe('productContainer components', () => {
  it('should show alert title', async () => {
    const props = {
      assignedProducts: jest.fn(),
      partner: 'Bamba',
      productPartner: [{ id: '1', sku: '1', name: '1' }],
      setAssignedProducts: jest.fn(),
    }

    const responseMock = {
      data: [
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

    httpService.get = jest.fn().mockResolvedValue(responseMock)

    await act(async () => {
      render(
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <ProductContainer {...props} />
          </Provider>
        </ThemeProvider>,
      )
    })

    const textTitle = screen.getByText('Productos disponibles')

    expect(textTitle).toBeInTheDocument()
  })
})
