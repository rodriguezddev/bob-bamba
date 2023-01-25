import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import theme from '../../../../theme'
import '@testing-library/jest-dom'
import FormAlert from './FormAlert'
import store from '../../../../store'

describe('FormAlert components', () => {
  it('should show FormAlert', () => {
    const props = {
      alertContentText: 'Agregue el precio para este producto',
      alertTextButton: 'Cerrar',
      alertTitle: 'Precio del producto',
      isOpen: true,
      isShowPrimaryButton: true,
      primaryButtonTextAlert: 'Agregar',
      product: 'product',
      setIsOpen: jest.fn(),
      selectedProducts: jest.fn(),
    }

    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <FormAlert {...props} />
        </Provider>
      </ThemeProvider>,
    )

    const textTitle = screen.getByText('Precio del producto')

    expect(textTitle).toBeInTheDocument()
  })
})
