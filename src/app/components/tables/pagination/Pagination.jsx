import React from 'react'
import PropTypes from 'prop-types'
import {
  Table, TableRow, TablePagination, TableFooter,
} from '@mui/material'
import TablePaginationActions from './TablePaginationActions'

const Pagination = (props) => {
  const { rowsPerPage, page } = props
  return (
    <Table>
      <TableFooter>
        <TableRow>
          <TablePagination
            {...props}
            ActionsComponent={TablePaginationActions}
            labelRowsPerPage='Columnas por páginas'
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </TableRow>
      </TableFooter>
    </Table>
  )
}

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  SelectProps: PropTypes.shape({}).isRequired,
}

Pagination.defaultProps = {
  onRowsPerPageChange: null,
}

export default Pagination
