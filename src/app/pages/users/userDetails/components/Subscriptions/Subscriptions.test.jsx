import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import store from '../../../../../store'
import theme from '../../../../../theme'
import httpService from '../../../../../services/api_services/HttpService'
import Subscriptions from './Subscriptions'
import '@testing-library/jest-dom/extend-expect'

test('should show subscriptions details', async () => {
  const responseMock = {
    id: '7ce0f01d-c2b6-4312-b3cc-021abf4f4390',
    name: 'Alberto',
    lastname: 'Gonzalez',
    second_lastname: 'Candela',
    photo: null,
    birthdate: '14-04-1976',
    gender: 'M',
    email: 'agcandela@gmail.com',
    cellphone: '5591989429',
    tax_id: 'GOCA760414RU3',
    personal_id: null,
    metadata: null,
    subscriptions: [
      {
        id: '459a3571-d404-44ac-a193-161e6f1d90f8',
        status: 'ACTIVE',
        products: [
          {
            id: '74408485-5e8d-48ea-95d7-f4313dec3873',
            sku: 'SEGURO-ACCIDENTES-25K',
            name: 'Seguro de Accidentes',
            is_recurrent: false,
            expiration_unit: 6,
            expiration_period: 'MONTHLY',
            status: 'ACTIVE',
            prices: [],
            categories: ['insurance', 'assistance'],
            description: [],
            brief: null,
            terms: null,
          },
        ],
        activated_at: '2023-02-13T06:00:00.000000Z',
        renew_every: 6,
        renew_period: 'MONTHLY',
        next_renewal_at: '2023-08-12T06:00:00.000000Z',
        certificate_file: '',
      },
    ],
  }

  httpService.get = jest.fn().mockResolvedValue(responseMock)

  await act(async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Subscriptions user={responseMock} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )
  })

  const subscriptionTitle = screen.getAllByText('Suscripciones')

  expect(subscriptionTitle[0]).toHaveTextContent('Suscripciones')
})
