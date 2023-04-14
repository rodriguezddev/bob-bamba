import React from 'react'
import { Provider } from 'react-redux'
import { act, render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import '@testing-library/jest-dom'
import RecoveryMessageForm from './RecoveryMessageForm'
import theme from '../../../../../theme'
import store from '../../../../../store'
import httpService from '../../../../../services/api_services/HttpService'

describe('RecoveryMessageForm component', () => {
  it('should show RecoveryMessageForm', async () => {
    const props = {
      handleShowForm: jest.fn(),
      open: true,
      user: {
        cellphone: '55555556',
      },
    }

    const responseMock = {
      code: 0,
      data: {
        bamba_attendance: 'Asistencia Bamba',
        bamba_asesor: 'Asesor Bamba',
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

    const text = screen.getByText('Mensaje de recuperación para 55555556')

    expect(text).toBeInTheDocument()
  })
})
