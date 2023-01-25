import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import { MainInput } from '../../inputs'

const InputFilter = ({ field, onChange, value }) => (
  <Grid container flexDirection='column' marginTop='.5rem'>
    <MainInput
      data-testid={`input-filter-${field.id}`}
      id={field.id}
      height='3rem'
      hiddenIcon
      onChange={onChange}
      placeholder={field.placeholder}
      radius='.5rem'
      value={value}
      type={field.type}
      width='18rem'
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
