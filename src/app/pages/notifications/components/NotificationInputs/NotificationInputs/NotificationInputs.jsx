import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import { MainInput } from '../../../../../components/inputs'

const NotificationInputs = ({ id, onChange, value }) => (
  <Grid container flexDirection='column' marginTop='.5rem'>
    <MainInput
      data-testid={`input-notification-${id}`}
      hiddenIcon
      id={id}
      onChange={onChange}
      placeholder=''
      radius='.5rem'
      type='text'
      value={value}
    />
  </Grid>
)

NotificationInputs.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
}

export default NotificationInputs
