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
        id: '8827daa2-78ea-4d00-af5f-c2dc7eba13c7',
        template: 'bienvenida_symplifica',
        template_lang: 'es_MX',
        account_name: 'bamba_attendance',
        send_date: '2023-03-16T06:00:00.000000Z',
        users: [],
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
