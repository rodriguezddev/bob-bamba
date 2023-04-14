import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import GeneralTable from './GeneralTable'
import TableCell from '../tableCell/TableCell'
import TableRow from '../tableRow/TableRow'
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

    const props = {
      columns,
      count: 1,
      onPageChange: jest.fn(),
      onRowsPerPageChange: jest.fn(),
      page: 0,
      rowsPerPage: 10,
      SelectProps: {
        native: false,
      },
    }

    const items = [
      {
        id: 'lll',
        name: 'Alexis',
        last_name: 'Rea',
      },
      {
        id: 'llla',
        name: 'Paco',
        last_name: 'perron',
      },
    ]

    render(
      <ThemeProvider theme={theme}>
        <GeneralTable {...props}>
          {items?.map((item) => (
            <TableRow key={item.id}>
              <TableCell align='center'>{item.name}</TableCell>
              <TableCell align='center'>{item.last_name}</TableCell>
            </TableRow>
          ))}
        </GeneralTable>
      </ThemeProvider>,
    )

    const row = screen.getAllByRole('row')

    expect(row).toHaveLength(4)
  })
})
