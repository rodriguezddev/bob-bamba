import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import { SelectInput } from '../../inputs'

const SelectFilter = ({ field, onChange, value }) => (
  <Grid container flexDirection='column' marginTop='.5rem'>
    <SelectInput
      height='3rem'
      id='fieldFilter'
      onChange={onChange}
      value={value}
    >
      <option value=''>Seleccionar</option>
      {field.selectDetails.map((select) => (
        <option
          data-testid={`select-filter-value-${select.value}`}
          key={select.value}
          value={select.value}
        >
          {select.name}
        </option>
      ))}
    </SelectInput>
  </Grid>
)

SelectFilter.propTypes = {
  field: PropTypes.shape({
    selectDetails: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default SelectFilter
