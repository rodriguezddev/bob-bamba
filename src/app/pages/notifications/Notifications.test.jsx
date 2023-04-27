import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Notifications from './Notifications'
import store from '../../store'
import theme from '../../theme'
import httpService from '../../services/api_services/HttpService'

import '@testing-library/jest-dom/extend-expect'

test('renders list users view', async () => {
  const responseMock = {
    data: [
      {
        id: 'cf2dffe7-2b3d-4fbb-a9bf-532c60b49df7',
        name: 'test notification 4',
        model_type: 'subscription',
        event_type: 'ACTIVATED',
        template: 'aviso_actualizacion_beneficios',
        template_lang: 'en_US',
        meta: {
          subject: 'hey',
          important: false,
        },
        partner: {
          id: '6794d758-a99d-41ef-9e8b-a9ad29e73d12',
          name: 'Angela Benson',
          code: 'ILLO-FUGA',
          type: 'DISTRIBUTOR',
          meta: null,
        },
        notice_account: {
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
      },
    ],
    links: {
      first:
        'http://staging.bamba.tech/admin/api/v1/notification-configurations?page=1',
      last: 'http://staging.bamba.tech/admin/api/v1/notification-configurations?page=1',
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
          url: 'http://staging.bamba.tech/admin/api/v1/notification-configurations?page=1',
          label: '1',
          active: true,
        },
        {
          url: null,
          label: 'Siguiente &raquo;',
          active: false,
        },
      ],
      path: 'http://staging.bamba.tech/admin/api/v1/notification-configurations',
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
            <Notifications />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )
  })

  const textHeader = screen.getByText('Notificaciones')

  expect(textHeader).toHaveTextContent('Notificaciones')
})
