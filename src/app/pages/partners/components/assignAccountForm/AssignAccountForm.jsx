import React, { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Box, Grid, MenuItem, Typography,
} from '@mui/material'
import { GeneralTitle } from '../../../../components/texts'
import { MainInput, SelectInput } from '../../../../components/inputs'
import { noticeProviders } from '../../../../constants/noticeProvider'
import { getNoticeAccounts } from '../../../../slices/noticeAccounts/noticeAccountsSlice'
import { getFilterPattern } from '../../../../utils/utilsValidations'

const AssignAccountForm = ({ accountFormHook }) => {
  const dispatch = useDispatch()
  const { noticeAccounts } = useSelector((state) => state.noticeAccount)
  const { control, watch } = accountFormHook
  const provider = watch('provider') || ''

  useEffect(() => {
    if (provider) {
      dispatch(getNoticeAccounts(`?provider=${provider}`))
    }
  }, [provider])

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Grid item lg={4} mb={2} md={6} xs={12}>
        <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Proveedor' />
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
            <Grid
              container
              flexDirection='column'
              marginTop='.5rem'
              width='16rem'
            >
              <SelectInput
                error={!!errorInput}
                id='provider'
                onChange={onChange}
                value={value}
              >
                <MenuItem value=''>Seleccionar</MenuItem>
                {noticeProviders.map((noticeProvider) => (
                  <MenuItem
                    key={noticeProvider.name}
                    value={noticeProvider.name}
                  >
                    {noticeProvider.name}
                  </MenuItem>
                ))}
              </SelectInput>
              <Typography
                color='error.main'
                data-testid='error-message-expiration-period-product'
                mt={1}
                variant='caption'
              >
                {errorInput?.message}
              </Typography>
            </Grid>
          )}
        />
      </Grid>
      <Grid item lg={4} mb={2} md={6} xs={12}>
        <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Cuentas*' />
        <Controller
          control={control}
          defaultValue=''
          name='accountId'
          rules={{
            required: 'El nombre de la cuenta es requerido',
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
                disabled={provider === ''}
                error={!!errorInput}
                id='accountId'
                onChange={onChange}
                value={value}
              >
                <MenuItem value=''>Seleccionar</MenuItem>
                {noticeAccounts?.data?.map((noticeAccount) => (
                  <MenuItem
                    key={noticeAccount?.id}
                    value={`${noticeAccount?.id}`}
                  >
                    {noticeAccount?.name}
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
      <Grid item lg={4} md={6} xs={12}>
        <GeneralTitle
          fontSize='.75rem'
          lineHeight='1rem'
          text='Filtro para la cuenta (opcional)'
        />
        <Controller
          control={control}
          defaultValue=''
          name='filter'
          rules={{
            pattern: getFilterPattern(),
          }}
          render={({
            field: { onChange, value },
            fieldState: { error: errorInput },
          }) => (
            <Grid container flexDirection='column' marginTop='.5rem'>
              <MainInput
                error={!!errorInput}
                hiddenIcon
                id='filter'
                onChange={onChange}
                placeholder=''
                radius='.5rem'
                type='text'
                value={value}
              />
              <Typography
                color='error.main'
                data-testid='error-message-filter'
                variant='caption'
                width='12rem'
              >
                {errorInput?.message}
              </Typography>
            </Grid>
          )}
        />
      </Grid>
    </Box>
  )
}

AssignAccountForm.propTypes = {
  accountFormHook: PropTypes.shape().isRequired,
}

export default AssignAccountForm
