import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { handleHideSuccessMessage } from '../../../slices/successMessage/successMessageSlice'
import Alert from '../Alert/Alert'

const AlertSuccess = () => {
  const dispatch = useDispatch()
  const { isSuccess, message } = useSelector((state) => state.successMessage)

  const handleCloseDialogSuccessMessage = () => {
    dispatch(handleHideSuccessMessage())
  }

  return (
    isSuccess && (
      <Alert
        alertTitle={message?.title}
        alertContentText={(
          <Box>
            <Box>{message?.subtitle}</Box>
            <Box>
              <CheckCircleIcon fontSize='large' />
            </Box>
          </Box>
        )}
        alertTextButton={message?.button || 'Cerrar'}
        isOpen={isSuccess}
        setIsOpen={handleCloseDialogSuccessMessage}
      />
    )
  )
}

export default AlertSuccess
