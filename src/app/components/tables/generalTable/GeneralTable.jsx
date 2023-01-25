import React from 'react'
import PropTypes from 'prop-types'
import {
  Paper, Table, TableBody, TableContainer,
} from '@mui/material'
import TableHead from '../tableHead/TableHead'
import Pagination from '../pagination/Pagination'

const GeneralTable = (props) => {
  const { columns, children } = props
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: 'none',
        maxHeight: '100%',
        overflowX: 'initial',
      }}
    >
      <Table aria-label='sticky table' stickyHeader sx={{ minWidth: 700 }}>
        <TableHead columns={columns} />
        <TableBody>{children}</TableBody>
      </Table>
      <Pagination {...props} />
    </TableContainer>
  )
}

GeneralTable.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      align: PropTypes.oneOf(['center', 'left', 'right']),
      id: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  SelectProps: PropTypes.shape({}).isRequired,
}

export default GeneralTable
