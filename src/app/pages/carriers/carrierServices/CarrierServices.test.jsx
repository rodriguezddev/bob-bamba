import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import CarrierServices from './CarrierServices'
import store from '../../../store'
import theme from '../../../theme'
import httpService from '../../../services/api_services/HttpService'
import '@testing-library/jest-dom/extend-expect'

test('renders list users view', async () => {
  const responseMock = {
    data: [
      {
        id: 'cb58d91f-be3d-4f0f-91b7-1877a19e2270',
        name: 'Consultas con Médico Especialista x2',
        sku: 'BAMBA-ESPECIALISTA-PAQ-2',
        cost_per_year: 0,
        cost_per_month: 0,
        is_enabled: true,
        carrier: {
          id: '6c024359-72bd-49e7-a6fc-610edb84e20d',
          name: 'BAMBA',
          code: 'BAMBA',
          is_enabled: true,
        },
        category: {
          id: 'fd95f695-f98c-4029-a6f2-a7827e9ff42e',
          name: 'assistance',
          code: 'ASSISTANCE',
        },
      },
    ],
    links: {
      first: 'http://staging.bamba.tech/admin/api/v1/carrier-services?page=1',
      last: 'http://staging.bamba.tech/admin/api/v1/carrier-services?page=1',
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
          url: 'http://staging.bamba.tech/admin/api/v1/carrier-services?page=1',
          label: '1',
          active: true,
        },
        {
          url: null,
          label: 'Siguiente &raquo;',
          active: false,
        },
      ],
      path: 'http://staging.bamba.tech/admin/api/v1/carrier-services',
      per_page: 10,
      to: 9,
      total: 9,
    },
    code: 0,
  }

  httpService.get = jest.fn().mockResolvedValue(responseMock)

  await act(async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <CarrierServices />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )
  })

  const textHeader = screen.getByText('Carrier services')

  expect(textHeader).toHaveTextContent('Carrier services')
})
