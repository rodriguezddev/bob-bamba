import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import MainInput from './MainInput'
import theme from '../../../theme'
import '@testing-library/jest-dom'

describe('MainInput component', () => {
  it('should show input', () => {
    const fieldProps = {
      placeholder: 'Buscar por nombre',
      onChange: jest.fn(),
      type: 'text',
    }

    render(
      <ThemeProvider theme={theme}>
        <MainInput {...fieldProps} />
      </ThemeProvider>,
    )

    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()
  })

  it('Should show text placeholder', () => {
    const fieldProps = {
      placeholder: 'Buscar por nombre',
      onChange: jest.fn(),
      type: 'text',
    }

    render(
      <ThemeProvider theme={theme}>
        <MainInput {...fieldProps} />
      </ThemeProvider>,
    )

    const input = screen.getByRole('textbox')

    expect(input).toHaveAttribute('placeholder', 'Buscar por nombre')
  })

  it('should show input with other icon', () => {
    const fieldProps = {
      placeholder: 'Buscar por nombre',
      Icon: CloseIcon,
      onChange: jest.fn(),
      type: 'text',
    }

    render(
      <ThemeProvider theme={theme}>
        <MainInput {...fieldProps} />
      </ThemeProvider>,
    )

    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()
  })
})
