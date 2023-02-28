import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import store from '../../../../store'
import theme from '../../../../theme'
import httpService from '../../../../services/api_services/HttpService'
import CreateCarrierService from './CreateCarrierServices'
import '@testing-library/jest-dom/extend-expect'

test('renders create carrier services view', async () => {
  const carrierMock = {
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
      to: 3,
      total: 3,
    },
  }

  const categoryMock = {
    data: [
      {
        id: '504b73dc-1073-492f-b9ee-975fa8c31f62',
        name: 'Id quis consequuntur.',
        code: 'id-quis-consequuntur',
      },
      {
        id: 'dfb724a6-1182-4264-b827-de5d679a514b',
        name: 'Doloribus aut ipsum.',
        code: 'doloribus-aut-ipsum',
      },
    ],
    code: 0,
  }

  jest.spyOn(httpService, 'get').mockResolvedValueOnce(carrierMock)
  jest.spyOn(httpService, 'get').mockResolvedValueOnce(categoryMock)

  await act(async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <CreateCarrierService />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )
  })

  const textHeader = screen.getByText(/Crear carrier services/i)

  expect(textHeader).toHaveTextContent('Crear carrier services')
})
