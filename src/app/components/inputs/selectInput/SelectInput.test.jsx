import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { MenuItem, ThemeProvider } from '@mui/material'
import SelectInput from './SelectInput'
import theme from '../../../theme'
import '@testing-library/jest-dom'

describe('SelectFilterInput component', () => {
  it('should show select input', () => {
    render(
      <ThemeProvider theme={theme}>
        <SelectInput value={1} onChange={() => {}}>
          <MenuItem value={1}>Mostrar todos los empleados</MenuItem>
        </SelectInput>
      </ThemeProvider>,
    )

    const button = screen.getAllByRole('button')
    fireEvent.mouseDown(button[0])

    const input = screen.getByRole('option')

    expect(input).toHaveTextContent('Mostrar todos los empleados')
  })
})
