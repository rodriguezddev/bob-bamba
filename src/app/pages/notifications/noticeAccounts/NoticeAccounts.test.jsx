import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import NoticeAccounts from './NoticeAccounts'
import store from '../../../store'
import theme from '../../../theme'
import httpService from '../../../services/api_services/HttpService'

import '@testing-library/jest-dom/extend-expect'

test('renders list notice account', async () => {
  const responseMock = {
    data: [
      {
        id: '7c775d03-f6cb-48cb-8571-d2c1ab282860',
        name: 'Agente Bamba (5625774041)',
        keys: {
          phone_id: '116422888031263',
          account_id: '114901301537529',
        },
        is_enabled: true,
        provider: 'WHATSAPP',
        notification_type: 'WHATSAPP',
      },
      {
        id: '50e6cbd4-6a13-4cf7-ab8b-063c314362fc',
        name: 'Bamba (5561190995)',
        keys: {
          phone_id: '112798028393815',
          account_id: '116616088008300',
        },
        is_enabled: true,
        provider: 'WHATSAPP',
        notification_type: 'WHATSAPP',
      },
    ],
    links: {
      first: 'http://staging.bamba.tech/admin/api/v1/notice-accounts?page=1',
      last: 'http://staging.bamba.tech/admin/api/v1/notice-accounts?page=1',
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
          url: 'http://staging.bamba.tech/admin/api/v1/notice-accounts?page=1',
          label: '1',
          active: true,
        },
        {
          url: null,
          label: 'Siguiente &raquo;',
          active: false,
        },
      ],
      path: 'http://staging.bamba.tech/admin/api/v1/notice-accounts',
      per_page: 10,
      to: 5,
      total: 5,
    },
    code: 0,
  }

  httpService.get = jest.fn().mockResolvedValue(responseMock)

  await act(async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <NoticeAccounts />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )
  })

  const textHeader = screen.getByText('Cuenta de Notificaciones')

  expect(textHeader).toHaveTextContent('Cuenta de Notificaciones')
})
