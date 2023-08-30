import React from 'react'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import AdminPartnerUsers from './AdminPartnerUsers'
import httpService from '../../services/api_services/HttpService'

import '@testing-library/jest-dom/extend-expect'
import { TestWrap } from '../../components/TestWrap'

test('renders list admin partner users view', async () => {
  const responseMock = {
    data: [
      {
        id: '998f2947-1e24-40da-92aa-6c575486a4e0',
        name: 'Acton Baker',
        lastname: 'Barber',
        second_lastname: 'Frazier',
        email: 'rodago_x@hotmail.com',
        partner: {
          id: '998f2946-f6c7-46ec-a733-067eb30b79c1',
          name: 'Serrano Carroll Plc',
          code: 'SERRANO-CARROLL-PLC',
          type: 'AGGREGATOR',
          meta: null,
        },
      },
      {
        id: '99adeebf-0f8d-4f56-a13a-975bcb29d57c',
        name: 'Alberto',
        lastname: 'Ramírez',
        second_lastname: null,
        email: 'carlos@vivebamba.com',
        partner: {
          id: '99adeebe-edd7-4ecf-a268-9bc88af19d53',
          name: "Camara's org",
          code: 'CAMARAS-ORG',
          type: 'AGGREGATOR',
          meta: null,
        },
      },
    ],
    links: {},
    meta: {
      current_page: 1,
      from: 1,
      last_page: 7,
      links: [
        {
          url: null,
          label: '&laquo; Anterior',
          active: false,
        },
        {
          url: 'http://staging.bamba.tech/admin/api/v1/admin-partner-users?page=1',
          label: '1',
          active: true,
        },
        {
          url: 'http://staging.bamba.tech/admin/api/v1/admin-partner-users?page=2',
          label: '2',
          active: false,
        },
        {
          url: 'http://staging.bamba.tech/admin/api/v1/admin-partner-users?page=3',
          label: '3',
          active: false,
        },
        {
          url: 'http://staging.bamba.tech/admin/api/v1/admin-partner-users?page=4',
          label: '4',
          active: false,
        },
        {
          url: 'http://staging.bamba.tech/admin/api/v1/admin-partner-users?page=5',
          label: '5',
          active: false,
        },
        {
          url: 'http://staging.bamba.tech/admin/api/v1/admin-partner-users?page=6',
          label: '6',
          active: false,
        },
        {
          url: 'http://staging.bamba.tech/admin/api/v1/admin-partner-users?page=7',
          label: '7',
          active: false,
        },
        {
          url: 'http://staging.bamba.tech/admin/api/v1/admin-partner-users?page=2',
          label: 'Siguiente &raquo;',
          active: false,
        },
      ],
      path: 'http://staging.bamba.tech/admin/api/v1/admin-partner-users',
      per_page: 10,
      to: 10,
      total: 61,
    },
    code: 0,
  }

  httpService.get = jest.fn().mockResolvedValue(responseMock)

  await act(async () => {
    render(
      <TestWrap>
        <AdminPartnerUsers />
      </TestWrap>,
    )
  })

  const textHeader = screen.getByText('Usuarios admin partners')

  expect(textHeader).toBeInTheDocument()
})
