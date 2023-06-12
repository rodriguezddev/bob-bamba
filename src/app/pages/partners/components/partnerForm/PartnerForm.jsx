import React from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import {
  Box, Grid, MenuItem, Typography,
} from '@mui/material'
import { GeneralTitle } from '../../../../components/texts'
import { MainInput, SelectInput } from '../../../../components/inputs'
import {
  getCodePattern,
  getEmailPattern,
  getPhonePattern,
  getRfcPattern,
} from '../../../../utils/utilsValidations'
import { countryConstants } from '../../../../slices/constants/countryConstants'

const PartnerForm = ({ partner, partnerForm }) => {
  const { control } = partnerForm

  return (
    <>
      <Grid container mt={1} spacing='2rem'>
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Nombre*' />
          <Controller
            control={control}
            defaultValue=''
            name='name'
            rules={{
              required: 'El nombre es requerido',
            }}
            render={({
              field: { value, onChange },
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
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Código*' />
          <Controller
            control={control}
            defaultValue=''
            name='code'
            rules={{
              required: 'El código es requerido',
              pattern: getCodePattern(),
            }}
            render={({
              field: { value, onChange },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <MainInput
                  error={!!errorInput}
                  hiddenIcon
                  id='code'
                  onChange={onChange}
                  placeholder=''
                  radius='.5rem'
                  sx={{
                    '& input': {
                      textTransform: 'uppercase',
                    },
                  }}
                  type='text'
                  value={value}
                />
                <Typography
                  color='error.main'
                  data-testid='error-message-code'
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
            text='Tipo de partner* '
          />
          <Controller
            control={control}
            defaultValue={partner.type || ''}
            name='partnerType'
            rules={{
              required: 'El tipo de partner es requerido',
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <SelectInput
                  error={!!errorInput}
                  id='partnerType'
                  onChange={onChange}
                  value={value}
                >
                  <MenuItem value=''>Seleccionar</MenuItem>
                  <MenuItem value='AGGREGATOR'>Agregador</MenuItem>
                  <MenuItem value='DISTRIBUTOR'>Distribuidor</MenuItem>
                  <MenuItem value='SPONSOR'>Sponsor</MenuItem>
                </SelectInput>
                <Typography
                  color='error.main'
                  data-testid='error-message-partnerType'
                  variant='caption'
                >
                  {errorInput?.message}
                </Typography>
              </Grid>
            )}
          />
        </Grid>
      </Grid>
      <Box my={2}>
        <Typography variant='h6'>Compañía</Typography>
      </Box>
      <Grid container spacing='2rem'>
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle
            fontSize='.75rem'
            lineHeight='1rem'
            text='Nombre de la compañía*'
          />
          <Controller
            control={control}
            defaultValue=''
            name='nameCompany'
            rules={{
              required: 'El nombre de la compañía es requerido',
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <MainInput
                  error={!!errorInput}
                  hiddenIcon
                  id='nameCompany'
                  onChange={onChange}
                  placeholder=''
                  radius='.5rem'
                  type='text'
                  value={value}
                />
                <Typography
                  color='error.main'
                  data-testid='error-message-name-company'
                  variant='caption'
                >
                  {errorInput?.message}
                </Typography>
              </Grid>
            )}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='País*' />
          <Controller
            control={control}
            defaultValue={partner?.company?.country_code || ''}
            name='countryCode'
            rules={{
              required: 'El país es requerido',
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <SelectInput
                  error={!!errorInput}
                  id='countryCode'
                  onChange={onChange}
                  value={value}
                >
                  <MenuItem value=''>Seleccionar</MenuItem>
                  {countryConstants.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      {country.name}
                    </MenuItem>
                  ))}
                </SelectInput>
                <Typography
                  color='error.main'
                  data-testid='error-message-country'
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
            text='Teléfono de la compañía*'
          />
          <Controller
            control={control}
            defaultValue=''
            name='phone'
            rules={{
              required: 'El teléfono es requerido',
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
                  id='phone'
                  onChange={onChange}
                  placeholder=''
                  radius='.5rem'
                  type='text'
                  value={value}
                />
                <Typography
                  color='error.main'
                  data-testid='error-message-phone'
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
            text='Email de la compañía*'
          />
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
            text='RFC de la compañía (opcional)'
          />
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
                  data-testid='error-message-rfc'
                  variant='caption'
                >
                  {errorInput?.message}
                </Typography>
              </Grid>
            )}
          />
        </Grid>
      </Grid>
    </>
  )
}

PartnerForm.propTypes = {
  partner: PropTypes.shape({
    type: PropTypes.string,
    company: PropTypes.shape({
      country_code: PropTypes.string,
    }),
  }).isRequired,
  partnerForm: PropTypes.shape({
    control: PropTypes.shape({}).isRequired,
  }).isRequired,
}

export default PartnerForm
