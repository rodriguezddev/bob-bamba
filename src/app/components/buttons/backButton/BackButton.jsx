import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Grid, IconButton, Typography } from '@mui/material'

const BackButton = (props) => {
  const {
    color, fontWeight, fontSize, lineHeight, text,
  } = props
  const navigate = useNavigate()

  return (
    <Grid container justify='flex-start'>
      <Grid
        data-testid='back-button'
        item
        lg={2}
        onClick={() => navigate(-1)}
        sx={{ cursor: 'pointer' }}
        xs={6}
      >
        <IconButton aria-label='regresar' color={color}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          color={color}
          display='inline'
          sx={{ fontSize, fontWeight, lineHeight }}
        >
          {text}
        </Typography>
      </Grid>
    </Grid>
  )
}

BackButton.propTypes = {
  color: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.number,
  lineHeight: PropTypes.string,
  text: PropTypes.string,
}

BackButton.defaultProps = {
  color: 'primary',
  fontSize: '1rem',
  fontWeight: 600,
  lineHeight: '2.56rem',
  text: 'Volver',
}

export default BackButton
