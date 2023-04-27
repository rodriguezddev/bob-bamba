import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import CreateNotification from './CreateNotification'
import store from '../../../store'
import theme from '../../../theme'
import '@testing-library/jest-dom/extend-expect'
import httpService from '../../../services/api_services/HttpService'

test('renders create notifications view', async () => {
  const config = {
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

  const eventModels = {
    code: 0,
    data: {
      subscription_activated: 'Activacion de subscripcion',
    },
  }

  const partners = {
    data: [
      {
        id: '39eb1887-e0dd-4989-a880-27b109bae376',
        name: 'pancito2.0',
        code: 'PAN20',
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
      to: 1,
      total: 1,
    },
    code: 0,
  }

  jest.spyOn(httpService, 'get').mockResolvedValueOnce(config)
  jest.spyOn(httpService, 'get').mockResolvedValueOnce(eventModels)
  jest.spyOn(httpService, 'get').mockResolvedValueOnce(partners)

  await act(async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <CreateNotification />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )
  })

  const textHeader = screen.getByText(/Crear notificación/i)

  expect(textHeader).toHaveTextContent('Crear notificación')
})
