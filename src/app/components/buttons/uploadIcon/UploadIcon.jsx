import React, { forwardRef } from 'react'
import propTypes from 'prop-types'
import { IconButton, Tooltip } from '@mui/material'

const UploadIcon = forwardRef(
  ({
    accept, color, children, onChange, toolTipInfo,
  }, ref) => (
    <Tooltip title={toolTipInfo}>
      <IconButton aria-label='upload file' color={color} component='label'>
        {children}
        <input
          accept={accept}
          data-testid='file-input'
          hidden
          id='input'
          onChange={onChange}
          ref={ref}
          type='file'
        />
      </IconButton>
    </Tooltip>
  ),
)

UploadIcon.displayName = 'UploadIcon'

UploadIcon.propTypes = {
  accept: propTypes.string.isRequired,
  color: propTypes.string.isRequired,
  children: propTypes.element.isRequired,
  onChange: propTypes.func.isRequired,
  toolTipInfo: propTypes.string.isRequired,
}

export default UploadIcon
