import React from 'react'
import { render, renderHook, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { act } from 'react-dom/test-utils'
import AssignAccountForm from './AssignAccountForm'
import httpService from '../../../../services/api_services/HttpService'
import '@testing-library/jest-dom/extend-expect'
import TestWrap from '../../../../components/TestWrap/TestWrap'

describe('AssignAccountForm components', () => {
  it('should show AssignAccountForm', async () => {
    const { result } = renderHook(() => useForm())
    const props = {
      accountFormHook: result.current,
    }

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

    jest.spyOn(httpService, 'get').mockResolvedValueOnce(responseMock)

    await act(async () => {
      render(
        <TestWrap>
          <AssignAccountForm {...props} />
        </TestWrap>,
      )
    })

    const textTitle = screen.getByText(/Cuentas*/)

    expect(textTitle).toBeInTheDocument()
  })
})
