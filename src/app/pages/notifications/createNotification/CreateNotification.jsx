import {
  Box, Grid, MenuItem, Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BackButton, MainButton } from '../../../components/buttons'
import { GeneralTitle } from '../../../components/texts'
import { MainInput, SelectInput } from '../../../components/inputs'
import { getEmailPattern } from '../../../utils/utilsValidations'
import NotificationFields from '../components/NotificationFields/NotificationFields'
import { Alert } from '../../../components/modals'
import {
  getNoticeAccountsConfig,
  getNoticeAccounts,
} from '../../../slices/noticeAccounts/noticeAccountsSlice'
import {
  createNotification,
  getEventModels,
  getNotificationTemplates,
  resetNotification,
  resetTemplates,
} from '../../../slices/notifications/notificationsSlice'
import { getPartners } from '../../../slices/partner/partnerSlice'
import { handleTextClipping } from '../../../utils/UtilsTranslate'
import useRowsPerPage from '../../../hooks/useRowsPerPage'
import { Pagination } from '../../../components/tables'

const CreateNotification = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { config, noticeAccounts } = useSelector((state) => state.noticeAccount)
  const { notification, eventModels, templates } = useSelector(
    (state) => state.notification,
  )
  const { partners } = useSelector((state) => state.partner)
  const { isLoading } = useSelector((state) => state.loading)
  const [templateMessage, setTemplateMessage] = useState('')
  const {
    control, handleSubmit, watch, reset,
  } = useForm()

  const notificationName = watch('name') || ''
  const actionType = watch('actionType') || ''
  const accountId = watch('accountId') || ''
  const providerName = watch('provider') || ''
  const templateName = watch('template') || ''
  const providers = config[actionType]?.providers || {}
  const meta = config[actionType]?.providers[providerName]?.meta_notification || {}
  const selectRowsPerPage = 100
  const { page, onPageChange } = useRowsPerPage(
    getPartners,
    dispatch,
    selectRowsPerPage,
  )

  useEffect(() => {
    dispatch(getNoticeAccountsConfig())
    dispatch(getEventModels())
    dispatch(getPartners('?limit=100'))
  }, [])

  const handleKeysFields = (types, form) => {
    const keys = {}

    Object.keys(types).forEach((key) => {
      if ({}.hasOwnProperty.call(form, key)) {
        keys[key] = form[key]
      }
    })

    return keys
  }

  const onSubmit = (dataForm) => {
    const [template, language] = dataForm.template.split(' ')
    const data = {
      name: dataForm.name,
      template,
      template_lang: language,
      event_model: dataForm.eventModel,
      partner_id: dataForm.partnerId,
      notice_account_id: dataForm.accountId,
      meta: handleKeysFields(meta, dataForm),
    }

    dispatch(createNotification(data))
    dispatch(resetNotification())
    reset()
  }

  const handleCloseDialogAccountName = () => {
    dispatch(resetNotification())
    navigate('/notifications')
  }

  useEffect(() => {
    if (providerName) {
      dispatch(getNoticeAccounts(`?provider=${providerName}`))
    }
  }, [providerName])

  useEffect(() => {
    if (accountId) {
      dispatch(getNotificationTemplates(accountId))
      dispatch(resetTemplates)

      setTemplateMessage('')
    }
    if (!accountId) {
      reset((formValues) => ({
        ...formValues,
        accountId: '',
      }))
    }
  }, [accountId])

  return (
    <Box sx={{ width: '100%' }}>
      <BackButton />
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle
          data-testid='title-create-notification'
          text='Crear notificación'
        />
      </Box>

      <Grid container marginTop='2rem' spacing='2rem'>
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Nombre*' />
          <Controller
            control={control}
            defaultValue=''
            name='name'
            rules={{
              required: 'El nombre de la notificación es requerida',
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <MainInput
                  error={!!errorInput}
                  hiddenIcon
                  id='notificationName'
                  onChange={onChange}
                  placeholder=''
                  radius='.5rem'
                  type='text'
                  value={value}
                />
                <Typography
                  color='error.main'
                  data-testid='error-message-notificationName'
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
            text='Selecciona un partner'
          />
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
              <Grid container flexDirection='column' marginTop='.5rem'>
                <SelectInput
                  error={!!errorInput}
                  id='partnerId'
                  onChange={onChange}
                  value={value}
                >
                  <MenuItem value=''>Seleccionar</MenuItem>
                  {partners?.data?.map((partner) => (
                    <MenuItem key={partner?.id} value={partner?.id}>
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
                  data-testid='error-message-partnerId'
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
            text='Selecciona una Acción'
          />
          <Controller
            control={control}
            defaultValue=''
            name='actionType'
            rules={{
              required: 'El tipo de acción es requerida',
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <SelectInput
                  error={!!errorInput}
                  id='actionType'
                  onChange={onChange}
                  value={value}
                >
                  <MenuItem value=''>Seleccionar</MenuItem>
                  {Object.entries(config).map(([key]) => (
                    <MenuItem key={key} value={key}>
                      {key}
                    </MenuItem>
                  ))}
                </SelectInput>
                <Typography
                  color='error.main'
                  data-testid='error-message-actionType'
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
            text='Selecciona un modelo'
          />
          <Controller
            control={control}
            defaultValue=''
            name='eventModel'
            rules={{
              required: 'El modelo es requerido',
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <SelectInput
                  error={!!errorInput}
                  id='model'
                  onChange={onChange}
                  value={value}
                >
                  <MenuItem value=''>Seleccionar</MenuItem>
                  {Object.entries(eventModels).map(([key, info]) => (
                    <MenuItem key={key} value={key}>
                      {info}
                    </MenuItem>
                  ))}
                </SelectInput>
                <Typography
                  color='error.main'
                  data-testid='error-message-eventModel'
                  mt={1}
                  variant='caption'
                >
                  {errorInput?.message}
                </Typography>
              </Grid>
            )}
          />
        </Grid>
        {actionType && (
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Selecciona un proveedor'
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
                <Grid container flexDirection='column' marginTop='.5rem'>
                  <SelectInput
                    error={!!errorInput}
                    id='provider'
                    onChange={onChange}
                    value={value}
                  >
                    <MenuItem value=''>Seleccionar</MenuItem>
                    {Object.entries(providers).map(([key]) => (
                      <MenuItem key={key} value={key}>
                        {key}
                      </MenuItem>
                    ))}
                  </SelectInput>
                  <Typography
                    color='error.main'
                    data-testid='error-message-provider'
                    mt={1}
                    variant='caption'
                  >
                    {errorInput?.message}
                  </Typography>
                </Grid>
              )}
            />
          </Grid>
        )}
        {providerName && (
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Selecciona una cuenta'
            />
            <Controller
              control={control}
              defaultValue=''
              name='accountId'
              rules={{
                required: 'El nombre de la cuenta es requerida',
              }}
              render={({
                field: { onChange, value },
                fieldState: { error: errorInput },
              }) => (
                <Grid container flexDirection='column' marginTop='.5rem'>
                  <SelectInput
                    error={!!errorInput}
                    id='accountId'
                    onChange={onChange}
                    value={value}
                  >
                    <MenuItem value=''>Seleccionar</MenuItem>
                    {noticeAccounts?.data?.map((noticeAccountInfo) => (
                      <MenuItem
                        key={noticeAccountInfo.id}
                        value={noticeAccountInfo.id}
                      >
                        {noticeAccountInfo.name}
                      </MenuItem>
                    ))}
                  </SelectInput>
                  <Typography
                    color='error.main'
                    data-testid='error-message-accountId'
                    mt={1}
                    variant='caption'
                  >
                    {errorInput?.message}
                  </Typography>
                </Grid>
              )}
            />
          </Grid>
        )}
        {accountId && (
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Selecciona una plantilla'
            />
            <Controller
              control={control}
              defaultValue=''
              name='template'
              rules={{
                required: 'El nombre de la plantilla es requerido',
              }}
              render={({
                field: { onChange, value },
                fieldState: { error: errorInput },
              }) => (
                <Grid container flexDirection='column' marginTop='.5rem'>
                  <SelectInput
                    error={!!errorInput}
                    id='template'
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
                    data-testid='error-message-template'
                    mt={1}
                    variant='caption'
                  >
                    {errorInput?.message}
                  </Typography>
                </Grid>
              )}
            />
          </Grid>
        )}
        {templateName
          && meta !== undefined
          && Object?.entries(meta).map(([key, input]) => (
            <Grid item key={key} lg={4} md={6} xs={12}>
              <GeneralTitle
                fontSize='.75rem'
                lineHeight='1rem'
                text={input?.description}
              />
              <Controller
                control={control}
                defaultValue={input?.type === 'boolean' ? false : ''}
                name={key}
                rules={{
                  ...(input.required && {
                    required: `El nombre del ${key} es requerido`,
                  }),
                  ...(input.type === 'email' && {
                    pattern: getEmailPattern(),
                  }),
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error: errorInput },
                }) => (
                  <Grid container flexDirection='column' marginTop='.5rem'>
                    <NotificationFields
                      input={input}
                      id={key}
                      onChange={onChange}
                      value={value}
                    />
                    <Typography
                      color='error.main'
                      data-testid={`error-message-${key}`}
                      variant='caption'
                    >
                      {errorInput?.message}
                    </Typography>
                  </Grid>
                )}
              />
            </Grid>
          ))}
      </Grid>
      {templateMessage ?? (
        <Grid container flexDirection='column' marginTop='.5rem'>
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Mensaje' />
          <Grid item>{templateMessage}</Grid>
        </Grid>
      )}
      <Box display='flex' my={4} sx={{ justifyContent: 'flex-end' }}>
        <MainButton
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          radius='1.55rem'
          type='primary'
        >
          Enviar
        </MainButton>
      </Box>
      {notification?.isSuccess && (
        <Alert
          alertContentText={`Se creo la cuenta ${notificationName} correctamente`}
          alertTextButton='Cerrar'
          alertTitle='¡Registro exitoso!'
          isOpen={notification?.isSuccess}
          setIsOpen={handleCloseDialogAccountName}
        />
      )}
    </Box>
  )
}

export default CreateNotification
