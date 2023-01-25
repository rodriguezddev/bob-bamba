import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Users from './Users'
import store from '../../store'
import theme from '../../theme'
import httpService from '../../services/api_services/HttpService'

import '@testing-library/jest-dom/extend-expect'

test('renders list users view', async () => {
  const responseMock = {
    code: 0,
    data: [
      {
        id: '6f5fd268-b7fa-44d3-9867-a53f451a1e87',
        name: 'Abe',
        lastname: 'Altenwerth',
        photo: '/storage/profiles/c4ca4238a0b923820dcc509a6f75849b/1360ef19eb2b34d7700e8db9a03bbb30.jpeg?v=1666304702',
        birthdate: '1996-11-27',
        gender: 'O',
        email: 'alanis.pouros@example.net',
        tax_id: 'WADH113511OEA',
        personal_id: 'JKIP925031TKJWHR93',
        subscriptions: [],
      },
      {
        id: '754ffde1-6cf3-40f8-956f-ea9a90e6c872',
        name: 'Jona',
        lastname: 'Prueba',
        photo: '',
        birthdate: '1993-11-12',
        gender: 'M',
        email: 'prueba1@gmail.com',
        tax_id: 'asas1212',
        personal_id: 'asas1313',
        subscriptions: [],
      },
    ],
    links: {
      first: 'http://staging.bamba.tech/admin/api/v1/users?page=1',
      last: 'http://staging.bamba.tech/admin/api/v1/users?page=1',
      prev: null,
      next: null,
    },
    meta: {
      current_page: 1,
      from: 1,
      last_page: 1,
      links: [],
      path: 'http://staging.bamba.tech/admin/api/v1/users',
      per_page: 10,
      to: 2,
      total: 2,
    },
  }

  httpService.get = jest.fn().mockResolvedValue(responseMock)

  await act(async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Users />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )
  })

  const textHeader = screen.getByText('Usuarios')

  expect(textHeader).toHaveTextContent('Usuarios')
})
