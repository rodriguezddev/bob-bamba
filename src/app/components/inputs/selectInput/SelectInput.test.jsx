import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import SelectInput from './SelectInput'
import theme from '../../../theme'
import '@testing-library/jest-dom'

describe('SelectFilterInput component', () => {
  it('should show select input', () => {
    render(
      <ThemeProvider theme={theme}>
        <SelectInput value={1} onChange={() => {}}>
          <option value={1}>Mostrar todos los empleados</option>
        </SelectInput>
      </ThemeProvider>,
    )

    const input = screen.getByRole('option')

    expect(input).toHaveValue('1')
  })
})
