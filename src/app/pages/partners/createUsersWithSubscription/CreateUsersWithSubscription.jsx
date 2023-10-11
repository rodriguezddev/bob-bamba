import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import {
  Box, Grid, MenuItem, Typography,
} from '@mui/material'
import { BackButton, MainButton } from '../../../components/buttons'
import { GeneralTitle } from '../../../components/texts'
import { getTemplates } from '../../../slices/recoveryMessage/recoveryMessageSlice'
import { SelectInput } from '../../../components/inputs'
import { resetTemplates } from '../../../slices/campaigns/campaignSlice'
import { handleTextClipping } from '../../../utils/UtilsTranslate'
import ContainerUsersCreationFile from '../components/ContainerUsersCreationFile/ContainerUsersCreationFile'
import { createSubscriptionBatch } from '../../../slices/partner/partnerSlice'
import { getNoticeAccounts } from '../../../slices/noticeAccounts/noticeAccountsSlice'
import { noticeProviders } from '../../../constants/noticeProvider'

const CreateUsersWithSubscription = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const {
    control, handleSubmit, watch, reset,
  } = useForm()
  const { templates } = useSelector((state) => state.recoveryMessage)
  const { noticeAccounts } = useSelector((state) => state.noticeAccount)
  const { isLoading } = useSelector((state) => state.loading)
  const [templateMessage, setTemplateMessage] = useState('')
  const [fileForm, setFileForm] = useState(null)
  const accountType = watch('account') || ''
  const provider = watch('provider') || ''

  useEffect(() => {
    if (provider) {
      dispatch(getNoticeAccounts(`?provider=${provider}&limit=100`))
    }
  }, [provider])

  useEffect(() => {
    if (accountType) {
      dispatch(getTemplates(accountType))
    }

    dispatch(resetTemplates)

    setTemplateMessage('')

    fileForm?.delete('notification_account_name')
    fileForm?.delete('template_notification')
    fileForm?.delete('template_lang_notification')

    reset((formValues) => ({
      ...formValues,
      infoTemplate: '',
    }))
  }, [accountType])

  const onSubmit = (dataForm) => {
    const [template, language] = dataForm.infoTemplate.split(' ')

    if (template && language) {
      fileForm.append('notification_account_name', dataForm.account)
      fileForm.append('template_notification', template)
      fileForm.append('template_lang_notification', language)
    }

    dispatch(createSubscriptionBatch({ data: fileForm }))
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <BackButton />
        <Box my={3}>
          <GeneralTitle
            data-testid='title-createUsers'
            text='Crear usuarios con suscripción'
          />
        </Box>
        <Grid container spacing='2rem'>
          <Grid item xs={12}>
            <ContainerUsersCreationFile fileForm={setFileForm} partnerId={id} />
          </Grid>
          <Grid item xs={12}>
            <GeneralTitle
              data-testid='subtitle-title-createUsers'
              fontSize='1.13rem'
              text='Mensaje de notificación (opcional)'
            />
          </Grid>
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
                <Grid container flexDirection='column' marginTop='.5rem'>
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
          <Grid item mb={2} md={6} xs={12}>
            <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Cuenta' />
            <Controller
              control={control}
              defaultValue=''
              name='account'
              render={({
                field: { onChange, value },
                fieldState: { error: errorInput },
              }) => (
                <Grid container flexDirection='column' marginTop='.5rem'>
                  <SelectInput
                    error={!!errorInput}
                    id='account'
                    onChange={onChange}
                    value={value}
                  >
                    <MenuItem value=''>Seleccionar</MenuItem>
                    {noticeAccounts?.data?.map((noticeAccount) => (
                      <MenuItem
                        key={noticeAccount.id}
                        value={`${noticeAccount.id}`}
                      >
                        {noticeAccount.name}
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
          <Grid item md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Plantilla'
            />
            <Controller
              control={control}
              defaultValue=''
              name='infoTemplate'
              rules={
                accountType && {
                  required: 'La plantilla es requerida',
                }
              }
              render={({
                field: { onChange, value },
                fieldState: { error: errorInput },
              }) => (
                <Grid container flexDirection='column' marginTop='.5rem'>
                  <SelectInput
                    disabled={accountType === '' || templates.length === 0}
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
          {templateMessage ?? (
            <Grid container flexDirection='column' marginTop='.5rem'>
              <GeneralTitle
                fontSize='.75rem'
                lineHeight='1rem'
                text='Mensaje'
              />
              <Grid item>{templateMessage}</Grid>
            </Grid>
          )}
        </Grid>
      </Box>
      <Box display='flex' my={4} sx={{ justifyContent: 'flex-end' }}>
        <MainButton
          data-testid='create-product-button'
          disabled={isLoading || !fileForm}
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

export default CreateUsersWithSubscription
