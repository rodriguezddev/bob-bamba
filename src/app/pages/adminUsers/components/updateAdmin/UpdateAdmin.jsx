import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { ActionAlert, Alert } from '../../../../components/modals'
import { updateAdmin } from '../../../../slices/adminUsers/adminSlice'
import AdminForm from '../adminForm'

const UpdateAdmin = ({ dialogUpdate, isShowDialogUpdate, admin }) => {
  const dispatch = useDispatch()
  const [isShowConfirmDialogUpdate, setIsShowConfirmDialogUpdate] = useState(false)
  const [updateData, setUpdateData] = useState({})
  const adminForm = useForm()
  const { handleSubmit, reset } = adminForm

  useEffect(() => {
    if (admin) {
      reset({
        name: admin?.name || '',
        lastname: admin?.lastname || '',
        email: admin?.email || '',
      })
    }
  }, [admin])

  const handleDataForm = (dataForm) => {
    const values = {
      name: dataForm.name,
      lastname: dataForm.lastname,
      email: dataForm.email,
      password: dataForm.password,
    }
    setUpdateData(values)
    setIsShowConfirmDialogUpdate(true)
  }

  const onSubmit = () => {
    dispatch(updateAdmin({ id: admin?.id, data: updateData }))
    setIsShowConfirmDialogUpdate(false)
    dialogUpdate()
  }

  return (
    <>
      {isShowDialogUpdate && (
        <ActionAlert
          actionAlertContentText={`Se actualizará el administrador ${admin?.name} ${admin?.lastname} `}
          actionAlertTextButton='Cerrar'
          actionAlertTitle='Actualizar administrador'
          isOpen={isShowDialogUpdate}
          isShowPrimaryButton
          onClick={handleSubmit(handleDataForm)}
          primaryButtonTextAlert='Actualizar'
          setActionsIsOpen={dialogUpdate}
        >
          <AdminForm adminForm={adminForm} />
        </ActionAlert>
      )}
      {isShowConfirmDialogUpdate && (
        <Alert
          actionButton={onSubmit}
          alertContentText='La información se actualizará con los nuevos valores'
          alertTextButton='Cancelar'
          alertTitle={`¿Quieres actualizar el administrador ${admin?.name}?`}
          isShowPrimaryButton
          isOpen={isShowConfirmDialogUpdate}
          primaryButtonTextAlert='Actualizar'
          setIsOpen={setIsShowConfirmDialogUpdate}
        />
      )}
    </>
  )
}

UpdateAdmin.propTypes = {
  admin: PropTypes.shape({
    id: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  dialogUpdate: PropTypes.func.isRequired,
  isShowDialogUpdate: PropTypes.bool.isRequired,
}

export default UpdateAdmin
