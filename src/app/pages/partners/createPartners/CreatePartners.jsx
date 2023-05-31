import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  Box, Grid, Typography, MenuItem,
} from '@mui/material'
import { BackButton, MainButton } from '../../../components/buttons'
import { MainInput, SelectInput } from '../../../components/inputs'
import { GeneralTitle } from '../../../components/texts'
import {
  getCodePattern,
  getEmailPattern,
  getPhonePattern,
  getRfcPattern,
} from '../../../utils/utilsValidations'
import {
  createPartner,
  resetPartner,
} from '../../../slices/partner/partnerSlice'
import { countryConstants } from '../../../slices/constants/countryConstants'
import Alert from '../../../components/modals/Alert/Alert'
import { formatCodePartner } from '../../../utils/utilsFormat'

const CreatePartners = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { partner } = useSelector((state) => state.partner)
  const { isLoading } = useSelector((state) => state.loading)
  const [showAlert, setShowAlert] = useState(false)
  const {
    control, handleSubmit, setValue, watch,
  } = useForm()
  const nameType = watch('name', '')
  const [code, setCode] = useState('')

  const handleNameInputChange = (event) => {
    const { value } = event.target

    setValue('name', value)
    setCode(formatCodePartner(value))
  }

  const handleCodeInputChange = (event) => {
    const { value } = event.target

    setValue('code', formatCodePartner(value))
    setCode(formatCodePartner(value))
  }

  const onSubmit = (dataForm) => {
    const values = {
      name: dataForm.name,
      code: code.toUpperCase(),
      type: dataForm.partnerType,
      company: {
        name: dataForm.nameCompany,
        email: dataForm.email,
        phone_number: dataForm.phone,
        country_code: dataForm.countryCode,
        ...(dataForm.taxId && { tax_id: dataForm.taxId }),
      },
    }
    dispatch(createPartner(values))
  }

  const handleCloseAlert = () => {
    dispatch(resetPartner())
    setShowAlert(false)
    navigate('/partners')
  }

  useEffect(() => {
    if (partner && Object.entries(partner)?.length !== 0) {
      setShowAlert(true)
    }
  }, [partner])

  return (
    <Box sx={{ width: '100%' }}>
      {showAlert && (
        <Alert
          alertContentText={`Se creo el partner ${partner?.name}`}
          alertTextButton='Cerrar'
          alertTitle='¡Registro exitoso!'
          setIsOpen={handleCloseAlert}
          isOpen={showAlert}
        />
      )}
      <Grid>
        <BackButton />
        <Box my={3}>
          <GeneralTitle data-testid='title-partners' text='Crear partner' />
        </Box>
      </Grid>
      <Grid container spacing='2rem'>
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
              field: { value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <MainInput
                  error={!!errorInput}
                  hiddenIcon
                  id='name'
                  onChange={handleNameInputChange}
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
              pattern: getCodePattern(),
            }}
            render={({
              field: { value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <MainInput
                  error={!!errorInput}
                  hiddenIcon
                  id='code'
                  onChange={handleCodeInputChange}
                  placeholder=''
                  radius='.5rem'
                  sx={{
                    '& input': {
                      textTransform: 'uppercase',
                    },
                  }}
                  type='text'
                  value={
                    formatCodePartner(value) || formatCodePartner(nameType)
                  }
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
            defaultValue=''
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
      <Box my={4}>
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
            defaultValue=''
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
      <Grid
        alignItems='flex-end'
        container
        direction='row'
        justifyContent='flex-end'
        spacing='2rem'
      >
        <Box my={7}>
          <MainButton
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
            radius='1.55rem'
            type='primary'
          >
            Enviar
          </MainButton>
        </Box>
      </Grid>
    </Box>
  )
}

export default CreatePartners
