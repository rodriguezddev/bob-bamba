import React, { useEffect } from 'react'
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
import { MainButton } from '../../../../components/buttons'
import { GeneralTitle } from '../../../../components/texts'
import { MainInput, SelectInput } from '../../../../components/inputs'
import theme from '../../../../theme'
import {
  getTemplates,
  sendRecoveryMessage,
} from '../../../../slices/recoveryMessage/recoveryMessageSlice'

const RecoveryMessageForm = ({ handleShowForm, open, user }) => {
  const { control, handleSubmit } = useForm()
  const { isLoading } = useSelector((state) => state.loading)
  const { templates } = useSelector((state) => state.recoveryMessage)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTemplates())
  }, [])

  const onSubmit = (dataForm) => {
    const [template, language] = dataForm.infoTemplate.split(' ')
    const values = {
      template,
      language,
      number: user.cellphone,
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
        Mensaje de recuperación
      </DialogTitle>
      <DialogContent>
        <Grid
          alignItems='center'
          container
          direction='column'
          justifyContent='center'
        >
          <Grid item lg={4} mb={2} md={6} xs={12}>
            <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Teléfono' />
            <Grid container flexDirection='column' marginTop='.5rem'>
              <MainInput
                disabled
                height='3rem'
                hiddenIcon
                id='infoTemplate'
                placeholder=''
                value={user?.cellphone}
              />
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Template' />
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
                <Grid container flexDirection='column' marginTop='.5rem'>
                  <SelectInput
                    error={!!errorInput}
                    height='3rem'
                    id='infoTemplate'
                    onChange={onChange}
                    value={value}
                  >
                    <MenuItem value=''>Seleccionar</MenuItem>
                    {Object.entries(templates).map(([key, item]) => (
                      <MenuItem key={key} value={`${key} ${item.language}`}>
                        {item.text}
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
  user: PropTypes.shape({ cellphone: PropTypes.string }).isRequired,
}

export default RecoveryMessageForm
