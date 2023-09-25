import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Grid, MenuItem, Switch, Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Controller } from 'react-hook-form'
import { GeneralTitle } from '../../../../../components/texts'
import { MainInput, SelectInput } from '../../../../../components/inputs'
import { getNoticeAccountsConfig } from '../../../../../slices/noticeAccounts/noticeAccountsSlice'
import NotificationFields from '../../../components/NotificationFields/NotificationFields'
import { getEmailPattern } from '../../../../../utils/utilsValidations'
import { getKeyTypes } from '../../../../../utils/utilsFormat'

const NoticeAccountsForm = ({ account, noticeAccountUseForm }) => {
  const dispatch = useDispatch()
  const { config } = useSelector((state) => state.noticeAccount)
  const { control, reset, watch } = noticeAccountUseForm
  const accountName = watch('accountName') || ''
  const providerName = watch('provider') || ''
  const providers = config[accountName]?.providers || {}
  const keyTypes = config[accountName]?.providers[providerName]?.key_types || {}
  const allKeyTypes = getKeyTypes(config)

  const getInfoKey = (keys) => {
    let infoKeys = {}

    Object.entries(keys).forEach(([key]) => {
      infoKeys = {
        ...infoKeys,
        ...(account.keys[key] && { [key]: account.keys[key] }),
      }
    })

    return infoKeys
  }

  useEffect(() => {
    dispatch(getNoticeAccountsConfig())
  }, [])

  useEffect(() => {
    if (account) {
      reset({
        accountName: account?.notification_type,
        isEnabled: account?.is_enabled,
        name: account?.name,
        provider: account?.provider,
        ...getInfoKey(allKeyTypes),
      })
    }
  }, [account])

  return (
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
          name='isEnabled'
          render={({ field: { onChange, value } }) => (
            <Grid container flexDirection='column' marginTop='.5rem'>
              <Grid>
                <Typography
                  data-testid='message-is-enabled-accountName'
                  variant='caption'
                >
                  No
                </Typography>
                <Switch
                  checked={value}
                  id='isEnabled'
                  onChange={onChange}
                  value={value}
                />
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
  )
}

NoticeAccountsForm.propTypes = {
  account: PropTypes.shape({
    is_enabled: PropTypes.bool,
    keys: PropTypes.shape({}),
    name: PropTypes.string,
    notification_type: PropTypes.string,
    provider: PropTypes.string,
  }),
  noticeAccountUseForm: PropTypes.shape({
    control: PropTypes.shape({}).isRequired,
    reset: PropTypes.func.isRequired,
    watch: PropTypes.func.isRequired,
  }).isRequired,
}

NoticeAccountsForm.defaultProps = {
  account: null,
}

export default NoticeAccountsForm
