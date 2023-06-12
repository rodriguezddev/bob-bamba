import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, MenuItem, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Controller } from 'react-hook-form'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { es } from 'date-fns/locale'
import DateFnsUtils from '@date-io/date-fns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { GeneralTitle } from '../../../../components/texts'
import { MainDateTimePicker, SelectInput } from '../../../../components/inputs'
import {
  getTemplates,
  resetTemplates,
} from '../../../../slices/recoveryMessage/recoveryMessageSlice'
import { handleTextClipping } from '../../../../utils/UtilsTranslate'
import { noticeProviders } from '../../../../constants/noticeProvider'
import { getNoticeAccounts } from '../../../../slices/noticeAccounts/noticeAccountsSlice'

const CampaignsForm = ({ campaignsForm }) => {
  const dispatch = useDispatch()
  const { templates } = useSelector((state) => state.recoveryMessage)
  const { noticeAccounts } = useSelector((state) => state.noticeAccount)
  const { control, watch, reset } = campaignsForm
  const [templateMessage, setTemplateMessage] = useState('')

  const accountId = watch('accountId') || ''
  const provider = watch('provider') || ''

  useEffect(() => {
    if (provider) {
      dispatch(getNoticeAccounts(`?provider=${provider}`))
    }
  }, [provider])

  useEffect(() => {
    if (accountId) {
      dispatch(getTemplates(accountId))
    }

    dispatch(resetTemplates())
    reset((formValues) => ({
      ...formValues,
      infoTemplate: '',
    }))
  }, [accountId])

  return (
    <Box>
      <form>
        <Grid container direction='row' marginTop='2rem' spacing='2rem'>
          <Grid item lg={4} mb={2} md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Proveedor'
            />
            <Controller
              control={control}
              defaultValue=''
              name='provider'
              rules={{
                required: 'El proveedor es requerido',
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
                    id='provider'
                    onChange={onChange}
                    value={value}
                  >
                    <MenuItem value=''>Seleccionar</MenuItem>
                    {noticeProviders.map((noticeProvider) => (
                      <MenuItem
                        key={noticeProvider.name}
                        value={noticeProvider.name}
                      >
                        {noticeProvider.name}
                      </MenuItem>
                    ))}
                  </SelectInput>
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
            <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Cuentas*' />
            <Controller
              control={control}
              defaultValue=''
              name='accountId'
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
                    disabled={provider === ''}
                    error={!!errorInput}
                    id='accountId'
                    onChange={onChange}
                    value={value}
                  >
                    <MenuItem value=''>Seleccionar</MenuItem>
                    {noticeAccounts?.data?.map((noticeAccount) => (
                      <MenuItem
                        key={noticeAccount?.id}
                        value={`${noticeAccount?.id}`}
                      >
                        {noticeAccount?.name}
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
                  width='16rem'
                >
                  <SelectInput
                    disabled={accountId === '' || templates.length === 0}
                    error={!!errorInput}
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
                  {accountId === '' && (
                    <Typography my='1rem' variant='caption'>
                      Selecciona una cuenta de WhatsApp para ver los templates
                      disponibles
                    </Typography>
                  )}
                </Grid>
              )}
            />
          </Grid>
          <Grid item lg={4} md={6} xs={12} width='16rem'>
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
                      sx={{
                        borderRadius: '.5',
                        borderColor: errorInput && 'red',
                        width: '16rem',
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
    </Box>
  )
}

CampaignsForm.propTypes = {
  campaignsForm: PropTypes.shape().isRequired,
}

export default CampaignsForm
