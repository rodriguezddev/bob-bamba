import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { GeneralTitle } from '../../../components/texts'
import Alert from '../../../components/modals/Alert/Alert'
import { BackButton, MainButton } from '../../../components/buttons'
import { createAdmin, resetAdmin } from '../../../slices/adminUsers/adminSlice'
import AdminForm from '../components/adminForm'

const CreateAdminUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { admin } = useSelector((state) => state.admin)
  const { isLoading } = useSelector((state) => state.loading)
  const [showAlert, setShowAlert] = useState(false)
  const adminForm = useForm()
  const { handleSubmit } = adminForm

  const onSubmit = (dataForm) => {
    const values = {
      name: dataForm.name,
      lastname: dataForm.lastname,
      email: dataForm.email,
      password: dataForm.password,
    }
    dispatch(createAdmin(values))
  }

  const handleCloseAlert = () => {
    dispatch(resetAdmin())
    setShowAlert(false)
    navigate('/admin-users')
  }

  useEffect(() => {
    if (admin && Object.entries(admin)?.length !== 0) {
      setShowAlert(true)
    }
  }, [admin])

  return (
    <Box sx={{ width: '100%' }}>
      {showAlert && (
        <Alert
          alertContentText={`Se creo el administrador ${admin?.name}`}
          alertTextButton='Cerrar'
          alertTitle='¡Registro exitoso!'
          isOpen={showAlert}
          setIsOpen={handleCloseAlert}
        />
      )}
      <BackButton />
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle
          data-testid='title-admin-user'
          text='Crear usuario administrador'
        />
      </Box>
      <AdminForm adminForm={adminForm} />
      <Box display='flex' my={4} sx={{ justifyContent: 'flex-end' }}>
        <MainButton
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          radius='1.55rem'
          type='primary'
        >
          Enviar
        </MainButton>
      </Box>
    </Box>
  )
}

export default CreateAdminUser
