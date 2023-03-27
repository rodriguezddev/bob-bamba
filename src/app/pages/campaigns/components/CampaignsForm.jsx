import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Grid, MenuItem, TextField, Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { Controller } from 'react-hook-form'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { es } from 'date-fns/locale'
import DateFnsUtils from '@date-io/date-fns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { GeneralTitle } from '../../../components/texts'
import { MainDateTimePicker, SelectInput } from '../../../components/inputs'
import { Alert } from '../../../components/modals'
import { resetCampaign } from '../../../slices/campaigns/campaignsSlice'
import {
  getWhatsAppAccounts,
  getTemplates,
  resetTemplates,
} from '../../../slices/recoveryMessage/recoveryMessageSlice'
import { handleTextClipping } from '../../../utils/UtilsTranslate'

const CampaignsForm = ({ campaignsForm, setIsShowUpdateAlert }) => {
  const dispatch = useDispatch()
  const { campaign } = useSelector((state) => state.campaign)
  const { templates, whatsAppAccounts } = useSelector(
    (state) => state.recoveryMessage,
  )
  const { control, watch, reset } = campaignsForm
  const [templateMessage, setTemplateMessage] = useState('')
  const [isShowSuccessAlert, setIsShowSuccessAlert] = useState(false)

  useEffect(() => {
    dispatch(getWhatsAppAccounts())
  }, [])

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

  const handleCloseAlert = () => {
    dispatch(resetCampaign())
    setIsShowUpdateAlert(false)
    setIsShowSuccessAlert(false)
  }

  useEffect(() => {
    if (campaign && Object.entries(campaign)?.length !== 0) {
      setIsShowSuccessAlert(true)
    }
  }, [campaign])

  return (
    <Box>
      <form>
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
                    {Object.entries(whatsAppAccounts).map(([key, account]) => (
                      <MenuItem key={key} value={key}>
                        {account}
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
              text='Template*'
            />
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
        </Grid>
      </form>
      {templateMessage && (
        <Grid container flexDirection='column' marginTop='2rem'>
          <Grid item>
            <Typography fontSize='1rem' lineHeight='1.5rem'>
              Mensaje
            </Typography>
            <Typography fontSize='.9rem'>{templateMessage}</Typography>
          </Grid>
        </Grid>
      )}
      {isShowSuccessAlert && (
        <Alert
          alertContentText='Se actualizo la campaña'
          alertTextButton='Cerrar'
          alertTitle='¡Actualización exitosa!'
          isOpen={isShowSuccessAlert}
          setIsOpen={handleCloseAlert}
        />
      )}
    </Box>
  )
}

CampaignsForm.propTypes = {
  campaignsForm: PropTypes.shape().isRequired,
  setIsShowUpdateAlert: PropTypes.func.isRequired,
}

export default CampaignsForm
