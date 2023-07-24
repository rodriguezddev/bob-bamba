import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { ActionAlert, Alert } from '../../../../components/modals'
import FormMessage from '../formMessage'
import {
  deleteMessage,
  updateMessage,
} from '../../../../slices/messages/messageSlice'

const ActionsMessage = ({
  details,
  isShowDeleteAlert,
  setIsShowDeleteAlert,
  isShowUpdateAlert,
  setIsShowUpdateAlert,
}) => {
  const dispatch = useDispatch()
  const formMessageHook = useForm()
  const { handleSubmit, reset } = formMessageHook

  useEffect(() => {
    if (details) {
      reset({
        partnerId: details?.partner_id || '',
        type: details?.type || '',
        message: details?.message || '',
        unidentifiedUser: details?.unidentified_user || '',
      })
    }
  }, [details])

  const handleDeleteAlert = () => {
    dispatch(deleteMessage(details.id))
    setIsShowDeleteAlert(false)
  }

  const onSubmit = (dataForm) => {
    const values = {
      partner_id: dataForm.partnerId,
      message: dataForm.message,
      type: dataForm.type,
      message_key: dataForm.messageKey,
      unidentified_user: dataForm.unidentifiedUser,
    }
    dispatch(updateMessage({ data: values, messageId: details.id }))
    setIsShowUpdateAlert(false)
  }

  return (
    <Box>
      {isShowDeleteAlert && (
        <Alert
          actionButton={handleDeleteAlert}
          alertContentText='La información se eliminará permanentemente'
          alertTextButton='Cancelar'
          alertTitle='¿Quieres eliminar este mensaje?'
          isShowPrimaryButton
          isOpen={isShowDeleteAlert}
          setIsOpen={setIsShowDeleteAlert}
        />
      )}
      {isShowUpdateAlert && (
        <ActionAlert
          actionAlertContentText='Al editar la campaña se restablecerán los usuarios'
          actionAlertTextButton='Cerrar'
          actionAlertTitle='Actualizar campaña'
          isOpen={isShowUpdateAlert}
          isShowPrimaryButton
          onClick={handleSubmit(onSubmit)}
          primaryButtonTextAlert='Actualizar'
          setActionsIsOpen={setIsShowUpdateAlert}
        >
          <FormMessage
            formMessageHook={formMessageHook}
            isShowConfirmAlert={isShowUpdateAlert}
            setIsShowUpdateAlert={setIsShowUpdateAlert}
            update
          />
        </ActionAlert>
      )}
    </Box>
  )
}

ActionsMessage.propTypes = {
  details: PropTypes.shape({
    id: PropTypes.number,
    message: PropTypes.string,
    partner_id: PropTypes.string,
    type: PropTypes.string,
    unidentified_user: PropTypes.bool,
  }).isRequired,
  isShowDeleteAlert: PropTypes.bool.isRequired,
  isShowUpdateAlert: PropTypes.bool.isRequired,
  setIsShowDeleteAlert: PropTypes.func.isRequired,
  setIsShowUpdateAlert: PropTypes.func.isRequired,
}

export default ActionsMessage
