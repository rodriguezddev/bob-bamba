import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../Alert/Alert'
import { handleHideError } from '../../../slices/error/errorSlice'

const AlertError = () => {
  const dispatch = useDispatch()
  const { codeError, isError, message } = useSelector((state) => state.error)

  const handleCloseError = () => {
    dispatch(handleHideError())
  }

  return (
    isError && (
      <Alert
        alertTitle='Error'
        alertContentText={message}
        alertTextButton='Cerrar'
        codeError={codeError}
        errorText
        isOpen={isError}
        setIsOpen={handleCloseError}
      />
    )
  )
}

export default AlertError
