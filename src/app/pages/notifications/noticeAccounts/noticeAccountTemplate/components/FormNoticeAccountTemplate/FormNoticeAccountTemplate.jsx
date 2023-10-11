import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, MenuItem, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import { getNoticeAccounts } from '../../../../../../slices/noticeAccounts/noticeAccountsSlice'
import { GeneralTitle } from '../../../../../../components/texts'
import {
  MainInput,
  SelectInput,
  TextArea,
} from '../../../../../../components/inputs'
import { languagesConstants } from '../../../../../../slices/constants/languagesConstants'

const FormNoticeAccountTemplate = ({ templateForm }) => {
  const dispatch = useDispatch()
  const { noticeAccounts } = useSelector((state) => state.noticeAccount)
  const { control } = templateForm

  useEffect(() => {
    dispatch(getNoticeAccounts('?limit=100'))
  }, [])

  return (
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
  )
}

FormNoticeAccountTemplate.propTypes = {
  templateForm: PropTypes.shape({
    control: PropTypes.shape({}).isRequired,
  }).isRequired,
}

export default FormNoticeAccountTemplate
