import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  Table, ThemeProvider,
} from '@mui/material'
import TableHead from './TableHead'
import theme from '../../../theme'
import '@testing-library/jest-dom'

describe('TableHead component', () => {
  it('should show component', () => {
    const columns = [
      {
        align: 'center',
        id: 'name',
        label: 'Nombre',
      },
      {
        align: 'center',
        id: 'lastName',
        label: 'Apellido',
      },
    ]

    render(
      <ThemeProvider theme={theme}>
        <Table>
          <TableHead columns={columns} />
        </Table>
      </ThemeProvider>,
    )

    const tableColumn = screen.getAllByRole('columnheader')

    expect(tableColumn).toHaveLength(2)
  })
})
