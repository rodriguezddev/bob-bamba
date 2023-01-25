import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  Table, TableBody, TableCell, ThemeProvider,
} from '@mui/material'
import theme from '../../../theme'
import '@testing-library/jest-dom'
import TableRow from './TableRow'

describe('TableRow component', () => {
  it('should show component', () => {
    render(
      <ThemeProvider theme={theme}>
        <Table>
          <TableBody>
            <TableRow key='ol19'>
              <TableCell align='center'>
                Bamba
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ThemeProvider>,
    )

    const row = screen.getAllByRole('row')

    expect(row).toHaveLength(1)
    expect(row[0]).toHaveTextContent('Bamba')
  })
})
