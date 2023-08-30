import React from 'react'
import { render, renderHook, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { useForm } from 'react-hook-form'
import PartnerTokenForm from './PartnerTokenForm'
import { TestWrap } from '../../../../components/TestWrap'
import httpService from '../../../../services/api_services/HttpService'
import '@testing-library/jest-dom/extend-expect'

test('renders PartnerTokenForm', async () => {
  const { result } = renderHook(() => useForm())
  const responseMock = {
    data: {
      id: '99bba679-3262-432b-99a1-eb756c4713bc',
      name: 'Wall',
      code: 'WALL',
      type: 'AGGREGATOR',
      company: null,
      meta: {
        notice_account: {
          id: '9e8cbe72-8865-473a-a5d0-a99be3cee957',
          assigned: true,
        },
      },
      oauth_clients: [
        {
          id: '99e84e8d-4c7b-4bb5-ac97-60230a60509f',
          secret: 'p4iQlROIzUCMXNz8SqbLxoxsUX0uyUFiCyVEDZrY',
          scopes: null,
          type: 'PASSWORD',
        },
      ],
    },
    code: 0,
  }

  const props = {
    handleCancelDialog: jest.fn(),
    selectedPartner: {
      id: 'a4',
      name: 'Test',
      oauth_clients: 'TEST',
    },
    tokenPartnerForm: result.current,
  }

  httpService.get = jest.fn().mockResolvedValue(responseMock)

  await act(async () => {
    render(
      <TestWrap>
        <PartnerTokenForm {...props} />
      </TestWrap>,
    )
  })

  const textHeader = screen.getByText('Crear Token')

  expect(textHeader).toBeInTheDocument()
})
