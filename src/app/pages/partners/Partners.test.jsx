import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Partners from './Partners'
import store from '../../store'
import theme from '../../theme'
import httpService from '../../services/api_services/HttpService'

import '@testing-library/jest-dom/extend-expect'

test('renders list users view', async () => {
  const responseMock = {
    data: [
      {
        id: '4bc8032d-b758-473b-91b9-2f3206419378',
        name: 'Bamba',
        code: 'bamba',
        type: 'SPONSOR',
        meta: null,
        company: {
          id: 'c5fd44be-93a6-4dea-865f-64b78d87c68b',
          name: 'Reinventando el Sistema SAPI de CV',
          email: 'hola@vivebamba.com',
          phone_number: '5555555555',
          tax_id: null,
          country_code: 'MX',
        },
      },
      {
        id: '903b5e52-bb48-49df-bcaf-5055323575e6',
        name: 'Rohan PLC',
        code: 'rohan-plc',
        type: 'AGGREGATOR',
        meta: null,
        company: {
          id: '49bd3e87-3aa0-4f93-8476-865395448166',
          name: 'Rohan PLC',
          email: 'fausto22@example.net',
          phone_number: '+18727201613',
          tax_id: null,
          country_code: 'MX',
        },
      },
    ],
    links: {
      first: 'http://staging.bamba.tech/admin/api/v1/partners?page=1',
      last: 'http://staging.bamba.tech/admin/api/v1/partners?page=1',
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
          url: 'http://staging.bamba.tech/admin/api/v1/partners?page=1',
          label: '1',
          active: true,
        },
        {
          url: null,
          label: 'Siguiente &raquo;',
          active: false,
        },
      ],
      path: 'http://staging.bamba.tech/admin/api/v1/partners',
      per_page: 10,
      to: 2,
      total: 2,
    },
    code: 0,
  }

  httpService.get = jest.fn().mockResolvedValue(responseMock)

  await act(async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Partners />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )
  })

  const textHeader = screen.getByText('Partners')

  expect(textHeader).toHaveTextContent('Partners')
})
