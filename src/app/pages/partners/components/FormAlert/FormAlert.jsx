import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { DialogContent, Grid, Typography } from '@mui/material'
import { MainButton } from '../../../../components/buttons'
import {
  CustomFormDialog,
  CustomFormDialogTitle,
  CustomFormDialogContentText,
  CustomFormDialogActions,
} from './styles'
import theme from '../../../../theme'
import { MainInput } from '../../../../components/inputs'

const FormAlert = ({
  alertTitle,
  alertContentText,
  alertTextButton,
  errorText,
  isOpen,
  isShowPrimaryButton,
  primaryButtonTextAlert,
  product,
  setIsOpen,
  selectedProducts,
}) => {
  const { control, handleSubmit } = useForm()

  const onSubmit = (dataForm) => {
    selectedProducts({
      sku: product.sku,
      currency_code: 'MXN',
      price: dataForm.price,
    })

    setIsOpen(false)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <CustomFormDialog
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      maxWidth='xl'
      onClose={handleClose}
      open={isOpen}
    >
      <CustomFormDialogTitle id='alert-dialog-title' error={errorText ? 1 : 0}>
        {alertTitle}
      </CustomFormDialogTitle>
      <DialogContent sx={{ padding: '2rem' }}>
        <CustomFormDialogContentText
          id='alert-dialog-description'
          sx={{
            textAlign: 'center',
          }}
        >
          {alertContentText}
        </CustomFormDialogContentText>
      </DialogContent>
      <Grid container direction='row' justifyContent='center'>
        <Grid item>
          <Controller
            control={control}
            defaultValue=''
            name='price'
            rules={{
              required: 'El precio del producto es requerido',
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid
                container
                flexDirection='column'
                marginTop='.5rem'
                sx={{ cursor: 'pointer' }}
              >
                <MainInput
                  error={!!errorInput}
                  height='3rem'
                  hiddenIcon
                  id='product-price'
                  onChange={onChange}
                  placeholder='Precio del producto'
                  radius='.5rem'
                  type='number'
                  value={value}
                  width='18rem'
                />
                <Typography
                  color='error.main'
                  data-testid='error-message-product-price'
                  variant='caption'
                >
                  {errorInput?.message}
                </Typography>
              </Grid>
            )}
          />
        </Grid>
      </Grid>
      <CustomFormDialogActions>
        <MainButton
          background={
            isShowPrimaryButton ? theme.palette.background.blueLight : ''
          }
          onClick={handleClose}
          type={isShowPrimaryButton ? 'secondary' : 'primary'}
        >
          {alertTextButton}
        </MainButton>
        {isShowPrimaryButton && (
          <MainButton
            data-testid='primary-button-form-alert'
            onClick={handleSubmit(onSubmit)}
          >
            {primaryButtonTextAlert}
          </MainButton>
        )}
      </CustomFormDialogActions>
    </CustomFormDialog>
  )
}

FormAlert.propTypes = {
  alertTitle: PropTypes.string.isRequired,
  alertContentText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.node,
  ]).isRequired,
  alertTextButton: PropTypes.string.isRequired,
  errorText: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  isShowPrimaryButton: PropTypes.bool,
  primaryButtonTextAlert: PropTypes.string,
  product: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  setIsOpen: PropTypes.func.isRequired,
  selectedProducts: PropTypes.func.isRequired,
}

FormAlert.defaultProps = {
  errorText: false,
  isShowPrimaryButton: false,
  primaryButtonTextAlert: 'Eliminar',
}

export default FormAlert
