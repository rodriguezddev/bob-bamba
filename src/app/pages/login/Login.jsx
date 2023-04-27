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
    const data = new FormData()

    data.append('grant_type', 'password')
    data.append('username', dataForm.email)
    data.append('password', dataForm.password)
    data.append('client_id', process.env.REACT_APP_API_CLIENT_ID)
    data.append('client_secret', process.env.REACT_APP_API_CLIENT_SECRET)

    dispatch(login(data))
  }

  useEffect(() => {
    if (user.token) {
      navigate('/')
    }
  }, [user.token])

  return (
    <Grid
      alignItems='center'
      container
      direction='column'
      justifyContent='center'
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
          <img alt='Bamba' height={58} src={logo} width={360} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box px={3}>
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
              <InputTextLarge
                background={theme.palette.background.blueLight}
                fontSize='1.12rem'
                id='email'
                onChange={onChange}
                placeholder='Ingresa tu correo electrónico'
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
            control={control}
            defaultValue=''
            name='password'
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
          disabled={isLoading}
          fontSize='1.12rem'
          height='3.75rem'
          onClick={handleSubmit(onSubmit)}
          radius='6.25rem'
          type='primary'
          width='26.25rem'
        >
          Enviar
        </MainButton>
      </Grid>
    </Grid>
  )
}

export default Login
