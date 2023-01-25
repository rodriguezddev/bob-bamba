import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import SelectFilter from './SelectFilter'
import theme from '../../../theme'
import '@testing-library/jest-dom'

describe('SelectFilterInput component', () => {
  it('should show select input', () => {
    const props = {
      id: 'type',
      name: 'Tipo',
      placeholder: 'Tipo',
      selectDetails: [{ value: 'AGGREGATOR', name: 'Agregador' }],
      type: 'select',
    }

    render(
      <ThemeProvider theme={theme}>
        <SelectFilter field={props} onChange={jest.fn()} value='' />
      </ThemeProvider>,
    )

    const input = screen.getByTestId('select-filter-value-AGGREGATOR')

    expect(input).toHaveValue('AGGREGATOR')
  })
})
