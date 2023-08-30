import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  createTokenPartner,
  getPartner,
  resetPartner,
} from '../../../../slices/partner/partnerSlice'
import { ActionAlert, Alert } from '../../../../components/modals'
import PartnerTokenForm from '../PartnerTokenForm'

const PartnerToken = ({ handleDialog, selectedPartner, isShowToken }) => {
  const dispatch = useDispatch()
  const tokenPartnerForm = useForm()
  const { handleSubmit } = tokenPartnerForm
  const { partner } = useSelector((state) => state.partner)
  const [isShowConfirmDeleteDialog, setIsShowConfirmDeleteDialog] = useState(false)
  const [tokenDelete, setTokenDelete] = useState({})

  useEffect(() => {
    dispatch(getPartner(selectedPartner.id))
  }, [])

  const handleClosePartnerToken = () => {
    dispatch(resetPartner())
    handleDialog()
  }

  const onSubmit = (dataForm) => {
    const data = {
      token_client_type: dataForm.type,
      action: 'CREATE',
    }

    dispatch(createTokenPartner({ id: selectedPartner.id, data }))
    handleDialog()
  }

  const handleCancelDialog = (token) => {
    setIsShowConfirmDeleteDialog(!isShowConfirmDeleteDialog)
    setTokenDelete(token)
  }

  const handleDeleteToken = () => {
    const data = {
      token_client_type: tokenDelete.type,
      action: 'DELETE',
    }

    dispatch(createTokenPartner({ id: selectedPartner.id, data }))

    handleCancelDialog()
    handleDialog()
  }

  return (
    <>
      {isShowToken && (
        <ActionAlert
          actionAlertContentText=''
          actionAlertTextButton='Cerrar'
          actionAlertTitle={`Token de ${selectedPartner?.name}`}
          isOpen={isShowToken}
          isShowPrimaryButton={partner?.oauth_clients?.length < 2}
          maxWidth='md'
          onClick={handleSubmit(onSubmit)}
          primaryButtonTextAlert='Asignar'
          setActionsIsOpen={handleClosePartnerToken}
        >
          <PartnerTokenForm
            handleCancelDialog={handleCancelDialog}
            partner={partner}
            tokenPartnerForm={tokenPartnerForm}
          />
        </ActionAlert>
      )}
      {isShowConfirmDeleteDialog && (
        <Alert
          actionButton={handleDeleteToken}
          alertTextButton='Cancelar'
          alertTitle='¿Quieres eliminar el token?'
          isShowPrimaryButton
          isOpen={isShowConfirmDeleteDialog}
          primaryButtonTextAlert='Eliminar'
          setIsOpen={setIsShowConfirmDeleteDialog}
        />
      )}
    </>
  )
}

PartnerToken.propTypes = {
  handleDialog: PropTypes.func.isRequired,
  isShowToken: PropTypes.bool.isRequired,
  selectedPartner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
}

export default PartnerToken
