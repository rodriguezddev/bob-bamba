import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import Pagination from './Pagination'
import theme from '../../../theme'
import '@testing-library/jest-dom'

describe('Pagination component', () => {
  it('should show component', () => {
    const props = {
      count: 1,
      onPageChange: jest.fn(),
      onRowsPerPageChange: jest.fn(),
      page: 0,
      rowsPerPage: 10,
      SelectProps: {
        native: false,
      },
    }
    render(
      <ThemeProvider theme={theme}>
        <Pagination {...props} />
      </ThemeProvider>,
    )

    const row = screen.getAllByRole('row')

    expect(row).toHaveLength(1)
  })
})
