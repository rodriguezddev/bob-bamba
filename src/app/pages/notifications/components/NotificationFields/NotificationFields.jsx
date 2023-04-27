import React from 'react'
import NotificationSwitch from '../NotificationInputs/NotificationSwitch'
import NotificationInputs from '../NotificationInputs/NotificationInputs'

const NotificationFields = ({
  input, id, value, onChange,
}) => {
  const Fields = {
    boolean: <NotificationSwitch id={id} onChange={onChange} value={value} />,
    string: <NotificationInputs id={id} onChange={onChange} value={value} />,
    email: <NotificationInputs id={id} onChange={onChange} value={value} />,
  }

  return Fields[input.type]
}

export default NotificationFields
