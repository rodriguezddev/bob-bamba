import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Campaigns from './Campaigns'
import store from '../../store'
import theme from '../../theme'
import httpService from '../../services/api_services/HttpService'
import '@testing-library/jest-dom/extend-expect'

test('renders list users view', async () => {
  const responseMock = {
    data: [
      {
        id: '9e5aa558-9836-4c0f-86b3-0c6811268862',
        template: 'conversacionales_realidad',
        template_lang: 'es_MX',
        send_date: '30-04-2023 00:00',
        sent: false,
        notice_account: {
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
      },
    ],
    links: {
      first:
        'http://staging.bamba.tech/admin/api/v1/newsletter-messages?page=1',
      last: 'http://staging.bamba.tech/admin/api/v1/newsletter-messages?page=2',
      prev: null,
      next: 'http://staging.bamba.tech/admin/api/v1/newsletter-messages?page=2',
    },
    meta: {
      current_page: 1,
      from: 1,
      last_page: 2,
      links: [
        {
          url: null,
          label: '&laquo; Anterior',
          active: false,
        },
        {
          url: 'http://staging.bamba.tech/admin/api/v1/newsletter-messages?page=1',
          label: '1',
          active: true,
        },
        {
          url: 'http://staging.bamba.tech/admin/api/v1/newsletter-messages?page=2',
          label: '2',
          active: false,
        },
        {
          url: 'http://staging.bamba.tech/admin/api/v1/newsletter-messages?page=2',
          label: 'Siguiente &raquo;',
          active: false,
        },
      ],
      path: 'http://staging.bamba.tech/admin/api/v1/newsletter-messages',
      per_page: 10,
      to: 10,
      total: 15,
    },
  }

  httpService.get = jest.fn().mockResolvedValue(responseMock)

  await act(async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Campaigns />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )
  })

  const textHeader = screen.getByText('Campañas')

  expect(textHeader).toHaveTextContent('Campañas')
})
