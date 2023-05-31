import React from 'react'
import { act } from 'react-test-renderer'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import CreateUsers from './CreateUsers'
import store from '../../../store'
import theme from '../../../theme'

import '@testing-library/jest-dom/extend-expect'
import httpService from '../../../services/api_services/HttpService'

test('renders create user view', async () => {
  const responseMock = {
    data: [
      {
        id: 'a438caaf-9745-4b19-8498-8d99800bd664',
        name: 'Aliada',
        code: 'aliada',
        type: 'SPONSOR',
        meta: null,
        company: null,
      },
      {
        id: '93efc473-ef0b-41b8-98ca-11b326b5aade',
        name: 'ALIADA',
        code: 'ALIADA',
        type: 'AGGREGATOR',
        meta: null,
        company: null,
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
      per_page: 100,
      to: 59,
      total: 59,
    },
    code: 0,
  }

  httpService.get = jest.fn().mockResolvedValue(responseMock)

  await act(() => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <CreateUsers />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )
  })

  const textHeader = screen.getByText(/Crear usuario/i)

  expect(textHeader).toHaveTextContent('Crear usuario')
})
