import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import InputTextLarge from './InputTextLarge'
import theme from '../../../theme'
import '@testing-library/jest-dom'

describe('TextInputLarge component', () => {
  it('should show input', () => {
    const fieldProps = {
      placeholder: 'Name',
      onChange: jest.fn(),
      type: 'text',
    }

    render(
      <ThemeProvider theme={theme}>
        <InputTextLarge {...fieldProps} />
      </ThemeProvider>,
    )

    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()
  })

  it('Should show text placeholder', () => {
    const fieldProps = {
      placeholder: 'Name',
      onChange: jest.fn(),
      type: 'text',
    }

    render(
      <ThemeProvider theme={theme}>
        <InputTextLarge {...fieldProps} />
      </ThemeProvider>,
    )

    const input = screen.getByRole('textbox')

    expect(input).toHaveAttribute('placeholder', 'Name')
  })
})
