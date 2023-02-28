import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Box, Grid, Switch, Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { GeneralTitle } from '../../../../components/texts'
import { MainInput } from '../../../../components/inputs'
import { BackButton, MainButton } from '../../../../components/buttons'
import Alert from '../../../../components/modals/Alert/Alert'
import {
  createCarrier,
  resetCarrier,
} from '../../../../slices/carriers/carrierSlice'

const CreateCarriers = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { carrier } = useSelector((state) => state.carrier)
  const { isLoading } = useSelector((state) => state.loading)
  const [isShowAlert, setIsShowAlert] = useState(false)
  const { control, handleSubmit } = useForm()

  const onSubmit = (dataForm) => {
    const values = {
      name: dataForm.name,
      code: dataForm.code,
      is_enabled: dataForm.is_enabled,
    }

    dispatch(createCarrier(values))
  }

  const handleCloseDialogCarrier = () => {
    dispatch(resetCarrier())
    setIsShowAlert(false)
    navigate('/carriers')
  }

  useEffect(() => {
    if (carrier && Object.entries(carrier)?.length !== 0) {
      setIsShowAlert(true)
    }
  }, [carrier])

  return (
    <Box sx={{ width: '100%' }}>
      {isShowAlert && (
        <Alert
          alertContentText={`Se creo el carrier ${carrier?.name}`}
          alertTextButton='Cerrar'
          alertTitle='¡Registro exitoso!'
          isOpen={isShowAlert}
          setIsOpen={handleCloseDialogCarrier}
        />
      )}
      <BackButton />
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle data-testid='title-create-carrier' text='Crear carrier' />
      </Box>
      <form>
        <Grid container marginTop='2rem' spacing='2rem'>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Nombre(s)*'
            />
            <Controller
              control={control}
              defaultValue=''
              name='name'
              rules={{
                required: 'El nombre del carrier es requerido',
              }}
              render={({
                field: { onChange, value },
                fieldState: { error: errorInput },
              }) => (
                <Grid container flexDirection='column' marginTop='.5rem'>
                  <MainInput
                    error={!!errorInput}
                    height='3rem'
                    hiddenIcon
                    id='name-carrier'
                    placeholder=''
                    radius='.5rem'
                    onChange={onChange}
                    type='text'
                    value={value}
                    width='18rem'
                  />
                  <Typography
                    color='error.main'
                    data-testid='error-message-name-carrier'
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
              }}
              render={({
                field: { onChange, value },
                fieldState: { error: errorInput },
              }) => (
                <Grid container flexDirection='column' marginTop='.5rem'>
                  <MainInput
                    error={!!errorInput}
                    height='3rem'
                    hiddenIcon
                    id='code-carrier'
                    placeholder=''
                    radius='.5rem'
                    onChange={onChange}
                    type='text'
                    value={value}
                    width='18rem'
                  />
                  <Typography
                    color='error.main'
                    data-testid='error-message-code-carrier'
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
              text='Habilitar'
            />
            <Controller
              control={control}
              defaultValue={false}
              name='is_enabled'
              render={({ field: { onChange, value } }) => (
                <Grid container flexDirection='column' marginTop='.5rem'>
                  <Grid>
                    <Typography
                      data-testid='message-is-enabled-carrier'
                      variant='caption'
                    >
                      No
                    </Typography>
                    <Switch
                      id='enabled-carrier'
                      value={value}
                      onChange={onChange}
                    />
                    <Typography
                      data-testid='message-is-enabled-carrier'
                      variant='caption'
                    >
                      Si
                    </Typography>
                  </Grid>
                  {!value && (
                    <Typography
                      data-testid='message-is-enabled-carrier'
                      variant='caption'
                    >
                      El carrier se creara, pero no estará habilitado
                    </Typography>
                  )}
                </Grid>
              )}
            />
          </Grid>
        </Grid>
      </form>
      <Box display='flex' my={4} sx={{ justifyContent: 'flex-end' }}>
        <MainButton
          disabled={isLoading}
          height='3rem'
          onClick={handleSubmit(onSubmit)}
          radius='1.55rem'
          type='primary'
          width='10.12rem'
        >
          Enviar
        </MainButton>
      </Box>
    </Box>
  )
}

export default CreateCarriers
