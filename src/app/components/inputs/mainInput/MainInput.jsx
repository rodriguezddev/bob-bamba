import React from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CustomTextField from './styles'

const MainInput = (props) => {
  const {
    disabled,
    disabledButton,
    hiddenIcon,
    Icon,
    iconColor,
    onClick,
    ...rest
  } = props

  return (
    <CustomTextField
      disabled={disabled}
      endAdornment={
        !hiddenIcon && (
          <IconButton disabled={disabledButton} onClick={onClick} edge='start'>
            {Icon && <Icon sx={{ color: iconColor }} />}
          </IconButton>
        )
      }
      {...rest}
    />
  )
}

MainInput.propTypes = {
  align: PropTypes.oneOf(['center', 'left', 'right']),
  disabled: PropTypes.bool,
  disabledButton: PropTypes.bool,
  fontSize: PropTypes.string,
  height: PropTypes.string,
  hiddenIcon: PropTypes.bool,
  Icon: PropTypes.oneOfType([PropTypes.object]),
  iconColor: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  radius: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.string,
}

MainInput.defaultProps = {
  align: 'left',
  disabled: false,
  disabledButton: false,
  fontSize: '1rem',
  height: '2.5rem',
  hiddenIcon: false,
  iconColor: 'common.greyDark',
  Icon: SearchIcon,
  name: null,
  onClick: null,
  onChange: null,
  radius: '0.9rem',
  value: '',
  width: '16rem',
}

export default MainInput
