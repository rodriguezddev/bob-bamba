import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { GeneralTitle } from '../../../../components/texts'
import { MainInput } from '../../../../components/inputs'
import {
  getEmailPattern,
  getPasswordPattern,
  getRepeatPasswordValidation,
} from '../../../../utils/utilsValidations'

const AdminForm = ({ adminForm }) => {
  const { control, watch } = adminForm
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
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
        <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Apellido*' />
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
        <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Contraseña*' />
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
  )
}

AdminForm.propTypes = {
  adminForm: PropTypes.shape({
    control: PropTypes.shape({}).isRequired,
    watch: PropTypes.func.isRequired,
  }).isRequired,
}

export default AdminForm
