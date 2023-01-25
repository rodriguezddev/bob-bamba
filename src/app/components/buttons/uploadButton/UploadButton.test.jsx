import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'
import '@testing-library/jest-dom'
import UploadButton from './UploadButton'

describe('UploadButton component', () => {
  it('should show upload button', () => {
    const uploadButtonProps = {
      accept: '.xlsx',
      onChange: jest.fn(),
      textButton: 'Cerrar',
    }

    render(
      <ThemeProvider theme={theme}>
        <UploadButton {...uploadButtonProps}>Enviar</UploadButton>
      </ThemeProvider>,
    )

    const button = screen.getByRole('button')

    expect(button).toHaveTextContent('Cerrar')
  })

  it('should have the property font size', () => {
    const buttonProps = {
      accept: '.xlsx',
      fontSize: '0.75rem',
      height: '2.75rem',
      onChange: jest.fn(),
      textButton: 'Cerrar',
      width: '9rem',
    }

    render(
      <ThemeProvider theme={theme}>
        <UploadButton {...buttonProps}>Enviar</UploadButton>
      </ThemeProvider>,
    )

    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('font-size', '0.75rem')
  })

  it('should have the property color', () => {
    const buttonProps = {
      accept: '.xlsx',
      fontSize: '0.75rem',
      height: '2.75rem',
      onChange: jest.fn(),
      textButton: 'Cerrar',
      type: 'primary',
      width: '9rem',
    }

    render(
      <ThemeProvider theme={theme}>
        <UploadButton {...buttonProps}>Enviar</UploadButton>
      </ThemeProvider>,
    )

    const button = screen.getByRole('button')

    expect(button).toHaveStyle('background-color: rgb(18, 50, 145);}')
    expect(button).toHaveStyle('color: rgb(255, 255, 255);}')
  })
})
