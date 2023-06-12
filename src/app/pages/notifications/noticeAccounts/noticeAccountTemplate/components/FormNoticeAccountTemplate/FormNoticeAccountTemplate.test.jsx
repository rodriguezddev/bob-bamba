import React from 'react'
import { render, renderHook, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { useForm } from 'react-hook-form'
import FormNoticeAccountTemplate from './FormNoticeAccountTemplate'
import httpService from '../../../../../../services/api_services/HttpService'

import '@testing-library/jest-dom/extend-expect'
import { TestWrap } from '../../../../../../components/TestWrap'

test('renders FormNoticeAccountTemplate', async () => {
  const { result } = renderHook(() => useForm())
  const props = {
    templateForm: result.current,
  }
  const responseMock = {
    data: [
      {
        id: '9e8cbe72-8865-473a-a5d0-a99be3cee957',
        name: 'Agente Bamba (5625774041)',
        keys: {
          token: 'EAD',
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
      to: 7,
      total: 7,
    },
    code: 0,
  }

  httpService.get = jest.fn().mockResolvedValue(responseMock)

  await act(async () => {
    render(
      <TestWrap>
        <FormNoticeAccountTemplate {...props} />
      </TestWrap>,
    )
  })

  const textHeader = screen.getByText('Nombre*')

  expect(textHeader).toHaveTextContent('Nombre*')
})
