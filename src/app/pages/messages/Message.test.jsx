import React from 'react'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Messages from './Messages'
import httpService from '../../services/api_services/HttpService'
import '@testing-library/jest-dom/extend-expect'
import TestWrap from '../../components/TestWrap/TestWrap'

test('renders list message view', async () => {
  const responseMock = {
    data: [
      {
        id: 1,
        partner_id: '4bc8032d-b758-473b-91b9-2f3206419378',
        type: 'welcome',
        message_key: 'welcome',
        message: '*Bienvenido a tu Programa de Seguros y Asistencias Bamba',
        unidentified_user: false,
        partner: {
          id: '4bc8032d-b758-473b-91b9-2f3206419378',
          name: 'Bamba',
          code: 'BAMBA',
          type: 'SPONSOR',
          meta: {
            whatsapp_number: ['5625774041'],
          },
        },
      },
    ],
    links: {
      first:
        'http://staging.bamba.tech/admin/api/v1/configurable-messages?page=1',
      last: 'http://staging.bamba.tech/admin/api/v1/configurable-messages?page=3',
      prev: null,
      next: 'http://staging.bamba.tech/admin/api/v1/configurable-messages?page=2',
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
          url: 'http://staging.bamba.tech/admin/api/v1/configurable-messages?page=1',
          label: '1',
          active: true,
        },
      ],
      path: 'http://staging.bamba.tech/admin/api/v1/configurable-messages',
      per_page: 10,
      to: 10,
      total: 1,
    },
  }

  httpService.get = jest.fn().mockResolvedValue(responseMock)

  await act(async () => {
    render(
      <TestWrap>
        <Messages />
      </TestWrap>,
    )
  })

  const textHeader = screen.getByText('Gestor de mensajes')

  expect(textHeader).toHaveTextContent('Gestor de mensajes')
})
