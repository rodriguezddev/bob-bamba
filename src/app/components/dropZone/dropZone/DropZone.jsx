import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DropContainer from './styles'

const DropZone = forwardRef(({
  accept, onChange, file, ...props
}, ref) => {
  const handleDrop = (event) => {
    event.preventDefault()
    onChange(event)
  }

  const handleInputClick = () => {
    ref?.current?.click()
  }

  const handleInputChange = (event) => {
    onChange(event)
  }

  return (
    <DropContainer
      {...props}
      data-testid='dropzone'
      onClick={handleInputClick}
      onDragOver={(event) => {
        event.preventDefault()
      }}
      onDrop={handleDrop}
    >
      <input
        accept={accept}
        data-testid='dropzone-input'
        onChange={handleInputChange}
        ref={ref}
        style={{
          display: 'none',
        }}
        type='file'
      />
      {file ? (
        <>
          <Typography align='center' variant='h6'>
            Archivo seleccionado:
          </Typography>
          <Typography align='center' variant='subtitle1'>
            {file.name}
          </Typography>
          <CheckCircleIcon fontSize='large' />
        </>
      ) : (
        <>
          <CloudUploadIcon fontSize='large' />
          <Typography align='center' variant='h6'>
            Arrastra y suelta un archivo aquí
          </Typography>
          <Typography align='center' variant='subtitle1'>
            o haz clic para seleccionarlo
          </Typography>
        </>
      )}
    </DropContainer>
  )
})

DropZone.displayName = 'UploadButton'

DropZone.propTypes = {
  accept: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  file: PropTypes.shape({
    name: PropTypes.string,
  }),
}

DropZone.defaultProps = {
  file: null,
}

export default DropZone
