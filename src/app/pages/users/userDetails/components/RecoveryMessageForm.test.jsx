import React from 'react'
import { Provider } from 'react-redux'
import { act, render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import '@testing-library/jest-dom'
import RecoveryMessageForm from './RecoveryMessageForm'
import theme from '../../../../theme'
import store from '../../../../store'
import httpService from '../../../../services/api_services/HttpService'

describe('RecoveryMessageForm component', () => {
  it('should show RecoveryMessageForm', async () => {
    const props = {
      handleShowForm: jest.fn(),
      open: true,
      user: {
        cellphone: '55555555',
      },
    }

    const responseMock = {
      code: 0,
      data: {
        use_options_message: {
          text: 'Estas son las opciones que tienes para hacer uso del agente:',
          language: 'es_MX',
          number_parameters: 0,
        },
      },
    }

    httpService.get = jest.fn().mockResolvedValue(responseMock)

    await act(async () => {
      render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <RecoveryMessageForm {...props} />
          </ThemeProvider>
        </Provider>,
      )
    })

    const text = screen.getByText('Mensaje de recuperación')

    expect(text).toBeInTheDocument()
  })
})
