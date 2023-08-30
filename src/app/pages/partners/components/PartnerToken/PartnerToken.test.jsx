import React from 'react'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import PartnerToken from './PartnerToken'
import { TestWrap } from '../../../../components/TestWrap'
import '@testing-library/jest-dom/extend-expect'
import httpService from '../../../../services/api_services/HttpService'

test('renders PartnerToken', async () => {
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
    handleDialog: jest.fn(),
    selectedPartner: {
      id: 'a4',
      name: 'Test',
      oauth_clients: 'TEST',
    },
    isShowToken: true,
  }

  httpService.get = jest.fn().mockResolvedValue(responseMock)

  await act(async () => {
    render(
      <TestWrap>
        <PartnerToken {...props} />
      </TestWrap>,
    )
  })

  const textHeader = screen.getByText('Token de Test')

  expect(textHeader).toHaveTextContent('Token de Test')
})
