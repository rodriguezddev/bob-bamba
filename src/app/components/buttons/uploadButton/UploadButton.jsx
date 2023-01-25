import React, { forwardRef } from 'react'
import propTypes from 'prop-types'
import MainButton from '../mainButton/MainButton'

const UploadButton = forwardRef(
  ({
    accept, textButton, onChange, ...props
  }, ref) => (
    <MainButton {...props} component='label' variant='contained'>
      <input
        accept={accept}
        hidden
        id='input'
        onChange={onChange}
        ref={ref}
        type='file'
      />
      {textButton}
    </MainButton>
  ),
)

UploadButton.displayName = 'UploadButton'

UploadButton.propTypes = {
  accept: propTypes.string.isRequired,
  color: propTypes.string,
  fontSize: propTypes.string,
  height: propTypes.string,
  onChange: propTypes.func.isRequired,
  radius: propTypes.string,
  textButton: propTypes.string.isRequired,
  width: propTypes.string,
}

UploadButton.defaultProps = {
  color: 'primary',
  fontSize: '1rem',
  height: '3.75rem',
  radius: '0.62rem',
  width: '18rem',
}

export default UploadButton
