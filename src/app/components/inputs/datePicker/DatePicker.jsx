import React from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CustomDatePicker from './styles'

const DatePicker = (props) => {
  const {
    disabled,
    disabledButton,
    format,
    hiddenIcon,
    Icon,
    iconColor,
    onClick,
    ...rest
  } = props

  return (
    <CustomDatePicker
      disabled={disabled}
      endAdornment={
        !hiddenIcon && (
          <IconButton disabled={disabledButton} onClick={onClick} edge='start'>
            {Icon && <Icon sx={{ color: iconColor }} />}
          </IconButton>
        )
      }
      format={format}
      {...rest}
    />
  )
}

DatePicker.propTypes = {
  align: PropTypes.oneOf(['center', 'left', 'right']),
  disabled: PropTypes.bool,
  disabledButton: PropTypes.bool,
  fontSize: PropTypes.string,
  format: PropTypes.string,
  height: PropTypes.string,
  hiddenIcon: PropTypes.bool,
  Icon: PropTypes.oneOfType([PropTypes.object]),
  iconColor: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  radius: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]),
  width: PropTypes.string,
}

DatePicker.defaultProps = {
  align: 'left',
  disabled: false,
  disabledButton: false,
  fontSize: '1rem',
  format: 'yyyy-MM-dd',
  height: '2.5rem',
  hiddenIcon: false,
  iconColor: 'common.greyDark',
  Icon: SearchIcon,
  name: null,
  onClick: null,
  onChange: null,
  radius: '0.9rem',
  value: null,
  width: '16rem',
}

export default DatePicker