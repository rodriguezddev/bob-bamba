import React from 'react'
import PropTypes from 'prop-types'
import { Box, NativeSelect } from '@mui/material'
import CustomSelect from './styles'
import theme from '../../../theme'

const SelectInput = (props) => {
  const { children } = props

  return (
    <Box>
      <NativeSelect {...props} input={<CustomSelect />}>
        {children}
      </NativeSelect>
    </Box>
  )
}

SelectInput.propTypes = {
  border_color: PropTypes.string,
  children: PropTypes.node.isRequired,
  fontSize: PropTypes.string,
  height: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.string,
}

SelectInput.defaultProps = {
  border_color: theme.palette.common.greyLight,
  fontSize: '1rem',
  height: '3.75rem',
  width: '17.94rem',
}

export default SelectInput
