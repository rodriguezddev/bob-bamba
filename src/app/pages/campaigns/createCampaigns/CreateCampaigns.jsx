import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import {
  Box, Grid, MenuItem, Typography,
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
} from '../../../slices/campaigns/campaignSlice'
import {
  getTemplates,
  resetTemplates,
} from '../../../slices/recoveryMessage/recoveryMessageSlice'
import UploadUsersCampaignButton from '../components/uploadUsersCampaignButton'
import { Alert } from '../../../components/modals'
import { handleTextClipping } from '../../../utils/UtilsTranslate'
import { getPartners } from '../../../slices/partner/partnerSlice'
import { getNoticeAccounts } from '../../../slices/noticeAccounts/noticeAccountsSlice'
import { noticeProviders } from '../../../constants/noticeProvider'
import CampaignUploadMessage from '../components/campaignUploadMessage'
import useRowsPerPage from '../../../hooks/useRowsPerPage'
import { Pagination } from '../../../components/tables'

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
  const { partners } = useSelector((state) => state.partner)
  const { templates } = useSelector((state) => state.recoveryMessage)
  const { noticeAccounts } = useSelector((state) => state.noticeAccount)
  const [showCreateSuccessAlert, setShowCreateSuccessAlert] = useState(false)
  const selectRowsPerPage = 100
  const { page, onPageChange } = useRowsPerPage(
    getPartners,
    dispatch,
    selectRowsPerPage,
  )
  const accountId = watch('accountId') || ''
  const provider = watch('provider') || ''

  useEffect(() => {
    dispatch(getPartners('?limit=100'))
  }, [])

  useEffect(() => {
    if (provider) {
      dispatch(getNoticeAccounts(`?provider=${provider}&limit=100`))
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

  const onSubmit = (dataForm) => {
    const data = new FormData()
    const [template, language] = dataForm.infoTemplate.split(' ')

    data.append('send_date', format(dataForm.send_date, 'yyyy-MM-dd HH:mm'))
    data.append('notice_account_id', dataForm.accountId)
    data.append('template', template)
    data.append('template_lang', language)
    data.append('partner_id', dataForm.partnerId)
    if (userFile !== '') {
      data.append('users_file', userFile)
    }

    dispatch(createCampaign(data))
  }

  const handleCloseAlert = () => {
    dispatch(resetCampaign())
    setShowCreateSuccessAlert(false)
    if (
      campaign?.users?.errors?.length === 0
      || Array.isArray(campaign.users)
    ) {
      navigate('/campaigns')
    }
  }

  useEffect(() => {
    if (Object.entries(campaign)?.length !== 0 && campaign.isSuccess) {
      setShowCreateSuccessAlert(true)
    }
  }, [campaign])

  return (
    <Box sx={{ width: '100%' }}>
      {showCreateSuccessAlert && (
        <Alert
          alertContentText={
            Array.isArray(campaign.users) ? (
              'Se creo la campaña'
            ) : (
              <CampaignUploadMessage campaign={campaign} />
            )
          }
          alertTextButton='Cerrar'
          alertTitle='¡Registro!'
          isOpen={showCreateSuccessAlert}
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
        <Grid item lg={4} mb={2} md={6} xs={12}>
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Proveedor' />
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
              <Grid
                container
                flexDirection='column'
                marginTop='.5rem'
                width='16rem'
              >
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
                      borderRadius: '.5rem',
                      borderColor: errorInput && 'red',
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
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Partner*' />
          <Controller
            control={control}
            defaultValue=''
            name='partnerId'
            rules={{
              required: 'El nombre del partner es requerido',
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
                  id='partnerId'
                  onChange={onChange}
                  value={value}
                >
                  <MenuItem value=''>Seleccionar</MenuItem>
                  {partners?.data?.map((partner) => (
                    <MenuItem key={partner?.id} value={`${partner?.id}`}>
                      {partner?.name}
                    </MenuItem>
                  ))}
                  <Grid container display='flex' alignItems='center'>
                    <Pagination
                      count={partners?.meta?.total ?? 0}
                      labelDisplayedRows={() => ''}
                      onPageChange={onPageChange}
                      page={page}
                      rowsPerPage={selectRowsPerPage}
                      rowsPerPageOptions={[0]}
                      SelectProps={{
                        native: true,
                      }}
                    />
                  </Grid>
                </SelectInput>
                <Typography
                  color='error.main'
                  data-testid='error-message-partnerId-campaigns'
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
              <Typography my='1rem' variant='caption'>
                *Tienes 1 archivo cargado*
              </Typography>
            ) : (
              <Typography my='1rem' variant='caption'>
                No es obligatorio agregar los usuarios
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Plantilla*' />
          <Controller
            control={control}
            defaultValue=''
            name='infoTemplate'
            rules={{
              required: 'La plantilla es requerida',
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
          onClick={handleSubmit(onSubmit)}
          radius='1.55rem'
          type='primary'
        >
          Enviar
        </MainButton>
      </Box>
    </Box>
  )
}

export default CreateCampaigns
