import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import HelperTextError from './HelperTextError'
import theme from '../../../theme'
import '@testing-library/jest-dom'

describe('TextHelperError component', () => {
  it('should show text helper', () => {
    render(
      <ThemeProvider theme={theme}>
        <HelperTextError>
          La dirección de correo electrónico o contraseña son incorrectos
        </HelperTextError>
      </ThemeProvider>,
    )

    const helperText = screen.getByText(/dirección/i)

    expect(helperText).toBeInTheDocument()
  })

  it('should show text helper in red color', () => {
    render(
      <ThemeProvider theme={theme}>
        <HelperTextError>
          La dirección de correo electrónico o contraseña son incorrectos
        </HelperTextError>
      </ThemeProvider>,
    )

    const helperText = screen.getByText(/dirección/i)

    expect(helperText).toHaveStyle('color: rgb(255, 5, 0);}')
  })
})
