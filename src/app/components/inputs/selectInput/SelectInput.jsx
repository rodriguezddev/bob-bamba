import React from 'react'
import PropTypes from 'prop-types'
import { Box, Select } from '@mui/material'
import CustomSelect from './styles'
import theme from '../../../theme'

const SelectInput = (props) => {
  const { children } = props

  return (
    <Box>
      <Select {...props} displayEmpty input={<CustomSelect />}>
        {children}
      </Select>
    </Box>
  )
}

SelectInput.propTypes = {
  border_color: PropTypes.string,
  children: PropTypes.node.isRequired,
  fontSize: PropTypes.string,
  height: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.string,
}

SelectInput.defaultProps = {
  border_color: theme.palette.common.greyLight,
  fontSize: '1rem',
  height: '2.5rem',
  multiple: false,
  width: '16rem',
}

export default SelectInput
