import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Grid, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Controller, useForm } from 'react-hook-form'
import { GeneralTitle } from '../../../components/texts'
import { MainInput } from '../../../components/inputs'
import Alert from '../../../components/modals/Alert/Alert'
import { BackButton, MainButton } from '../../../components/buttons'
import {
  getEmailPattern,
  getPasswordPattern,
  getRepeatPasswordValidation,
} from '../../../utils/utilsValidations'
import { createAdmin, resetAdmin } from '../../../slices/adminUsers/adminSlice'

const CreateAdminUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { admin } = useSelector((state) => state.admin)
  const { isLoading } = useSelector((state) => state.loading)
  const [showAlert, setShowAlert] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { control, watch, handleSubmit } = useForm()

  const onSubmit = (dataForm) => {
    const values = {
      name: dataForm.name,
      lastname: dataForm.lastname,
      email: dataForm.email,
      password: dataForm.password,
    }
    dispatch(createAdmin(values))
  }
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
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
      <form>
        <Grid container marginTop='2rem' spacing='2rem'>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Nombre(s)*'
            />
            <Controller
              control={control}
              defaultValue=''
              name='name'
              rules={{
                required: 'El nombre es requerido',
              }}
              render={({
                field: { onChange, value },
                fieldState: { error: errorInput },
              }) => (
                <Grid container flexDirection='column' marginTop='.5rem'>
                  <MainInput
                    error={!!errorInput}
                    hiddenIcon
                    id='name-admin-user'
                    onChange={onChange}
                    placeholder=''
                    radius='.5rem'
                    type='text'
                    value={value}
                  />
                  <Typography
                    color='error.main'
                    data-testid='error-message-name-admin'
                    variant='caption'
                  >
                    {errorInput?.message}
                  </Typography>
                </Grid>
              )}
            />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Apellido*'
            />
            <Controller
              control={control}
              defaultValue=''
              name='lastname'
              rules={{
                required: 'El apellido es requerido',
              }}
              render={({
                field: { onChange, value },
                fieldState: { error: errorInput },
              }) => (
                <Grid container flexDirection='column' marginTop='.5rem'>
                  <MainInput
                    error={!!errorInput}
                    hiddenIcon
                    id='lastname-admin-user'
                    onChange={onChange}
                    placeholder=''
                    radius='.5rem'
                    type='text'
                    value={value}
                  />
                  <Typography
                    color='error.main'
                    data-testid='error-message-lastname-admin'
                    variant='caption'
                  >
                    {errorInput?.message}
                  </Typography>
                </Grid>
              )}
            />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Email*' />
            <Grid marginTop='.5rem'>
              <Controller
                control={control}
                defaultValue=''
                name='email'
                rules={{
                  required: 'El email es requerido',
                  pattern: getEmailPattern(),
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error: errorInput },
                }) => (
                  <Grid container flexDirection='column' marginTop='.5rem'>
                    <MainInput
                      error={!!errorInput}
                      hiddenIcon
                      id='email-admin-user'
                      onChange={onChange}
                      placeholder=''
                      radius='.5rem'
                      type='text'
                      value={value}
                    />
                    <Typography
                      color='error.main'
                      data-testid='error-message-email-admin'
                      variant='caption'
                    >
                      {errorInput?.message}
                    </Typography>
                  </Grid>
                )}
              />
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Contraseña*'
            />
            <Grid marginTop='.5rem'>
              <Controller
                control={control}
                defaultValue=''
                name='password'
                rules={{
                  required: 'La contraseña es requerida',
                  pattern: getPasswordPattern(),
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error: errorInput },
                }) => (
                  <Grid container flexDirection='column' marginTop='.5rem'>
                    <MainInput
                      disabledButton={false}
                      error={!!errorInput}
                      hiddenIcon={false}
                      id='password-admin-user'
                      Icon={showPassword ? Visibility : VisibilityOff}
                      onClick={handleShowPassword}
                      onChange={onChange}
                      placeholder=''
                      radius='.5rem'
                      type={showPassword ? 'text' : 'password'}
                      value={value}
                    />
                    <Typography
                      color='error.main'
                      data-testid='error-message-password-admin'
                      variant='caption'
                    >
                      {errorInput?.message}
                    </Typography>
                  </Grid>
                )}
              />
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Repite la Contraseña*'
            />
            <Grid marginTop='.5rem'>
              <Controller
                control={control}
                defaultValue=''
                name='confirmPassword'
                rules={{
                  required: 'Las contraseñas son distintas',
                  validate: getRepeatPasswordValidation(watch('password')),
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error: errorInput },
                }) => (
                  <Grid container flexDirection='column' marginTop='.5rem'>
                    <MainInput
                      disabledButton={false}
                      error={!!errorInput}
                      hiddenIcon={false}
                      id='confirm-password-admin-user'
                      Icon={showConfirmPassword ? Visibility : VisibilityOff}
                      onClick={handleShowConfirmPassword}
                      onChange={onChange}
                      placeholder=''
                      radius='.5rem'
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={value}
                    />
                    <Typography
                      color='error.main'
                      data-testid='error-message-confirm-password-admin'
                      variant='caption'
                    >
                      {errorInput?.message}
                    </Typography>
                  </Grid>
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
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
