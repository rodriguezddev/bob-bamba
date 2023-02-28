import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, Switch, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Controller, useForm } from 'react-hook-form'
import { MainInput } from '../../../../components/inputs'
import { GeneralTitle } from '../../../../components/texts'
import { Alert } from '../../../../components/modals'
import {
  resetCarrier,
  updateCarrier,
} from '../../../../slices/carriers/carrierSlice'

const CarrierForm = ({
  carrierId,
  isShowConfirmAlert,
  setIsShowConfirmAlert,
  setIsShowUpdateAlert,
}) => {
  const dispatch = useDispatch()
  const { carrier } = useSelector((state) => state.carrier)
  const [showAlert, setShowAlert] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = (dataForm) => {
    const values = {
      name: dataForm.name,
      code: dataForm.code,
      is_enabled: dataForm.is_enabled,
      id: carrierId,
    }

    dispatch(updateCarrier({ ...values }))
    setIsShowConfirmAlert(false)
    reset()
  }

  const handleCloseAlert = () => {
    dispatch(resetCarrier())
    setShowAlert(false)
    setIsShowUpdateAlert(false)
  }

  useEffect(() => {
    if (carrier && Object.entries(carrier)?.length !== 0) {
      setShowAlert(true)
    }
  }, [carrier])

  useEffect(() => {
    if (Object.entries(errors).length !== 0) {
      setIsShowConfirmAlert(false)
    }
  }, [errors])

  return (
    <Box>
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
      {isShowConfirmAlert && (
        <Alert
          actionButton={handleSubmit(onSubmit)}
          alertContentText='Los datos de este carrier se sobre escribirán'
          alertTextButton='Cancelar'
          alertTitle='Quieres editar este carrier?'
          isShowPrimaryButton
          isOpen={isShowConfirmAlert}
          setIsOpen={setIsShowConfirmAlert}
          primaryButtonTextAlert='Aceptar'
        />
      )}
      {showAlert && (
        <Alert
          alertContentText={`Se actualizo el carrier ${carrier?.name}`}
          alertTextButton='Cerrar'
          alertTitle='¡Actualización exitosa!'
          isOpen={showAlert}
          setIsOpen={handleCloseAlert}
        />
      )}
    </Box>
  )
}

CarrierForm.propTypes = {
  carrierId: PropTypes.string.isRequired,
  isShowConfirmAlert: PropTypes.bool.isRequired,
  setIsShowConfirmAlert: PropTypes.func.isRequired,
  setIsShowUpdateAlert: PropTypes.func.isRequired,
}

export default CarrierForm
