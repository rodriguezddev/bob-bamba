import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from '../../../../../components/modals'
import { deactivateUser } from '../../../../../slices/user/userSlice'

const DeactivateUserDialog = ({
  showDeactivateUserDialog,
  setShowDeactivateUserDialog,
}) => {
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleDeleteUser = () => {
    dispatch(deactivateUser(user.id))
    setShowDeactivateUserDialog(false)
  }

  return (
    <Alert
      actionButton={handleDeleteUser}
      alertContentText={`¿Estás seguro que deseas desactivar a ${user.name} ${
        user.lastname || ''
      }?`}
      alertTextButton='Cancelar'
      alertTitle='Desactivar usuario'
      isShowPrimaryButton
      isOpen={showDeactivateUserDialog}
      primaryButtonTextAlert='Desactivar'
      setIsOpen={setShowDeactivateUserDialog}
    />
  )
}

DeactivateUserDialog.propTypes = {
  showDeactivateUserDialog: PropTypes.bool.isRequired,
  setShowDeactivateUserDialog: PropTypes.func.isRequired,
}

export default DeactivateUserDialog
