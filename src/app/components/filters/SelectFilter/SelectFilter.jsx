import React from 'react'
import PropTypes from 'prop-types'
import { Grid, MenuItem } from '@mui/material'
import { SelectInput } from '../../inputs'

const SelectFilter = ({ field, onChange, value }) => (
  <Grid container flexDirection='column' marginTop='.5rem'>
    <SelectInput
      height='2.5rem'
      id='fieldFilter'
      onChange={onChange}
      value={value}
    >
      <MenuItem value=''>Seleccionar</MenuItem>
      {field.selectDetails.map((select) => (
        <MenuItem
          data-testid={`select-filter-value-${select.value}`}
          key={select.value}
          value={select.value}
        >
          {select.name}
        </MenuItem>
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
