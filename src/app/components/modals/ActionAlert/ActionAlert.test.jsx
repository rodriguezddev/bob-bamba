import React from 'react'
import { Provider } from 'react-redux'
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'
import '@testing-library/jest-dom'
import ActionAlert from './ActionAlert'
import store from '../../../store'

describe('ActionAlert components', () => {
  it('should show action alert', () => {
    const props = {
      actionAlertContentText:
        'Elige uno o mas productos para asignar a este partner',
      actionAlertTextButton: 'Cerrar',
      actionAlertTitle: 'Asignar productos',
      assignedProducts: [{ currency_code: '1', price: '200', sku: '1' }],
      assigner: 'partnerActionAlert',
      isOpen: true,
      isShowPrimaryButton: true,
      primaryButtonTextAlert: 'Asignar',
      setActionsIsOpen: jest.fn(),
    }

    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <ActionAlert {...props}>Enviar</ActionAlert>
        </Provider>
      </ThemeProvider>,
    )

    const textTitle = screen.getByText('Asignar productos')

    expect(textTitle).toBeInTheDocument()
  })

  it('should closed action alert', async () => {
    const props = {
      actionAlertContentText:
        'Elige uno o mas productos para asignar a este partner',
      actionAlertTextButton: 'Cerrar',
      actionAlertTitle: 'Asignar productos',
      assignedProducts: [{ currency_code: '1', price: '200', sku: '1' }],
      assigner: 'partnerActionAlert',
      isOpen: true,
      isShowPrimaryButton: true,
      primaryButtonTextAlert: 'Asignar',
      setActionsIsOpen: jest.fn(),
    }

    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <ActionAlert {...props}>Enviar</ActionAlert>
        </Provider>
      </ThemeProvider>,
    )

    const button = screen.getByText('Cerrar')

    expect(button).toHaveTextContent('Cerrar')

    fireEvent.click(screen.getByText(/Cerrar/i))

    await waitFor(() => screen.getByText(/Cerrar/i))

    expect(screen.getByText(/Cerrar/i)).not.toBeDisabled()
  })
})
