import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { ActionAlert, Alert } from '../../../../components/modals'
import PartnerForm from '../partnerForm/PartnerForm'
import { updatePartner } from '../../../../slices/partner/partnerSlice'

const UpdatePartner = ({ dialogUpdate, isShowDialogUpdate, partner }) => {
  const dispatch = useDispatch()
  const [isShowConfirmDialogUpdate, setIsShowConfirmDialogUpdate] = useState(false)
  const [updateData, setUpdateData] = useState({})
  const partnerForm = useForm()
  const { handleSubmit, reset } = partnerForm

  useEffect(() => {
    if (partner) {
      reset({
        code: partner?.code || '',
        email: partner?.company?.email || '',
        name: partner?.name || '',
        nameCompany: partner?.company?.name || '',
        phone: partner?.company?.phone_number || '',
        taxId: partner?.company?.tax_id || '',
      })
    }
  }, [partner])

  const handleDataForm = (dataForm) => {
    const values = {
      name: dataForm.name,
      code: dataForm.code.toUpperCase(),
      type: dataForm.partnerType,
      company: {
        name: dataForm.nameCompany,
        email: dataForm.email,
        phone_number: dataForm.phone,
        country_code: dataForm.countryCode,
        ...(dataForm.taxId && { tax_id: dataForm.taxId }),
      },
    }

    setUpdateData(values)
    setIsShowConfirmDialogUpdate(true)
  }

  const onSubmit = () => {
    dispatch(updatePartner({ id: partner.id, data: updateData }))
    setIsShowConfirmDialogUpdate(false)
    dialogUpdate()
  }

  return (
    <>
      {isShowDialogUpdate && (
        <ActionAlert
          actionAlertContentText={`Se actualizará el partner ${partner?.name}`}
          actionAlertTextButton='Cerrar'
          actionAlertTitle='Actualizar partner'
          isOpen={isShowDialogUpdate}
          isShowPrimaryButton
          onClick={handleSubmit(handleDataForm)}
          primaryButtonTextAlert='Actualizar'
          setActionsIsOpen={dialogUpdate}
        >
          <PartnerForm partner={partner} partnerForm={partnerForm} />
        </ActionAlert>
      )}
      {isShowConfirmDialogUpdate && (
        <Alert
          actionButton={onSubmit}
          alertContentText='La información se actualizará con los nuevos valores'
          alertTextButton='Cancelar'
          alertTitle={`¿Quieres actualizar el partner ${partner?.name}?`}
          isShowPrimaryButton
          isOpen={isShowConfirmDialogUpdate}
          primaryButtonTextAlert='Actualizar'
          setIsOpen={setIsShowConfirmDialogUpdate}
        />
      )}
    </>
  )
}

UpdatePartner.propTypes = {
  dialogUpdate: PropTypes.func.isRequired,
  isShowDialogUpdate: PropTypes.bool.isRequired,
  partner: PropTypes.shape({
    code: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    company: PropTypes.shape({
      email: PropTypes.string,
      name: PropTypes.string,
      phone_number: PropTypes.string,
      tax_id: PropTypes.string,
    }),
  }).isRequired,
}

export default UpdatePartner
