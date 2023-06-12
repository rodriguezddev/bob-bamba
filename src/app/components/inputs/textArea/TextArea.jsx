import React from 'react'
import PropTypes from 'prop-types'
import CustomTextArea from './styles'

const TextArea = (props) => {
  const {
    disabled, onClick, rows, ...rest
  } = props

  return (
    <CustomTextArea
      disabled={disabled}
      InputProps={{ disableUnderline: true }}
      multiline
      rows={rows}
      variant='standard'
      {...rest}
    />
  )
}

TextArea.propTypes = {
  disabled: PropTypes.bool,
  fontSize: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  radius: PropTypes.string,
  rows: PropTypes.number,
  value: PropTypes.string,
  width: PropTypes.string,
}

TextArea.defaultProps = {
  disabled: false,
  fontSize: '1rem',
  name: null,
  onClick: null,
  onChange: null,
  radius: '0.9rem',
  rows: 5,
  value: '',
  width: '16rem',
}

export default TextArea
