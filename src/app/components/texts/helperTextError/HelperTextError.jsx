import React from 'react'
import PropTypes from 'prop-types'
import ErrorIcon from '@mui/icons-material/Error'
import { Box, Typography } from '@mui/material'

const HelperTextError = ({ children, width }) => (
  <Box sx={{ display: 'flex', width }}>
    <Box textAlign='right' color='error.main'>
      <ErrorIcon />
    </Box>
    <Box
      sx={{
        fontSize: '1em',
        lineHeight: '1.5em',
      }}
    >
      <Typography color='error.main' component='span'>
        {children}
      </Typography>
    </Box>
  </Box>
)

HelperTextError.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
}

HelperTextError.defaultProps = {
  width: '30.68rem',
}

export default HelperTextError
