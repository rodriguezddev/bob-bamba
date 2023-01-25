import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import InputFilter from './InputFilter'
import theme from '../../../theme'
import '@testing-library/jest-dom'

describe('InputFilter component', () => {
  it('should show input', () => {
    const props = {
      type: 'text',
      name: 'Tipo',
      id: 'type',
      placeholder: 'Tipo',
    }

    render(
      <ThemeProvider theme={theme}>
        <InputFilter field={props} onChange={jest.fn()} value='' />
      </ThemeProvider>,
    )

    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()
  })

  it('Should show text placeholder', () => {
    const props = {
      id: 'type',
      name: 'Tipo',
      placeholder: 'Tipo',
      type: 'text',
    }

    render(
      <ThemeProvider theme={theme}>
        <InputFilter field={props} onChange={jest.fn()} value='' />
      </ThemeProvider>,
    )

    const input = screen.getByRole('textbox')

    expect(input).toHaveAttribute('placeholder', 'Tipo')
  })
})
