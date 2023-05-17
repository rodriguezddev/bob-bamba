import {
  Box, Grid, MenuItem, Switch, Typography,
} from '@mui/material'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BackButton, MainButton } from '../../../../components/buttons'
import { GeneralTitle } from '../../../../components/texts'
import { MainInput, SelectInput } from '../../../../components/inputs'
import NotificationFields from '../../components/NotificationFields/NotificationFields'
import { getEmailPattern } from '../../../../utils/utilsValidations'
import {
  createNoticeAccounts,
  getNoticeAccountsConfig,
  resetNoticeAccounts,
} from '../../../../slices/noticeAccounts/noticeAccountsSlice'
import { Alert } from '../../../../components/modals'

const CreateNoticeAccount = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { config, noticeAccount } = useSelector((state) => state.noticeAccount)
  const { isLoading } = useSelector((state) => state.loading)
  const {
    control, handleSubmit, watch, reset,
  } = useForm()
  const accountName = watch('accountName') || ''
  const providerName = watch('provider') || ''
  const noticeAccountName = watch('name') || ''
  const providers = config[accountName]?.providers || {}
  const keyTypes = config[accountName]?.providers[providerName]?.key_types || {}

  const handleKeysFields = (types, form) => {
    const keys = {}

    Object.keys(types).forEach((key) => {
      if ({}.hasOwnProperty.call(form, key)) {
        keys[key] = form[key]
      }
    })

    return keys
  }

  const onSubmit = (dataForm) => {
    const data = {
      name: dataForm.name,
      keys: handleKeysFields(keyTypes, dataForm),
      is_enabled: dataForm.is_enabled,
      provider: dataForm.provider,
      notification_type: dataForm.accountName,
    }

    dispatch(createNoticeAccounts(data))
  }

  const handleCloseDialogAccountName = () => {
    dispatch(resetNoticeAccounts())
    navigate('/notice-account')
  }

  useEffect(() => {
    dispatch(getNoticeAccountsConfig())
  }, [])

  useEffect(() => {
    if (!accountName) {
      reset((formValues) => ({
        ...formValues,
        accountName: '',
      }))
    }
  }, [accountName])

  return (
    <Box sx={{ width: '100%' }}>
      <BackButton />
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle
          data-testid='title-create-account-name'
          text='Crear cuenta de notificaciones'
        />
      </Box>
      <Grid container marginTop='2rem' spacing='2rem'>
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Nombre*' />
          <Controller
            control={control}
            defaultValue=''
            name='name'
            rules={{
              required: 'El nombre de la cuenta es requerido',
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <MainInput
                  error={!!errorInput}
                  hiddenIcon
                  id='name-notice-account'
                  onChange={onChange}
                  placeholder=''
                  radius='.5rem'
                  type='text'
                  value={value}
                />
                <Typography
                  color='error.main'
                  data-testid='error-message-name-notice-account'
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
            text='Selecciona una Acción'
          />
          <Controller
            control={control}
            defaultValue=''
            name='accountName'
            rules={{
              required: 'El acción es requerida',
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <SelectInput
                  error={!!errorInput}
                  id='accountName'
                  onChange={onChange}
                  value={value}
                >
                  <MenuItem value=''>Seleccionar</MenuItem>
                  {Object.entries(config).map(([key]) => (
                    <MenuItem key={key} value={key}>
                      {key}
                    </MenuItem>
                  ))}
                </SelectInput>
                <Typography
                  color='error.main'
                  data-testid='error-message-account-name-campaigns'
                  mt={1}
                  variant='caption'
                >
                  {errorInput?.message}
                </Typography>
              </Grid>
            )}
          />
        </Grid>
        {accountName && (
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Selecciona un proveedor'
            />
            <Controller
              control={control}
              defaultValue=''
              name='provider'
              rules={{
                required: 'El proveedor es requerido',
              }}
              render={({
                field: { onChange, value },
                fieldState: { error: errorInput },
              }) => (
                <Grid container flexDirection='column' marginTop='.5rem'>
                  <SelectInput
                    error={!!errorInput}
                    id='accountName'
                    onChange={onChange}
                    value={value}
                  >
                    <MenuItem value=''>Seleccionar</MenuItem>
                    {Object.entries(providers).map(([key]) => (
                      <MenuItem key={key} value={key}>
                        {key}
                      </MenuItem>
                    ))}
                  </SelectInput>
                  <Typography
                    color='error.main'
                    data-testid='error-message-account-name'
                    mt={1}
                    variant='caption'
                  >
                    {errorInput?.message}
                  </Typography>
                </Grid>
              )}
            />
          </Grid>
        )}
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Habilitar' />
          <Controller
            control={control}
            defaultValue={false}
            name='is_enabled'
            render={({ field: { onChange, value } }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <Grid>
                  <Typography
                    data-testid='message-is-enabled-accountName'
                    variant='caption'
                  >
                    No
                  </Typography>
                  <Switch id='is_enabled' value={value} onChange={onChange} />
                  <Typography
                    data-testid='message-is-enabled-accountName'
                    variant='caption'
                  >
                    Si
                  </Typography>
                </Grid>
              </Grid>
            )}
          />
        </Grid>
        {providerName
          && keyTypes !== undefined
          && Object?.entries(keyTypes).map(([key, input]) => (
            <Grid item key={key} lg={4} md={6} xs={12}>
              <GeneralTitle
                fontSize='.75rem'
                lineHeight='1rem'
                text={input?.description}
              />
              <Controller
                control={control}
                defaultValue={input.type === 'boolean' ? false : ''}
                name={key}
                rules={{
                  ...(input.required && {
                    required: `El nombre del ${key} es requerido`,
                  }),
                  ...(input.type === 'email' && {
                    pattern: getEmailPattern(),
                  }),
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error: errorInput },
                }) => (
                  <Grid container flexDirection='column' marginTop='.5rem'>
                    <NotificationFields
                      input={input}
                      id={key}
                      onChange={onChange}
                      value={value}
                    />
                    <Typography
                      color='error.main'
                      data-testid={`error-message-${key}`}
                      variant='caption'
                    >
                      {errorInput?.message}
                    </Typography>
                  </Grid>
                )}
              />
            </Grid>
          ))}
      </Grid>
      <Box display='flex' my={4} sx={{ justifyContent: 'flex-end' }}>
        <MainButton
          data-testid='button-create-notice-account'
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          radius='1.55rem'
          type='primary'
        >
          Enviar
        </MainButton>
      </Box>
      {noticeAccount?.isSuccess && (
        <Alert
          alertContentText={`Se creo la cuenta ${noticeAccountName} correctamente`}
          alertTextButton='Cerrar'
          alertTitle='¡Registro exitoso!'
          isOpen={noticeAccount?.isSuccess}
          setIsOpen={handleCloseDialogAccountName}
        />
      )}
    </Box>
  )
}

export default CreateNoticeAccount
