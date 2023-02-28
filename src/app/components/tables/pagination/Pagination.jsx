import React from 'react'
import PropTypes from 'prop-types'
import {
  Table, TableRow, TablePagination, TableFooter,
} from '@mui/material'
import TablePaginationActions from './TablePaginationActions'

const Pagination = (props) => (
  <Table>
    <TableFooter>
      <TableRow>
        <TablePagination
          {...props}
          ActionsComponent={TablePaginationActions}
          rowsPerPage={10}
        />
      </TableRow>
    </TableFooter>
  </Table>
)

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  SelectProps: PropTypes.shape({}).isRequired,
}

export default Pagination
