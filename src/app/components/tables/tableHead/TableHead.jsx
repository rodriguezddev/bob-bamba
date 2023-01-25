import React from 'react'
import PropTypes from 'prop-types'
import { TableHead as MUITableHead, TableRow } from '@mui/material'
import CustomTableColumn from './styles'

const TableHead = (props) => {
  const { columns } = props

  return (
    <MUITableHead>
      <TableRow>
        {columns?.map((column) => (
          <CustomTableColumn
            align={column.align}
            key={column.id}
            sx={column?.style}
            {...props}
          >
            {column.label}
          </CustomTableColumn>
        ))}
      </TableRow>
    </MUITableHead>
  )
}

TableHead.propTypes = {
  color: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      align: PropTypes.oneOf(['center', 'left', 'right']),
      id: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.number,
  lineheight: PropTypes.string,
}

TableHead.defaultProps = {
  color: 'primary.main',
  fontSize: '1.38rem',
  fontWeight: 600,
  lineheight: '2.56rem',
}

export default TableHead
