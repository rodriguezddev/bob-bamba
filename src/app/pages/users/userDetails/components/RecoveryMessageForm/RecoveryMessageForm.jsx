import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Typography,
} from '@mui/material'
import { MainButton } from '../../../../../components/buttons'
import { GeneralTitle } from '../../../../../components/texts'
import { SelectInput } from '../../../../../components/inputs'
import theme from '../../../../../theme'
import {
  getTemplates,
  resetTemplates,
  sendRecoveryMessage,
} from '../../../../../slices/recoveryMessage/recoveryMessageSlice'
import { handleTextClipping } from '../../../../../utils/UtilsTranslate'
import { noticeProviders } from '../../../../../constants/noticeProvider'
import { getNoticeAccounts } from '../../../../../slices/noticeAccounts/noticeAccountsSlice'

const RecoveryMessageForm = ({ handleShowForm, open, user }) => {
  const {
    control, handleSubmit, watch, reset,
  } = useForm()
  const { isLoading } = useSelector((state) => state.loading)
  const { templates } = useSelector((state) => state.recoveryMessage)
  const { noticeAccounts } = useSelector((state) => state.noticeAccount)
  const [templateMessage, setTemplateMessage] = useState('')
  const dispatch = useDispatch()
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

    reset((formValues) => ({
      ...formValues,
      infoTemplate: '',
    }))
  }, [accountType])

  const onSubmit = (dataForm) => {
    const [template, language] = dataForm.infoTemplate.split(' ')
    const values = {
      user: user.id,
      notice_account_id: dataForm.account,
      template,
      template_language: language,
    }

    dispatch(sendRecoveryMessage(values))
  }

  return (
    <Dialog
      fullWidth
      onClose={handleShowForm}
      open={open}
      sx={{ zIndex: 1200 }}
    >
      <DialogTitle align='center' data-testid='recoveryMessageForm-title'>
        Mensaje de recuperación para&nbsp;
        {user?.cellphone}
      </DialogTitle>
      <DialogContent>
        <Grid
          alignItems='center'
          container
          direction='column'
          justifyContent='center'
        >
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
                    height='3rem'
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
          <Grid item lg={4} mb={2} md={6} xs={12}>
            <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Cuenta' />
            <Controller
              control={control}
              defaultValue=''
              name='account'
              rules={{
                required: 'La cuenta es requerida',
              }}
              render={({
                field: { onChange, value },
                fieldState: { error: errorInput },
              }) => (
                <Grid container flexDirection='column' marginTop='.5rem'>
                  <SelectInput
                    disabled={provider === ''}
                    error={!!errorInput}
                    height='3rem'
                    id='account'
                    onChange={onChange}
                    value={value}
                  >
                    <MenuItem value=''>Seleccionar</MenuItem>
                    {noticeAccounts?.data?.map((noticeAccount) => (
                      <MenuItem
                        key={noticeAccount?.id}
                        value={`${noticeAccount?.id}`}
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
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Plantilla'
            />
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
                <Grid container flexDirection='column' marginTop='.5rem'>
                  <SelectInput
                    disabled={accountType === '' || templates.length === 0}
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
          <Grid
            alignItems='center'
            container
            direction='row'
            justifyContent='center'
            mt={3}
            spacing={2}
          >
            <Grid item>
              <MainButton
                background={theme.palette.background.blueLight}
                data-testid='cancel-recovery-message-button'
                onClick={handleShowForm}
                type='secondary'
              >
                Cancel
              </MainButton>
            </Grid>
            <Grid item>
              <MainButton disabled={isLoading} onClick={handleSubmit(onSubmit)}>
                Enviar
              </MainButton>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

RecoveryMessageForm.propTypes = {
  handleShowForm: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    cellphone: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
}

export default RecoveryMessageForm
