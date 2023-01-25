import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { IconButton, Box } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import CustomTextField from './styles'

const InputTextLarge = (props) => {
  const { type } = props
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Box>
      {type === 'password' ? (
        <CustomTextField
          {...props}
          type={showPassword ? 'text' : 'password'}
          startAdornment={
            type === 'password' && (
              <IconButton onClick={handleShowPassword} edge='start'>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            )
          }
        />
      ) : (
        <CustomTextField {...props} />
      )}
    </Box>
  )
}

InputTextLarge.propTypes = {
  align: PropTypes.oneOf(['center', 'left', 'right']),
  background: PropTypes.string,
  fontSize: PropTypes.string,
  height: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'password']).isRequired,
  value: PropTypes.string,
  width: PropTypes.string,
}

InputTextLarge.defaultProps = {
  align: 'center',
  background: null,
  fontSize: '24px',
  height: '76px',
  width: '490px',
  value: '',
}

export default InputTextLarge
