import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, screen } from '@testing-library/react'
import CreateAdminPartnerUser from './CreateAdminPartnerUser'
import httpService from '../../../services/api_services/HttpService'
import { TestWrap } from '../../../components/TestWrap'
import '@testing-library/jest-dom/extend-expect'

test('renders create admin partner user view', async () => {
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

  httpService.get = jest.fn().mockResolvedValue(partners)

  await act(async () => {
    render(
      <TestWrap>
        <CreateAdminPartnerUser />
      </TestWrap>,
    )
  })

  const textHeader = screen.getByText(/Nombre(s)*/i)

  expect(textHeader).toBeInTheDocument()
})
