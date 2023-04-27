import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import CreateNoticeAccount from './CreateNoticeAccount'
import store from '../../../../store'
import theme from '../../../../theme'
import httpService from '../../../../services/api_services/HttpService'

import '@testing-library/jest-dom/extend-expect'

test('renders CreateNoticeAccount', async () => {
  const responseMock = {
    code: 0,
    data: {
      WHATSAPP: {
        providers: {
          WHATSAPP: {
            key_types: {
              account_id: {
                type: 'string',
                required: true,
              },
              phone_id: {
                type: 'string',
                required: true,
              },
            },
            meta_notification: [],
          },
        },
      },
      EMAIL: {
        providers: {
          MANDRILL: {
            key_types: {
              from_email: {
                type: 'email',
                required: true,
              },
              from_name: {
                type: 'string',
                required: true,
              },
            },
            meta_notification: {
              important: {
                type: 'boolean',
                required: false,
              },
              subject: {
                type: 'string',
                required: true,
              },
            },
          },
        },
      },
    },
  }

  httpService.get = jest.fn().mockResolvedValue(responseMock)

  await act(async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <CreateNoticeAccount />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )
  })

  const textHeader = screen.getByText('Crear cuenta de notificaciones')

  expect(textHeader).toHaveTextContent('Crear cuenta de notificaciones')
})
