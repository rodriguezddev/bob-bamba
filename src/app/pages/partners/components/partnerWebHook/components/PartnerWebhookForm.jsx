import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import {
  Box, Grid, MenuItem, Typography,
} from '@mui/material'
import { GeneralTitle } from '../../../../../components/texts'
import { MainInput, SelectInput } from '../../../../../components/inputs'
import { getUrlPattern } from '../../../../../utils/utilsValidations'

const PartnerWebHookForm = ({ webhookPartnerForm }) => {
  const { control } = webhookPartnerForm
  const { scope } = useSelector((state) => state.partner)

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
        <GeneralTitle
          fontSize='.75rem'
          lineHeight='1rem'
          text='Url del webhook*'
        />
        <Controller
          control={control}
          defaultValue=''
          name='url'
          rules={{
            required: 'El proveedor es requerido',
            pattern: getUrlPattern(),
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
      <Grid item lg={4} md={6} xs={12}>
        <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Alcances*' />
        <Controller
          control={control}
          defaultValue={[]}
          name='scope'
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
                error={!!errorInput}
                id='scope'
                multiple
                onChange={onChange}
                value={value}
              >
                <MenuItem value=''>Seleccionar</MenuItem>
                {scope?.data
                  && Object.entries(scope.data).map(([key, item]) => (
                    <MenuItem key={key} value={key}>
                      {item}
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
    </Box>
  )
}

PartnerWebHookForm.propTypes = {
  webhookPartnerForm: PropTypes.shape().isRequired,
}

export default PartnerWebHookForm
