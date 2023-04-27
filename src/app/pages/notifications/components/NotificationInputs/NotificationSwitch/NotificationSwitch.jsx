import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Switch, Typography } from '@mui/material'

const NotificationSwitch = ({ id, onChange, value }) => (
  <Grid container flexDirection='column' marginTop='.5rem'>
    <Grid>
      <Typography data-testid={`switch-notification-${id}`} variant='caption'>
        No
      </Typography>
      <Switch id={id} value={value} onChange={onChange} />
      <Typography data-testid={`switch-notification-${id}`} variant='caption'>
        Si
      </Typography>
    </Grid>
  </Grid>
)

NotificationSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
}

export default NotificationSwitch
