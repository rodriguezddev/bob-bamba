import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Grid, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { MainButton } from '../../components/buttons'
import { HelperTextError } from '../../components/texts'
import { InputTextLarge } from '../../components/inputs'
import { getEmailPattern } from '../../utils/utilsValidations'
import logo from '../../assets/images/logo_login.png'
import { login } from '../../slices/auth/authSlice'
import theme from '../../theme'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { isLoading } = useSelector((state) => state.loading)
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = (dataForm) => {
    const values = {
      email: dataForm.email,
      password: dataForm.password,
    }

    dispatch(login(values))
  }

  useEffect(() => {
    if (user.token) {
      navigate('/')
    }
  }, [user.token])

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={3}
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12}>
        <Typography
          sx={{
            fontSize: '3rem',
            fontWeight: '600',
            lineHeight: '2.56rem',
          }}
        >
          PANEL
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box mt={3} mb={5}>
          <img src={logo} alt='Bamba' width={470} height={88} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box px={3}>
          <Controller
            name='email'
            defaultValue=''
            control={control}
            rules={{
              required: 'El email es requerido',
              pattern: getEmailPattern(),
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <InputTextLarge
                id='email'
                placeholder='Ingresa tu correo electrónico'
                background={theme.palette.background.blueLight}
                fontSize='1.12rem'
                height='4.75rem'
                onChange={onChange}
                type='text'
                value={value}
                error={!!errorInput}
              />
            )}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box px={3}>
          <Controller
            name='password'
            defaultValue=''
            control={control}
            rules={{
              required: 'El password es requerido',
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <InputTextLarge
                id='password'
                placeholder='Ingresa tu contraseña'
                background={theme.palette.background.blueLight}
                fontSize='1.12rem'
                height='4.75rem'
                onChange={onChange}
                type='password'
                value={value}
                error={!!errorInput}
              />
            )}
          />
        </Box>
      </Grid>
      <Grid item xs={12} data-testid='message-error-login'>
        {Object.keys(errors).length !== 0 && (
          <HelperTextError width='30.69rem'>
            <Box>{errors?.email?.message}</Box>
            <Box>{errors?.password?.message}</Box>
          </HelperTextError>
        )}
      </Grid>
      <Grid item xs={12}>
        <MainButton
          onClick={handleSubmit(onSubmit)}
          radius='6.25rem'
          width='30.62rem'
          height='4.75rem'
          fontSize='1.12rem'
          type='primary'
          disabled={isLoading}
        >
          Enviar
        </MainButton>
      </Grid>
    </Grid>
  )
}

export default Login
