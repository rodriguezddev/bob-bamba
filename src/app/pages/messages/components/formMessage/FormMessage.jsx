import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import {
  Grid, MenuItem, Switch, Typography,
} from '@mui/material'
import { GeneralTitle } from '../../../../components/texts'
import { SelectInput, TextArea } from '../../../../components/inputs'
import { getPartners } from '../../../../slices/partner/partnerSlice'
import { messageKeys, messageTypes } from '../../../../constants/messageInfo'
import { getMessageKey, getMessageType } from '../../../../utils/UtilsTranslate'

const FormMessage = ({ formMessageHook, update }) => {
  const dispatch = useDispatch()
  const { partners } = useSelector((state) => state.partner)
  const { control } = formMessageHook

  useEffect(() => {
    dispatch(getPartners('?limit=100'))
  }, [])

  return (
    <Grid container marginTop='2rem' spacing='2rem'>
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
              </SelectInput>
              <Typography
                color='error.main'
                data-testid='error-message-partner-id-message'
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
          text='Tipo de mensaje*'
        />
        <Controller
          control={control}
          defaultValue=''
          name='type'
          rules={{
            required: 'El tipo es requerido',
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
                id='type'
                onChange={onChange}
                value={value}
              >
                <MenuItem value=''>Seleccionar</MenuItem>
                {messageTypes.map((messageType) => (
                  <MenuItem key={messageType} value={messageType}>
                    {getMessageType(messageType)}
                  </MenuItem>
                ))}
              </SelectInput>
              <Typography
                color='error.main'
                data-testid='error-message-type-message'
                mt={1}
                variant='caption'
              >
                {errorInput?.message}
              </Typography>
            </Grid>
          )}
        />
      </Grid>
      {!update && (
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle
            fontSize='.75rem'
            lineHeight='1rem'
            text='Clave del mensaje*'
          />
          <Controller
            control={control}
            defaultValue=''
            name='messageKey'
            rules={{
              required: 'La clave del mensajes es obligatoria',
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
                  id='messageKey'
                  onChange={onChange}
                  value={value}
                >
                  <MenuItem value=''>Seleccionar</MenuItem>
                  {messageKeys.map((messageKey) => (
                    <MenuItem key={messageKey} value={messageKey}>
                      {getMessageKey(messageKey)}
                    </MenuItem>
                  ))}
                </SelectInput>
                <Typography
                  color='error.main'
                  data-testid='error-message-key-message'
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
      <Grid item lg={4} md={6} xs={12}>
        <GeneralTitle
          fontSize='.75rem'
          lineHeight='1rem'
          text='Usuarios sin identificar'
        />
        <Controller
          control={control}
          defaultValue={false}
          name='unidentifiedUser'
          render={({ field: { onChange, value } }) => (
            <Grid container flexDirection='column' marginTop='.5rem'>
              <Grid>
                <Typography
                  data-testid='message-is-unidentified-user'
                  variant='caption'
                >
                  No
                </Typography>
                <Switch
                  id='unidentified-user'
                  onChange={onChange}
                  value={value}
                />
                <Typography
                  data-testid='message-is-unidentified-user'
                  variant='caption'
                >
                  Si
                </Typography>
              </Grid>
            </Grid>
          )}
        />
      </Grid>
      <Grid item lg={4} md={6} xs={12}>
        <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Contenido*' />
        <Controller
          control={control}
          defaultValue=''
          name='message'
          rules={{
            required: 'El mensaje es requerido',
          }}
          render={({
            field: { onChange, value },
            fieldState: { error: errorInput },
          }) => (
            <Grid container flexDirection='column' marginTop='.5rem'>
              <TextArea
                error={!!errorInput}
                id='message'
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

FormMessage.propTypes = {
  formMessageHook: PropTypes.shape().isRequired,
  update: PropTypes.bool,
}

FormMessage.defaultProps = {
  update: false,
}

export default FormMessage
