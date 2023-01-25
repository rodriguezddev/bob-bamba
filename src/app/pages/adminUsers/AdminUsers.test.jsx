import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import AdminUsers from './AdminUsers'
import store from '../../store'
import theme from '../../theme'
import httpService from '../../services/api_services/HttpService'

import '@testing-library/jest-dom/extend-expect'

test('render list users admin view', async () => {
  const responseMock = {
    data: [
      {
        id: 'e58a18e2-e979-4819-b5a9-fd056069fcbc',
        name: 'Areli',
        lastname: 'Prueba',
        email: 'areli-admin-uno@gmail.com',
      },
      {
        id: '3ce52a46-5676-4058-9f40-2e0f4f82a0bc',
        name: 'Bamba',
        lastname: 'Admin',
        email: 'admin@vivebamba.com',
      },
      {
        id: 'a0824b3b-3564-46fc-b05d-0838131f4717',
        name: 'Nuevo',
        lastname: 'Admin',
        email: 'nn@gmail.com',
      },
    ],
    links: {
      first:
        'http://c443-2806-105e-16-66c8-7d82-f533-1c9d-ca84.ngrok.io/admin/api/v1/admins?page=1',
      last: 'http://c443-2806-105e-16-66c8-7d82-f533-1c9d-ca84.ngrok.io/admin/api/v1/admins?page=1',
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
        },
        {
          url: 'http://c443-2806-105e-16-66c8-7d82-f533-1c9d-ca84.ngrok.io/admin/api/v1/admins?page=1',
          label: '1',
        },
        {
          url: null,
          label: 'Siguiente &raquo;',
        },
      ],
      path: 'http://c443-2806-105e-16-66c8-7d82-f533-1c9d-ca84.ngrok.io/admin/api/v1/admins',
      per_page: 10,
      to: 3,
      total: 3,
    },
    code: 0,
  }

  httpService.get = jest.fn().mockResolvedValue(responseMock)

  await act(async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <AdminUsers />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )
  })

  const textHeader = screen.getByText('Usuarios administradores')

  expect(textHeader).toHaveTextContent('Usuarios administradores')
})
