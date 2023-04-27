import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import { render, screen } from '@testing-library/react'
import CreateCampaigns from './CreateCampaigns'
import store from '../../../store'
import theme from '../../../theme'
import httpService from '../../../services/api_services/HttpService'
import '@testing-library/jest-dom/extend-expect'

test('renders create campaigns view', async () => {
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

  const templates = {
    code: 0,
    data: {
      text: 'Por ser parte de Bamba',
      language: 'es_MX',
      number_parameters: 0,
    },
  }

  const partners = {
    data: [
      {
        id: '2cf8ba04-6dfb-43cd-807f-b0722d7b7b9e',
        name: 'Ti rosa SA',
        code: 'TIA-ROSA-1',
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

  jest
    .spyOn(httpService, 'get')
    .mockResolvedValue(responseMock, templates, partners)

  await act(async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <CreateCampaigns />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )
  })

  const textHeader = screen.getByText(/Crear campañas/i)

  expect(textHeader).toHaveTextContent('Crear campañas')
})
