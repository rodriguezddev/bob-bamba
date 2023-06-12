import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import NoticeAccountTemplate from './NoticeAccountTemplate'

import '@testing-library/jest-dom/extend-expect'
import httpService from '../../../../services/api_services/HttpService'
import store from '../../../../store'
import theme from '../../../../theme'

test('renders list notice account', async () => {
  const responseMock = {
    data: [
      {
        id: '702448a8-9fb5-442c-9094-cf7b2f550c85',
        name: 'prueba',
        content: 'prueba \n 😊',
        lang: 'es',
      },
    ],
    links: {
      first:
        'http://staging.bamba.tech/admin/api/v1/notice-account-templates?page=1',
      last: 'http://staging.bamba.tech/admin/api/v1/notice-account-templates?page=1',
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
          url: 'http://staging.bamba.tech/admin/api/v1/notice-account-templates?page=1',
          label: '1',
          active: true,
        },
        {
          url: null,
          label: 'Siguiente &raquo;',
          active: false,
        },
      ],
      path: 'http://staging.bamba.tech/admin/api/v1/notice-account-templates',
      per_page: 10,
      to: 1,
      total: 1,
    },
    code: 0,
  }

  httpService.get = jest.fn().mockResolvedValue(responseMock)

  await act(async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <NoticeAccountTemplate />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )
  })

  const textHeader = screen.getByText('Plantillas de cuentas de notificaciones')

  expect(textHeader).toHaveTextContent(
    'Plantillas de cuentas de notificaciones',
  )
})
