import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  Table, TableBody, TableRow, ThemeProvider,
} from '@mui/material'
import theme from '../../../theme'
import '@testing-library/jest-dom'
import TableCell from './TableCell'

describe('TableCell component', () => {
  it('should show component', () => {
    render(
      <ThemeProvider theme={theme}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                Bamba
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ThemeProvider>,
    )

    const text = screen.getByText(/Bamba/i)

    expect(text).toHaveTextContent('Bamba')
  })
})
