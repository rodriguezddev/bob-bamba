import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import store from '../../../../../store'
import theme from '../../../../../theme'
import httpService from '../../../../../services/api_services/HttpService'
import ProductsNotActive from './ProductsNotActive'
import '@testing-library/jest-dom/extend-expect'

test('renders product not active view', async () => {
  const responseMock = {
    data: [
      {
        id: '99dc8891-f60d-4755-b99b-ae4994bf4bc9',
        sku: 'vida-bamba',
        name: 'seguro de vida',
        is_recurrent: true,
        expiration_unit: 1,
        expiration_period: 'ANNUAL',
        status: 'ACTIVE',
        prices: [
          {
            partner: 'Bamba',
            price: 999.5,
            currency_code: 'MXN',
          },
        ],
        categories: [],
        description: null,
        brief: '',
        terms: '',
      },
    ],
    code: 0,
  }

  httpService.get = jest.fn().mockResolvedValue(responseMock)

  await act(async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <ProductsNotActive userId='1179de8b-6c92-41c3-b595-2dcacbaa659c' />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )
  })

  const text = screen.getByText('Productos sin contratar')

  expect(text).toBeInTheDocument()
})
