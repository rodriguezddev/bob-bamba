import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Box, Grid, MenuItem, Switch, Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { GeneralTitle } from '../../../components/texts'
import { MainInput, SelectInput } from '../../../components/inputs'
import { BackButton, MainButton } from '../../../components/buttons'
import Alert from '../../../components/modals/Alert/Alert'
import { getCategories } from '../../../slices/category/categorySlice'
import { getCarrierServices } from '../../../slices/carriers/carrierSlice'
import {
  createProduct,
  resetProduct,
} from '../../../slices/product/productSlice'
import { getSkuProduct } from '../../../utils/utilsValidations'
import ActionAlert from '../../../components/modals/ActionAlert/ActionAlert'
import CarriesServicesContainer from '../components/carriesServicesContainer/CarriesServicesContainer'

const CreateProducts = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { product } = useSelector((state) => state.product)
  const { categories } = useSelector((state) => state.category)
  const { isLoading } = useSelector((state) => state.loading)
  const [showAlert, setShowAlert] = useState(false)
  const { control, handleSubmit } = useForm()
  const [showDialogCarriers, setShowDialogCarriers] = useState(false)
  const [assignedCarries, setAssignedCarries] = useState([])
  const [isCarrierEmpty, setIsCarrierEmpty] = useState(false)

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getCarrierServices())
  }, [])

  useEffect(() => {
    if (isCarrierEmpty) {
      setIsCarrierEmpty(false)
    }
  }, [assignedCarries])

  const handleCarriesId = (carries) => carries.map((carrier) => carrier.id)

  const onSubmit = (dataForm) => {
    if (assignedCarries.length === 0) {
      setIsCarrierEmpty(true)
      return
    }

    const values = {
      sku: dataForm.sku,
      name: dataForm.name,
      is_recurrent: dataForm.is_recurrent,
      expiration_unit: dataForm.expiration_unit,
      expiration_period: dataForm.expiration_period,
      status: 'ACTIVE',
      carrier_services: handleCarriesId(assignedCarries),
      category_id: dataForm.category_id,
    }

    dispatch(createProduct(values))
  }

  const handleCloseAlert = () => {
    dispatch(resetProduct())
    setShowAlert(false)
    navigate('/products')
  }

  const handleShowDialogCarriers = () => {
    setShowDialogCarriers(!showDialogCarriers)
  }

  useEffect(() => {
    if (product && Object.entries(product)?.length !== 0) {
      setShowAlert(true)
    }
  }, [product])

  return (
    <Box sx={{ width: '100%' }}>
      {showAlert && (
        <Alert
          alertContentText={`Se creo el producto ${product?.name}`}
          alertTextButton='Cerrar'
          alertTitle='¡Registro exitoso!'
          isOpen={showAlert}
          setIsOpen={handleCloseAlert}
        />
      )}
      <BackButton />
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle
          data-testid='title-create-product'
          text='Crear producto'
        />
      </Box>
      <Grid container marginTop='2rem' spacing='2rem'>
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Nombre(s)*' />
          <Controller
            control={control}
            defaultValue=''
            name='name'
            rules={{
              required: 'El nombre del producto es requerido',
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <MainInput
                  error={!!errorInput}
                  height='3rem'
                  hiddenIcon
                  id='name-product'
                  placeholder=''
                  radius='.5rem'
                  onChange={onChange}
                  type='text'
                  value={value}
                  width='18rem'
                />
                <Typography
                  color='error.main'
                  data-testid='error-message-name-product'
                  variant='caption'
                >
                  {errorInput?.message}
                </Typography>
              </Grid>
            )}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='SKU*' />
          <Controller
            control={control}
            defaultValue=''
            name='sku'
            rules={{
              maxLength: 12,
              minLength: 8,
              required: 'El SKU es requerido',
              pattern: getSkuProduct(),
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <MainInput
                  error={!!errorInput}
                  height='3rem'
                  hiddenIcon
                  id='sku-product'
                  placeholder=''
                  radius='.5rem'
                  onChange={onChange}
                  type='text'
                  value={value}
                  width='18rem'
                />
                <Typography
                  color='error.main'
                  data-testid='error-message-product'
                  variant='caption'
                >
                  {errorInput?.message}
                </Typography>
                {(errorInput?.type === 'maxLength'
                  || errorInput?.type === 'minLength') && (
                  <Typography
                    color='error.main'
                    data-testid='error-message-product'
                    variant='caption'
                  >
                    El sku debe contener entre 8 y 12 caracteres
                  </Typography>
                )}
              </Grid>
            )}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle
            fontSize='.75rem'
            lineHeight='1rem'
            text='Tipo de expiración* '
          />
          <Controller
            control={control}
            defaultValue=''
            name='expiration_period'
            rules={{
              required: 'El tipo de expiración es requerido',
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <SelectInput
                  error={!!errorInput}
                  height='3rem'
                  id='expiration-period-product'
                  onChange={onChange}
                  value={value}
                >
                  <MenuItem value=''>Seleccionar</MenuItem>
                  <MenuItem value='ANNUAL'>Anual</MenuItem>
                  <MenuItem value='MONTHLY'>Mensual</MenuItem>
                  <MenuItem value='WEEKLY'>Semanal</MenuItem>
                  <MenuItem value='DAY'>Diario</MenuItem>
                </SelectInput>
                <Typography
                  color='error.main'
                  data-testid='error-message-expiration-period-product'
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
            text='Carrier service*'
          />
          <Box mt={1.5}>
            {assignedCarries.length !== 0 && (
              <Box mb={2}>{`Seleccionados: ${assignedCarries.length}`}</Box>
            )}
            <MainButton onClick={() => handleShowDialogCarriers()} width='60%'>
              {assignedCarries.length !== 0
                ? 'Editar'
                : 'Asignar carrier services'}
            </MainButton>
            <br />
            <Typography
              color='error.main'
              data-testid='error-message-carrier-services'
              variant='caption'
            >
              {isCarrierEmpty && 'Debe asignar carrier services'}
            </Typography>
          </Box>
          {showDialogCarriers && (
            <ActionAlert
              actionAlertContentText='Elige uno o mas carrier services para asignar a producto'
              actionAlertTextButton='Cerrar'
              actionAlertTitle='Asignar carrier services'
              isOpen={showDialogCarriers}
              isShowPrimaryButton
              primaryButtonTextAlert='Asignar'
              setActionsIsOpen={() => setShowDialogCarriers(!showDialogCarriers)}
              onClick={handleShowDialogCarriers}
            >
              <CarriesServicesContainer
                assignedCarriesServices={setAssignedCarries}
                carriers={assignedCarries}
              />
            </ActionAlert>
          )}
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle
            fontSize='.75rem'
            lineHeight='1rem'
            text='Recurrente* '
          />
          <Controller
            control={control}
            defaultValue={false}
            name='is_recurrent'
            render={({ field: { onChange, value } }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <Grid>
                  <Typography
                    data-testid='message-is-recurrent'
                    variant='caption'
                  >
                    No
                  </Typography>
                  <Switch id='is_recurrent' value={value} onChange={onChange} />
                  <Typography
                    data-testid='message-is-recurrent'
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
          <GeneralTitle
            fontSize='.75rem'
            lineHeight='1rem'
            text='Unidad de expiración* '
          />
          <Controller
            control={control}
            defaultValue=''
            name='expiration_unit'
            rules={{
              required: 'El periodo de expiración es requerido',
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <SelectInput
                  error={!!errorInput}
                  height='3rem'
                  id='expiration-unit-product'
                  onChange={onChange}
                  value={value}
                >
                  <MenuItem value=''>Seleccionar</MenuItem>
                  <MenuItem value='1'>1</MenuItem>
                  <MenuItem value='3'>3</MenuItem>
                  <MenuItem value='6'>6</MenuItem>
                </SelectInput>
                <Typography
                  color='error.main'
                  data-testid='error-message-expiration-unit-product'
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
            text='Categoría* '
          />
          <Controller
            control={control}
            defaultValue=''
            name='category_id'
            rules={{
              required: 'La categoría es requerida',
            }}
            render={({
              field: { onChange, value },
              fieldState: { error: errorInput },
            }) => (
              <Grid container flexDirection='column' marginTop='.5rem'>
                <SelectInput
                  error={!!errorInput}
                  height='3rem'
                  id='category-product'
                  onChange={onChange}
                  value={value}
                >
                  <MenuItem value=''>Seleccionar</MenuItem>
                  {categories?.data?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </SelectInput>
                <Typography
                  color='error.main'
                  data-testid='error-message-category-product'
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
          data-testid='create-product-button'
          disabled={isLoading}
          height='3rem'
          onClick={handleSubmit(onSubmit)}
          radius='1.55rem'
          type='primary'
          width='10.12rem'
        >
          Enviar
        </MainButton>
      </Box>
    </Box>
  )
}

export default CreateProducts
