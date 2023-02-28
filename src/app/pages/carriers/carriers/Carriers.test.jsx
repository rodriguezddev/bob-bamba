import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import store from '../../../store'
import theme from '../../../theme'
import Carriers from './Carriers'
import httpService from '../../../services/api_services/HttpService'
import '@testing-library/jest-dom/extend-expect'

test('renders list users view', async () => {
  const responseMock = {
    data: [
      {
        id: '6c024359-72bd-49e7-a6fc-610edb84e20d',
        name: 'BAMBA',
        code: 'BAMBA',
        is_enabled: true,
      },
    ],
    links: {
      first: 'http://staging.bamba.tech/admin/api/v1/carriers?page=1',
      last: 'http://staging.bamba.tech/admin/api/v1/carriers?page=1',
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
          url: 'http://staging.bamba.tech/admin/api/v1/carriers?page=1',
          label: '1',
          active: true,
        },
        {
          url: null,
          label: 'Siguiente &raquo;',
          active: false,
        },
      ],
      path: 'http://staging.bamba.tech/admin/api/v1/carriers',
      per_page: 10,
      to: 5,
      total: 5,
    },
  }

  httpService.get = jest.fn().mockResolvedValue(responseMock)

  await act(async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Carriers />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )
  })

  const textHeader = screen.getByText('Carriers')

  expect(textHeader).toHaveTextContent('Carriers')
})
