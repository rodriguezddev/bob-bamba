import React from 'react'
import InputFilter from '../InputFilter/InputFilter'
import SelectFilter from '../SelectFilter/SelectFilter'

const FieldFilter = ({ field, onChange, value }) => {
  const Field = {
    select: <SelectFilter field={field} onChange={onChange} value={value} />,
    text: <InputFilter field={field} onChange={onChange} value={value} />,
  }

  return Field[field.type]
}

export default FieldFilter
