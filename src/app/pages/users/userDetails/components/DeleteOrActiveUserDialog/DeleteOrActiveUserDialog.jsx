import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Box } from '@mui/material'
import { Alert } from '../../../../../components/modals'
import { activateUser } from '../../../../../slices/user/userSlice'

const DeleteOrActiveUserDialog = ({
  showActivateDialog,
  setShowActivateDialog,
  userDetails,
}) => {
  const dispatch = useDispatch()

  const handleActiveUser = () => {
    dispatch(activateUser(userDetails.id))
    setShowActivateDialog(false)
  }

  return (
    <Box>
      {showActivateDialog && (
        <Alert
          actionButton={handleActiveUser}
          alertContentText={`¿Estás seguro que deseas Activar a ${
            userDetails?.name
          } ${userDetails?.lastname || ''}?`}
          alertTextButton='Cancelar'
          alertTitle='Activar usuario'
          isShowPrimaryButton
          isOpen={showActivateDialog}
          primaryButtonTextAlert='Activar'
          setIsOpen={setShowActivateDialog}
        />
      )}
    </Box>
  )
}

DeleteOrActiveUserDialog.propTypes = {
  showActivateDialog: PropTypes.bool.isRequired,
  setShowActivateDialog: PropTypes.func.isRequired,
  userDetails: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    lastname: PropTypes.string,
  }).isRequired,
}

export default DeleteOrActiveUserDialog
