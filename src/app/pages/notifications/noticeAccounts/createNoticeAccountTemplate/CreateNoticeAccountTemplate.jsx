import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import {
  Box, Grid, MenuItem, Typography,
} from '@mui/material'
import { BackButton, MainButton } from '../../../../components/buttons'
import { GeneralTitle } from '../../../../components/texts'
import { MainInput, SelectInput, TextArea } from '../../../../components/inputs'
import { getNoticeAccounts } from '../../../../slices/noticeAccounts/noticeAccountsSlice'
import { languagesConstants } from '../../../../slices/constants/languagesConstants'
import {
  createNoticeAccountTemplate,
  resetNoticeAccountTemplate,
} from '../../../../slices/noticeAccountTemplate/noticeAccountTemplateSlice'
import { Alert } from '../../../../components/modals'

const CreateNoticeAccountTemplate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const { isLoading } = useSelector((state) => state.loading)
  const { noticeAccounts } = useSelector((state) => state.noticeAccount)
  const { noticeAccountTemplate } = useSelector(
    (state) => state.noticeAccountTemplate,
  )

  const onSubmit = (dataForm) => {
    const data = {
      content: dataForm.content,
      name: dataForm.name,
      notice_account_id: dataForm.noticeAccount,
      lang: dataForm.lang,
    }

    dispatch(createNoticeAccountTemplate(data))
  }

  const handleCloseDialogCreateUser = () => {
    dispatch(resetNoticeAccountTemplate())
    navigate('/notice-account/templates')
  }

  useEffect(() => {
    dispatch(getNoticeAccounts('?limit=100'))
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <BackButton />
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle
          data-testid='title-create-template'
          text='Crear plantilla'
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
              required: 'El nombre es requerido',
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <MainInput
                  error={!!errorInput}
                  hiddenIcon
                  id='name'
                  onChange={onChange}
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
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Cuenta*' />
          <Controller
            control={control}
            defaultValue=''
            name='noticeAccount'
            rules={{
              required: 'La cuenta es requerida',
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
                  id='noticeAccount'
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
                  data-testid='error-message-noticeAccount'
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
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Idioma*' />
          <Controller
            control={control}
            defaultValue=''
            name='lang'
            rules={{
              required: 'El idioma es requerido',
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
                  id='lang'
                  onChange={onChange}
                  value={value}
                >
                  <MenuItem value=''>Seleccionar</MenuItem>
                  {languagesConstants?.map((lang) => (
                    <MenuItem key={lang?.id} value={`${lang?.id}`}>
                      {lang?.name}
                    </MenuItem>
                  ))}
                </SelectInput>
                <Typography
                  color='error.main'
                  data-testid='error-message-lang'
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
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Contenido*' />
          <Controller
            control={control}
            defaultValue=''
            name='content'
            rules={{
              required: 'El contenido es requerido',
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <TextArea
                  error={!!errorInput}
                  id='content'
                  multiline
                  onChange={onChange}
                  radius='.5rem'
                  rows={8}
                  value={value}
                />
                <Typography
                  color='error.main'
                  data-testid='error-message-content'
                  variant='caption'
                >
                  {errorInput?.message}
                </Typography>
              </Grid>
            )}
          />
        </Grid>
      </Grid>
      <Box display='flex' my={4} sx={{ justifyContent: 'flex-end' }}>
        <MainButton
          data-testid='create-template-button'
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          radius='1.55rem'
          type='primary'
        >
          Enviar
        </MainButton>
      </Box>
      {noticeAccountTemplate?.createTemplate?.isSuccess && (
        <Alert
          alertContentText={`Se creo la plantilla ${noticeAccountTemplate?.name} correctamente`}
          alertTextButton='Cerrar'
          alertTitle='¡Registro exitoso!'
          isOpen={noticeAccountTemplate?.createTemplate?.isSuccess}
          setIsOpen={handleCloseDialogCreateUser}
        />
      )}
    </Box>
  )
}

export default CreateNoticeAccountTemplate
