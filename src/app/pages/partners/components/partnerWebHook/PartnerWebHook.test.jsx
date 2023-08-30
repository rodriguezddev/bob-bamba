import React from 'react'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import PartnerWebHook from './PartnerWebHook'
import { TestWrap } from '../../../../components/TestWrap'
import '@testing-library/jest-dom/extend-expect'
import httpService from '../../../../services/api_services/HttpService'

test('renders PartnerToken', async () => {
  const responseMock = {
    data: {
      id: '99adf37a-2b84-4d90-8b77-e84bd79912cc',
      name: 'allyzone',
      code: 'ALLYZONE',
      type: 'AGGREGATOR',
      webhook_url: 'https://webhook.site/a8766ce2-9864-4247-8d3c-47d2ce9dd87b',
      meta: null,
      webhook_scopes: [
        {
          id: '9a003ffb-c0c3-4792-89d5-a0f199b74077',
          scope: 'subscription_activated',
        },
      ],
    },
    code: 0,
  }

  const webhookScopes = {
    code: 0,
    data: {
      subscription_activated: 'Subscripción Activada',
    },
  }

  const props = {
    isShowWebhook: true,
    setIsShowWebhook: jest.fn(),
    selectedPartner: {
      id: 'a4',
      name: 'Test',
      oauth_clients: 'TEST',
    },
  }

  httpService.get = jest
    .fn()
    .mockResolvedValue(responseMock)
    .mockResolvedValueOnce(webhookScopes)

  await act(async () => {
    render(
      <TestWrap>
        <PartnerWebHook {...props} />
      </TestWrap>,
    )
  })

  const textHeader = screen.getByText('Agrega el webhook de Test')

  expect(textHeader).toBeInTheDocument(true)
})
