import React from 'react'
import PropTypes from 'prop-types'
import CustomTableCell from './styles'

const TableCell = (props) => <CustomTableCell {...props} />

TableCell.propTypes = {
  color: PropTypes.string,
  fontSize: PropTypes.string,
  lineheight: PropTypes.string,
}

TableCell.defaultProps = {
  color: 'primary.main',
  fontSize: '0.85rem',
  lineheight: '2rem',
}

export default TableCell
