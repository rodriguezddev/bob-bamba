import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import FieldFilter from './FieldFilter'
import theme from '../../../theme'
import '@testing-library/jest-dom'

describe('FieldFilter component', () => {
  it('should show input', () => {
    const props = {
      id: 'type',
      name: 'Tipo',
      placeholder: 'Tipo',
      type: 'text',
    }

    render(
      <ThemeProvider theme={theme}>
        <FieldFilter field={props} onChange={jest.fn()} value='' />
      </ThemeProvider>,
    )

    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()
  })

  it('should show select input', () => {
    const props = {
      id: 'type',
      name: 'Tipo',
      placeholder: 'Tipo',
      selectDetails: [{ value: 'test', name: 'Agregador' }],
      type: 'select',
    }

    render(
      <ThemeProvider theme={theme}>
        <FieldFilter field={props} onChange={jest.fn()} value='' />
      </ThemeProvider>,
    )

    const input = screen.getByTestId('select-filter-value-test')

    expect(input).toHaveValue('test')
  })
})
