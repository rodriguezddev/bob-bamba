import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import store from '../../../../store'
import theme from '../../../../theme'
import httpService from '../../../../services/api_services/HttpService'
import ProductDetails from './ProductDetails'
import '@testing-library/jest-dom/extend-expect'

test('renders product not active view', async () => {
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

  await act(async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <ProductDetails productId='74408485-5e8d-48ea-95d7-f4313dec3873' />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )
  })

  const text = screen.getByText('Carrier services')

  expect(text).toBeInTheDocument()
})
