import React from 'react'
import { useForm } from 'react-hook-form'
import { render, renderHook, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import FormMessage from './FormMessage'
import '@testing-library/jest-dom'
import TestWrap from '../../../../components/TestWrap/TestWrap'
import httpService from '../../../../services/api_services/HttpService'

describe('show FormMessage', () => {
  const { result } = renderHook(() => useForm())
  const formMessageHook = result.current

  it('should show FormMessage', async () => {
    const partners = {
      data: [
        {
          id: '23ccc494-639d-4dc7-b5ca-7ed11a8f2c4a',
          name: 'Agente Bamba',
          code: 'AGENTE-BAMBA',
          type: 'AGGREGATOR',
          meta: {
            whatsapp_number: ['5625774041', '5625775126'],
          },
          company: {
            id: 'e5eed061-379b-4fa1-9bf9-2b02024f4c28',
            name: 'Bamba',
            email: 'hola-2@vivebamba.com',
            phone_number: '5527538025',
            tax_id: null,
            country_code: 'MX',
          },
          oauth_clients: [
            {
              id: '9973006e-2c60-4224-a8db-82ed88ed5d70',
              secret: 'xulKXEqj5sGQvopi3vanFJHxKItqpz3Vyc8CRyVW',
              scopes: null,
            },
          ],
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
    jest.spyOn(httpService, 'get').mockResolvedValueOnce(partners)

    await act(async () => {
      render(
        <TestWrap>
          <FormMessage formMessageHook={formMessageHook} update />
        </TestWrap>,
      )
    })

    const textInput = screen.getByText('Partner*')

    expect(textInput).toBeInTheDocument()
  })
})
