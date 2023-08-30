import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { ActionAlert } from '../../../../components/modals'
import PartnerWebHookForm from './components/PartnerWebhookForm'
import {
  createWebhookPartner,
  getScope,
} from '../../../../slices/partner/partnerSlice'

const PartnerWebHook = ({
  selectedPartner,
  isShowWebhook,
  setIsShowWebhook,
}) => {
  const dispatch = useDispatch()
  const webhookPartnerForm = useForm()
  const { handleSubmit } = webhookPartnerForm

  useEffect(() => {
    dispatch(getScope())
  }, [])

  const onSubmit = (dataForm) => {
    const data = {
      webhook_url: dataForm.url,
      scopes: dataForm.scope,
    }

    dispatch(createWebhookPartner({ id: selectedPartner.id, data }))
    setIsShowWebhook(false)
  }

  return (
    <Box>
      {isShowWebhook && (
        <ActionAlert
          actionAlertContentText=''
          actionAlertTextButton='Cerrar'
          actionAlertTitle={`Agrega el webhook de ${selectedPartner?.name}`}
          isOpen={isShowWebhook}
          isShowPrimaryButton
          maxWidth='md'
          onClick={handleSubmit(onSubmit)}
          primaryButtonTextAlert='Asignar'
          setActionsIsOpen={setIsShowWebhook}
        >
          <PartnerWebHookForm webhookPartnerForm={webhookPartnerForm} />
        </ActionAlert>
      )}
    </Box>
  )
}

PartnerWebHook.propTypes = {
  setIsShowWebhook: PropTypes.func.isRequired,
  isShowWebhook: PropTypes.bool.isRequired,
  selectedPartner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
}

export default PartnerWebHook
