import React from 'react'
import PropTypes from 'prop-types'
import CustomTableRow from './styles'

const TableRow = (props) => (
  <CustomTableRow {...props} />
)

TableRow.propTypes = {
  border: PropTypes.string,
}

TableRow.defaultProps = {
  border: '0.13rem',
}

export default TableRow
