import React from 'react'
import { Provider } from 'react-redux'
import Router from 'react-router'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import store from '../../../store'
import theme from '../../../theme'
import UserDetails from './UserDetails'
import httpService from '../../../services/api_services/HttpService'
import '@testing-library/jest-dom/extend-expect'

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn(),
}))

test('renders user view', async () => {
  const responseMock = {
    data: {
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
          id: '38d512c0-c83b-4247-81ec-ccfe71e1dfa8',
          status: 'CANCELED',
          products: [],
          activated_at: '2023-01-30T19:23:52.000000Z',
          renew_every: 6,
          renew_period: 'MONTHLY',
          next_renewal_at: null,
          certificate_file: '',
        },
      ],
    },
    code: 0,
  }

  const productsNotActive = {
    data: [
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
        brief: 'Si te accidentas, te reembolsa hasta $25,000 mxn',
        terms: 'https://www.vivebamba.com/terminos-condiciones',
      },
    ],
    code: 0,
  }

  jest
    .spyOn(Router, 'useParams')
    .mockReturnValue({ id: '7ce0f01d-c2b6-4312-b3cc-021abf4f4390' })

  httpService.get = jest
    .fn()
    .mockResolvedValue(responseMock)
    .mockResolvedValueOnce(productsNotActive)

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

  const text = screen.getByText('Detalles del usuario')

  expect(text).toBeInTheDocument()
})
