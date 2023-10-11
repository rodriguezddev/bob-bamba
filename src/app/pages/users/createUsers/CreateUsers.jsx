import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Box, Grid, MenuItem, Switch, Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { es } from 'date-fns/locale'
import DateFnsUtils from '@date-io/date-fns'
import { format } from 'date-fns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { BackButton, MainButton } from '../../../components/buttons'
import { GeneralTitle } from '../../../components/texts'
import { DatePicker, MainInput, SelectInput } from '../../../components/inputs'
import {
  getCurpPattern,
  getEmailPattern,
  getPhonePattern,
  getRfcPattern,
  validationLegalAge,
} from '../../../utils/utilsValidations'
import { getPartners } from '../../../slices/partner/partnerSlice'
import { createUser, resetCreateUser } from '../../../slices/user/userSlice'
import { Alert } from '../../../components/modals'
import { Pagination } from '../../../components/tables'
import useRowsPerPage from '../../../hooks/useRowsPerPage'

const CreateUsers = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const { isLoading } = useSelector((state) => state.loading)
  const { partners } = useSelector((state) => state.partner)
  const { user } = useSelector((state) => state.user)
  const selectRowsPerPage = 100
  const { page, onPageChange } = useRowsPerPage(
    getPartners,
    dispatch,
    selectRowsPerPage,
  )

  const onSubmit = (dataForm) => {
    const data = {
      accepted_newsletter: dataForm.acceptedNewsletter,
      ...(dataForm.birthdate && {
        birthdate: format(dataForm.birthdate, 'yyyy-MM-dd'),
      }),
      cellphone: dataForm.cellphone,
      ...(dataForm.email && { email: dataForm.email }),
      ...(dataForm.externalUserId && {
        external_user_id: dataForm.externalUserId,
      }),
      ...(dataForm.gender && { gender: dataForm.gender }),
      lastname: dataForm.lastname,
      name: dataForm.name,
      partner: dataForm.partner,
      ...(dataForm.personalId && { personal_id: dataForm.personalId }),
      ...(dataForm.secondLastname && {
        second_lastname: dataForm.secondLastname,
      }),
      ...(dataForm.taxId && { tax_id: dataForm.taxId }),
    }

    dispatch(createUser(data))
  }

  const handleCloseDialogCreateUser = () => {
    dispatch(resetCreateUser())
    navigate(`/users/details/${user.id}`)
  }

  useEffect(() => {
    dispatch(getPartners('?limit=100'))
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <BackButton />
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle data-testid='title-create-user' text='Crear usuario' />
      </Box>
      <Grid container marginTop='2rem' spacing='2rem'>
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Nombre(s)*' />
          <Controller
            control={control}
            defaultValue=''
            name='name'
            rules={{
              required: 'El nombre del usuario es requerido',
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
            text='Primer Apellido*'
          />
          <Controller
            control={control}
            defaultValue=''
            name='lastname'
            rules={{
              required: 'El primer apellido del usuario es requerido',
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
            text='Segundo Apellido'
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
                <Typography
                  color='error.main'
                  data-testid='error-message-secondLastname'
                  variant='caption'
                >
                  {errorInput?.message}
                </Typography>
              </Grid>
            )}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Partner*' />
          <Controller
            control={control}
            defaultValue=''
            name='partner'
            rules={{
              required: 'El partner del usuario es requerido',
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid
                container
                flexDirection='column'
                marginTop='.5rem'
                width='16rem'
              >
                <SelectInput
                  error={!!errorInput}
                  id='partnerId'
                  onChange={onChange}
                  value={value}
                >
                  <MenuItem value=''>Seleccionar</MenuItem>
                  {partners?.data?.map((partner) => (
                    <MenuItem key={partner?.id} value={`${partner?.id}`}>
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
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Celular*' />
          <Controller
            control={control}
            defaultValue=''
            name='cellphone'
            rules={{
              required: 'El numero de celular del usuario es requerido',
              pattern: getPhonePattern(),
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <MainInput
                  error={!!errorInput}
                  hiddenIcon
                  id='cellphone'
                  onChange={onChange}
                  placeholder=''
                  radius='.5rem'
                  type='text'
                  value={value}
                />
                <Typography
                  color='error.main'
                  data-testid='error-message.cellphone'
                  variant='caption'
                >
                  {errorInput?.message}
                </Typography>
              </Grid>
            )}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Email' />
          <Controller
            control={control}
            defaultValue=''
            name='email'
            rules={{
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
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='RFC' />
          <Controller
            control={control}
            defaultValue=''
            name='taxId'
            rules={{
              pattern: getRfcPattern(),
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <MainInput
                  error={!!errorInput}
                  hiddenIcon
                  id='taxId'
                  onChange={onChange}
                  placeholder=''
                  radius='.5rem'
                  type='text'
                  value={value}
                />
                <Typography
                  color='error.main'
                  data-testid='error-message-taxId'
                  variant='caption'
                >
                  {errorInput?.message}
                </Typography>
              </Grid>
            )}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='CURP' />
          <Controller
            control={control}
            defaultValue=''
            name='personalId'
            rules={{
              pattern: getCurpPattern(),
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <MainInput
                  error={!!errorInput}
                  hiddenIcon
                  id='personalId'
                  onChange={onChange}
                  placeholder=''
                  radius='.5rem'
                  type='text'
                  value={value}
                />
                <Typography
                  color='error.main'
                  data-testid='error-message-personalId'
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
            text='Fecha de Nacimiento'
          />
          <Controller
            control={control}
            defaultValue=''
            name='birthdate'
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid
                container
                flexDirection='column'
                marginTop='.5rem'
                width='16rem'
              >
                <LocalizationProvider
                  adapterLocale={es}
                  dateAdapter={AdapterDateFns}
                  localeText={{ cancelButtonLabel: 'Cancelar' }}
                  utils={DateFnsUtils}
                >
                  <DatePicker
                    error={!!errorInput}
                    maxDate={validationLegalAge(new Date())}
                    onChange={onChange}
                    sx={{
                      borderRadius: '.5rem',
                      borderColor: errorInput && 'red',
                    }}
                    toolbarTitle='Selecciona una fecha'
                    value={value}
                  />
                </LocalizationProvider>
                <Typography
                  color='error.main'
                  data-testid='error-message-send-date-campaigns'
                  mt={1}
                  variant='caption'
                >
                  {errorInput?.message}
                </Typography>
              </Grid>
            )}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Genero' />
          <Controller
            control={control}
            defaultValue=''
            name='gender'
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <SelectInput
                  error={!!errorInput}
                  onChange={onChange}
                  id='gender'
                  value={value}
                >
                  <MenuItem value='-'>Seleccionar</MenuItem>
                  <MenuItem value='M'>Masculino</MenuItem>
                  <MenuItem value='F'>Femenino</MenuItem>
                  <MenuItem value='O'>Otro</MenuItem>
                </SelectInput>
                <Typography
                  color='error.main'
                  data-testid='error-message-gender'
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
            text='Id usuario externo'
          />
          <Controller
            control={control}
            defaultValue=''
            name='externalUserId'
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <MainInput
                  error={!!errorInput}
                  hiddenIcon
                  id='externalUserId'
                  onChange={onChange}
                  placeholder=''
                  radius='.5rem'
                  type='text'
                  value={value}
                />
                <Typography
                  color='error.main'
                  data-testid='error-message.externalUserId'
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
            text='Acepta notificaciones'
          />
          <Controller
            control={control}
            defaultValue
            name='acceptedNewsletter'
            render={({ field: { onChange, value } }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <Grid>
                  <Typography
                    data-testid='message-is-enabled-accepted-newsletter'
                    variant='caption'
                  >
                    No
                  </Typography>
                  <Switch
                    checked={value}
                    id='acceptedNewsletter'
                    onChange={onChange}
                    value={value}
                  />
                  <Typography
                    data-testid='message-accepted-newsletter'
                    variant='caption'
                  >
                    Sí
                  </Typography>
                </Grid>
              </Grid>
            )}
          />
        </Grid>
      </Grid>
      <Box display='flex' my={4} sx={{ justifyContent: 'flex-end' }}>
        <MainButton
          data-testid='create-user-button'
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          radius='1.55rem'
          type='primary'
        >
          Enviar
        </MainButton>
      </Box>
      {user?.createUser?.isSuccess && (
        <Alert
          alertContentText={`Se creo la cuenta ${user.name} ${user.lastname} correctamente`}
          alertTextButton='Cerrar'
          alertTitle='¡Registro exitoso!'
          isOpen={user?.createUser?.isSuccess}
          setIsOpen={handleCloseDialogCreateUser}
        />
      )}
    </Box>
  )
}

export default CreateUsers
