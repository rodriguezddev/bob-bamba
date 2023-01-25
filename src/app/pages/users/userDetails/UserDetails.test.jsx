import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import store from '../../../store'
import theme from '../../../theme'
import httpService from '../../../services/api_services/HttpService'
import '@testing-library/jest-dom/extend-expect'
import UserDetails from './UserDetails'

test('renders user view', async () => {
  const responseMock = {
    data: {
      id: 'd48e2f13-503a-44df-a362-aee6c4de464b',
      name: 'Chris',
      lastname: 'Gorczany',
      birthdate: '1970-05-31',
      gender: 'F',
      email: 'tierra84@example.net',
      tax_id: 'BNIY169754NKL',
      personal_id: 'ZIFJ964199LUPXTR54',
      subscriptions: [
        {
          id: '46edf55e-ea6e-443c-b07d-3f8e3798712b',
          status: 'ACTIVE',
          products: [
            {
              id: '91216cb0-5d2c-4720-b389-96c52ddd2466',
              sku: 'voluptatem-ex',
              name: 'Voluptatem ex.',
              is_recurrent: true,
              expiration_unit: 7,
              expiration_period: 'MONTHLY',
              status: 'OUT_STOCK',
              prices: [
                {
                  partner: 'Bamba',
                  price: 1905.99,
                  currency_code: 'MXN',
                },
              ],
              categories: ['Inventore quo quo.'],
              description: null,
              brief: '',
              terms: '',
            },
          ],
          activated_at: '2022-10-11 11:09:29',
          renew_every: 7,
          renew_period: 'MONTHLY',
          next_renewal_at: null,
          certificate_file: '',
        },
      ],
    },
    code: 0,
  }

  httpService.get = jest.fn().mockResolvedValue(responseMock)

  await act(async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <UserDetails />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )
  })

  const buttons = screen.getAllByRole('button')

  expect(buttons).toHaveLength(3)
})

test('should show subscriptions details', async () => {
  const responseMock = {
    data: {
      id: 'd48e2f13-503a-44df-a362-aee6c4de464b',
      name: 'Chris',
      lastname: 'Gorczany',
      birthdate: '1970-05-31',
      gender: 'F',
      email: 'tierra84@example.net',
      tax_id: 'BNIY169754NKL',
      personal_id: 'ZIFJ964199LUPXTR54',
      subscriptions: [
        {
          id: '46edf55e-ea6e-443c-b07d-3f8e3798712b',
          status: 'ACTIVE',
          products: [
            {
              id: '91216cb0-5d2c-4720-b389-96c52ddd2466',
              sku: 'voluptatem-ex',
              name: 'Voluptatem ex.',
              is_recurrent: true,
              expiration_unit: 7,
              expiration_period: 'MONTHLY',
              status: 'OUT_STOCK',
              prices: [
                {
                  partner: 'Bamba',
                  price: 1905.99,
                  currency_code: 'MXN',
                },
              ],
              categories: ['Inventore quo quo.'],
              description: null,
              brief: '',
              terms: '',
            },
          ],
          activated_at: '2022-10-11 11:09:29',
          renew_every: 7,
          renew_period: 'MONTHLY',
          next_renewal_at: null,
          certificate_file: '',
        },
      ],
    },
    code: 0,
  }

  httpService.get = jest.fn().mockResolvedValue(responseMock)

  await act(async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <UserDetails />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )
  })

  const subscriptionTitle = screen.getByText('Suscripciones')

  expect(subscriptionTitle).toHaveTextContent('Suscripciones')
})
