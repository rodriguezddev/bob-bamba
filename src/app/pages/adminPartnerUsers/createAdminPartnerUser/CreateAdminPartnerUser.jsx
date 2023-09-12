import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box, Grid, MenuItem, Typography,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { BackButton, MainButton } from '../../../components/buttons'
import { GeneralTitle } from '../../../components/texts'
import { MainInput, SelectInput } from '../../../components/inputs'
import {
  getEmailPattern,
  getPasswordPattern,
  getRepeatPasswordValidation,
} from '../../../utils/utilsValidations'
import { getPartners } from '../../../slices/partner/partnerSlice'
import {
  createAdminsPartnerUsers,
  resetAdminPartnerUsers,
} from '../../../slices/adminPartnerUsers/adminPartnerUsersSlice'
import { Alert } from '../../../components/modals'
import useRowsPerPage from '../../../hooks/useRowsPerPage'
import { Pagination } from '../../../components/tables'

const CreateAdminPartnerUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { control, handleSubmit, watch } = useForm()
  const { partners } = useSelector((state) => state.partner)
  const { adminPartnerUser } = useSelector((state) => state.adminPartnerUser)
  const { isLoading } = useSelector((state) => state.loading)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const selectRowsPerPage = 100
  const { page, onPageChange } = useRowsPerPage(
    getPartners,
    dispatch,
    selectRowsPerPage,
  )

  useEffect(() => {
    dispatch(getPartners('?limit=100'))
  }, [])

  const onSubmit = (dataForm) => {
    const values = {
      name: dataForm.name,
      lastname: dataForm.lastname,
      second_lastname: dataForm.secondLastname,
      email: dataForm.email,
      password: dataForm.password,
      partner_id: dataForm.partnerId,
    }

    dispatch(createAdminsPartnerUsers(values))
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleCloseDialogCreateUser = () => {
    dispatch(resetAdminPartnerUsers())
    navigate('/admin-partner-users')
  }

  return (
    <Box sx={{ width: '100%' }}>
      <BackButton />
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle
          data-testid='title-create-admin'
          text='Crear usuario admin partner'
        />
      </Box>
      <Grid container marginTop='2rem' spacing='2rem'>
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Nombre(s)*' />
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
                  id='name'
                  onChange={onChange}
                  placeholder=''
                  radius='.5rem'
                  type='text'
                  value={value}
                />
                <Typography
                  color='error.main'
                  data-testid='error-message-name'
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
            text='Apellido Paterno*'
          />
          <Controller
            control={control}
            defaultValue=''
            name='lastname'
            rules={{
              required: 'El Apellido es requerido',
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <MainInput
                  error={!!errorInput}
                  hiddenIcon
                  id='lastname'
                  onChange={onChange}
                  placeholder=''
                  radius='.5rem'
                  type='text'
                  value={value}
                />
                <Typography
                  color='error.main'
                  data-testid='error-message-lastname'
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
            text='Apellido Materno'
          />
          <Controller
            control={control}
            defaultValue=''
            name='secondLastname'
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <MainInput
                  error={!!errorInput}
                  hiddenIcon
                  id='secondLastname'
                  onChange={onChange}
                  placeholder=''
                  radius='.5rem'
                  type='text'
                  value={value}
                />
              </Grid>
            )}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Email*' />
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
                  id='email'
                  onChange={onChange}
                  placeholder=''
                  radius='.5rem'
                  type='text'
                  value={value}
                />
                <Typography
                  color='error.main'
                  data-testid='error-message-email'
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
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle
            fontSize='.75rem'
            lineHeight='1rem'
            text='Selecciona un partner'
          />
          <Controller
            control={control}
            defaultValue=''
            name='partnerId'
            rules={{
              required: 'El nombre del partner es requerido',
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <SelectInput
                  error={!!errorInput}
                  id='partnerId'
                  onChange={onChange}
                  value={value}
                >
                  <MenuItem value=''>Seleccionar</MenuItem>
                  {partners?.data?.map((partner) => (
                    <MenuItem key={partner?.id} value={partner?.id}>
                      {partner?.name}
                    </MenuItem>
                  ))}
                  <Grid container display='flex' alignItems='center'>
                    <Pagination
                      count={partners?.meta?.total ?? 0}
                      labelDisplayedRows={() => ''}
                      onPageChange={onPageChange}
                      page={page}
                      rowsPerPage={selectRowsPerPage}
                      rowsPerPageOptions={[0]}
                      SelectProps={{
                        native: true,
                      }}
                    />
                  </Grid>
                </SelectInput>
                <Typography
                  color='error.main'
                  data-testid='error-message-partnerId'
                  mt={1}
                  variant='caption'
                >
                  {errorInput?.message}
                </Typography>
              </Grid>
            )}
          />
        </Grid>
      </Grid>
      <Box display='flex' my={4} sx={{ justifyContent: 'flex-end' }}>
        <MainButton
          data-testid='create-admin-button'
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          radius='1.55rem'
          type='primary'
        >
          Enviar
        </MainButton>
      </Box>
      {adminPartnerUser?.isSuccess && (
        <Alert
          alertContentText={`Se creo la cuenta ${adminPartnerUser?.name} ${adminPartnerUser?.lastname} correctamente`}
          alertTextButton='Cerrar'
          alertTitle='¡Registro exitoso!'
          isOpen={adminPartnerUser?.isSuccess}
          setIsOpen={handleCloseDialogCreateUser}
        />
      )}
    </Box>
  )
}

export default CreateAdminPartnerUser
