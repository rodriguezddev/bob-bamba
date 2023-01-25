import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'
import '@testing-library/jest-dom'
import Button from './MainButton'

describe('Buttons components', () => {
  it('should show button', () => {
    const buttonProps = {
      onClick: jest.fn(),
    }

    render(
      <ThemeProvider theme={theme}>
        <Button {...buttonProps}>Enviar</Button>
      </ThemeProvider>,
    )

    const button = screen.getByRole('button')

    expect(button).toHaveTextContent('Enviar')
  })

  it('should have the property font size', () => {
    const buttonProps = {
      width: '144px',
      height: '44px',
      fontSize: '12px',
      onClick: jest.fn(),
    }

    render(
      <ThemeProvider theme={theme}>
        <Button {...buttonProps}>Enviar</Button>
      </ThemeProvider>,
    )

    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('font-size', '12px')
  })

  it('should have the property color', () => {
    const buttonProps = {
      width: '144px',
      height: '44px',
      fontSize: '12px',
      onClick: jest.fn(),
      type: 'primary',
    }

    render(
      <ThemeProvider theme={theme}>
        <Button {...buttonProps}>Enviar</Button>
      </ThemeProvider>,
    )

    const button = screen.getByRole('button')

    expect(button).toHaveStyle('background-color: rgb(18, 50, 145);}')
    expect(button).toHaveStyle('color: rgb(255, 255, 255);}')
  })
})
