import React from 'react'
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'
import '@testing-library/jest-dom'
import Alert from './Alert'

describe('Alert components', () => {
  it('should show alert title', () => {
    const buttonProps = {
      alertTitle: 'Alert Title',
      alertContentText: 'Description Alert',
      alertTextButton: 'Cerrar',
      error: false,
      isOpen: true,
      isShowPrimaryButton: false,
      setIsOpen: jest.fn(),
      primaryButtonTextAlert: 'Eliminar',
    }

    render(
      <ThemeProvider theme={theme}>
        <Alert {...buttonProps}>Enviar</Alert>
      </ThemeProvider>,
    )

    const presentation = screen.getByText('Alert Title')

    expect(presentation).toBeInTheDocument()
  })

  it('should show description alert', () => {
    const buttonProps = {
      alertTitle: 'Alert Title',
      alertContentText: 'Description Alert',
      alertTextButton: 'Cerrar',
      error: false,
      isOpen: true,
      isShowPrimaryButton: false,
      setIsOpen: jest.fn(),
      primaryButtonTextAlert: 'Eliminar',
    }

    render(
      <ThemeProvider theme={theme}>
        <Alert {...buttonProps} />
      </ThemeProvider>,
    )

    const alert = screen.getByText('Description Alert')

    expect(alert).toHaveTextContent('Description Alert')
  })

  it('should show alert button', async () => {
    const buttonProps = {
      alertTitle: 'Alert Title',
      alertContentText: 'Description Alert',
      alertTextButton: 'Cerrar',
      error: false,
      isOpen: true,
      isShowPrimaryButton: false,
      setIsOpen: jest.fn(),
      primaryButtonTextAlert: 'Eliminar',
    }

    render(
      <ThemeProvider theme={theme}>
        <Alert {...buttonProps} />
      </ThemeProvider>,
    )

    const button = screen.getByRole('button')

    expect(button).toHaveTextContent('Cerrar')

    fireEvent.click(screen.getByText(/Cerrar/i))

    await waitFor(() => screen.getByText(/Cerrar/i))

    expect(screen.getByRole('button')).not.toBeDisabled()
  })
})
