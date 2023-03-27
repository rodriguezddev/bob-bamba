import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import {
  Box, Grid, MenuItem, TextField, Typography,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { es } from 'date-fns/locale'
import DateFnsUtils from '@date-io/date-fns'
import { format } from 'date-fns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { GeneralTitle } from '../../../components/texts'
import { MainDateTimePicker, SelectInput } from '../../../components/inputs'
import { BackButton, MainButton } from '../../../components/buttons'
import {
  createCampaign,
  resetCampaign,
} from '../../../slices/campaigns/campaignsSlice'
import {
  getWhatsAppAccounts,
  getTemplates,
  resetTemplates,
} from '../../../slices/recoveryMessage/recoveryMessageSlice'
import UploadUsersCampaignButton from './components/uploadUsersButton/UploadUsersCampaignButton'
import { Alert } from '../../../components/modals'
import { handleTextClipping } from '../../../utils/UtilsTranslate'

const CreateCampaigns = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    control, handleSubmit, watch, reset,
  } = useForm()
  const { isLoading } = useSelector((state) => state.loading)
  const [templateMessage, setTemplateMessage] = useState('')
  const [userFile, setUserFile] = useState('')
  const { campaign } = useSelector((state) => state.campaign)
  const { templates, whatsAppAccounts } = useSelector(
    (state) => state.recoveryMessage,
  )
  const [showCreateConfirmationAlert, setShowCreateConfirmationAlert] = useState(false)

  const accountName = watch('accountName') || ''

  useEffect(() => {
    dispatch(getWhatsAppAccounts())
  }, [])

  useEffect(() => {
    if (accountName) {
      dispatch(getTemplates(accountName))
    }

    dispatch(resetTemplates())
    reset((formValues) => ({
      ...formValues,
      infoTemplate: '',
    }))
  }, [accountName])

  const onSubmit = (dataForm) => {
    const data = new FormData()
    const [template, language] = dataForm.infoTemplate.split(' ')

    data.append('send_date', format(dataForm.send_date, 'yyyy-MM-dd HH:mm'))
    data.append('account_name', dataForm.accountName)
    data.append('template', template)
    data.append('template_lang', language)

    if (userFile !== '') {
      data.append('users_file', userFile)
    }

    dispatch(createCampaign(data))
  }

  const handleCloseAlert = () => {
    dispatch(resetCampaign())
    setShowCreateConfirmationAlert(false)
    navigate('/campaigns')
  }

  useEffect(() => {
    if (campaign && Object.entries(campaign)?.length !== 0) {
      setShowCreateConfirmationAlert(true)
    }
  }, [campaign])

  return (
    <Box sx={{ width: '100%' }}>
      {showCreateConfirmationAlert && (
        <Alert
          alertContentText={`Se creo la campaña con la cuenta ${campaign?.account_name.replace(
            /_/g,
            ' ',
          )}`}
          alertTextButton='Cerrar'
          alertTitle='¡Registro exitoso!'
          isOpen={showCreateConfirmationAlert}
          setIsOpen={handleCloseAlert}
        />
      )}
      <BackButton />
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle
          data-testid='title-create-campaigns'
          text='Crear campañas'
        />
      </Box>
      <Grid container direction='row' marginTop='2rem' spacing='2rem'>
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle
            fontSize='.75rem'
            lineHeight='1rem'
            text='Cuentas de WhatsApp'
          />
          <Controller
            control={control}
            defaultValue=''
            name='accountName'
            rules={{
              required: 'El nombre de la cuenta es requerido',
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <SelectInput
                  error={!!errorInput}
                  height='3rem'
                  id='accountName'
                  onChange={onChange}
                  value={value}
                >
                  <MenuItem value=''>Seleccionar</MenuItem>
                  {whatsAppAccounts
                    && Object.entries(whatsAppAccounts).map(([key, item]) => (
                      <MenuItem key={key} value={`${key}`}>
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
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle
            fontSize='.75rem'
            lineHeight='1rem'
            text='Fecha de envío*'
          />
          <Controller
            control={control}
            defaultValue=''
            name='send_date'
            rules={{
              required: 'La fecha de envío es requerida',
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <LocalizationProvider
                  adapterLocale={es}
                  dateAdapter={AdapterDateFns}
                  localeText={{ cancelButtonLabel: 'Cancelar' }}
                  utils={DateFnsUtils}
                >
                  <MainDateTimePicker
                    error={!!errorInput}
                    minDate={new Date()}
                    onChange={onChange}
                    renderInput={(params) => (
                      <TextField id='sendDate' {...params} />
                    )}
                    sx={{
                      borderRadius: '.5',
                      borderColor: errorInput && 'red',
                      height: '3rem',
                      width: '18rem',
                    }}
                    toolbarTitle='Selecciona una fecha'
                    value={value}
                  />
                </LocalizationProvider>
                <Typography
                  color='error.main'
                  data-testid='error-message-send-date-campaigns'
                  mt={1}
                  variant='caption'
                >
                  {errorInput?.message}
                </Typography>
              </Grid>
            )}
          />
        </Grid>
        <Grid item lg={4} md={6} mt={3} xs={12}>
          <Grid container flexDirection='column'>
            <UploadUsersCampaignButton setUserFile={setUserFile} />
            {userFile !== '' ? (
              <Typography marginY='1rem' variant='caption'>
                *Tienes 1 archivo cargado*
              </Typography>
            ) : (
              <Typography marginY='1rem' variant='caption'>
                No es obligatorio agregar los usuarios
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Template*' />
          <Controller
            control={control}
            defaultValue=''
            name='infoTemplate'
            rules={{
              required: 'El template es requerido',
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid
                container
                flexDirection='column'
                marginTop='.5rem'
                width='18rem'
              >
                <SelectInput
                  disabled={accountName === '' || templates.length === 0}
                  error={!!errorInput}
                  height='3rem'
                  id='infoTemplate'
                  onChange={onChange}
                  value={value}
                >
                  <MenuItem value=''>
                    {templates.length !== 0
                      ? 'Seleccionar'
                      : 'No cuenta con templates registrados'}
                  </MenuItem>
                  {Object.entries(templates).map(([key, template]) => (
                    <MenuItem
                      key={key}
                      onClick={() => setTemplateMessage(template.text)}
                      value={`${key} ${template.language}`}
                    >
                      {handleTextClipping(template.text, 40)}
                    </MenuItem>
                  ))}
                </SelectInput>
                <Typography
                  color='error.main'
                  data-testid='error-message-template-campaigns'
                  mt={1}
                  variant='caption'
                >
                  {errorInput?.message}
                </Typography>
                {accountName === '' && (
                  <Typography marginY='1rem' variant='caption'>
                    Selecciona una cuenta de WhatsApp para ver los templates
                    disponibles
                  </Typography>
                )}
              </Grid>
            )}
          />
        </Grid>
      </Grid>
      {templateMessage && (
        <Grid container flexDirection='column' marginTop='2rem'>
          <Grid item xs={6}>
            <Typography fontSize='1rem' lineHeight='1.5rem'>
              Mensaje
            </Typography>
            <Typography fontSize='.9rem'>{templateMessage}</Typography>
          </Grid>
        </Grid>
      )}
      <Box display='flex' my={4} sx={{ justifyContent: 'flex-end' }}>
        <MainButton
          data-testid='create-product-button'
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

export default CreateCampaigns
