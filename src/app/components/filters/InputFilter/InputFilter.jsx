import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import { MainInput } from '../../inputs'

const InputFilter = ({ field, onChange, value }) => (
  <Grid container flexDirection='column' marginTop='.5rem'>
    <MainInput
      data-testid={`input-filter-${field.id}`}
      height='2.5rem'
      hiddenIcon
      id={field.id}
      onChange={onChange}
      placeholder={field.placeholder}
      radius='.5rem'
      type={field.type}
      value={value}
      width='16rem'
    />
  </Grid>
)

InputFilter.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default InputFilter
