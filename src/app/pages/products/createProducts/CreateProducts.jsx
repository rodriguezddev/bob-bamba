import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Grid, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { GeneralTitle } from '../../../components/texts'
import { MainInput, SelectInput } from '../../../components/inputs'
import { BackButton, MainButton } from '../../../components/buttons'
import Alert from '../../../components/modals/Alert/Alert'
import { getCarrierServices } from '../../../slices/carrierService/carrierServiceSlice'
import { getCategories } from '../../../slices/category/categorySlice'
import {
  createProduct,
  resetProduct,
} from '../../../slices/product/productSlice'
import { getSkuProduct } from '../../../utils/utilsValidations'

const CreateProducts = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { product } = useSelector((state) => state.product)
  const { categories } = useSelector((state) => state.category)
  const { carrierServices } = useSelector((state) => state.carrierService)
  const { isLoading } = useSelector((state) => state.loading)
  const [showAlert, setShowAlert] = useState(false)
  const { control, handleSubmit } = useForm()

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getCarrierServices())
  }, [])

  const onSubmit = (dataForm) => {
    const values = {
      sku: dataForm.sku,
      name: dataForm.name,
      is_recurrent: true,
      expiration_unit: dataForm.expiration_unit,
      expiration_period: dataForm.expiration_period,
      status: 'ACTIVE',
      carrier_service_id: dataForm.carrier_service_id,
      category_id: dataForm.category_id,
    }
    dispatch(createProduct(values))
  }

  const handleCloseAlert = () => {
    dispatch(resetProduct())
    setShowAlert(false)
    navigate('/products')
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
      <form>
        <Grid container marginTop='2rem' spacing='2rem'>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Nombre(s)*'
            />
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
                    <option value=''>Seleccionar</option>
                    <option value='ANNUAL'>Anual</option>
                    <option value='MONTHLY'>Mensual</option>
                    <option value='WEEKLY'>Semanal</option>
                    <option value='DAY'>Diario</option>
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
                    <option value=''>Seleccionar</option>
                    <option value='1'>1</option>
                    <option value='3'>3</option>
                    <option value='6'>6</option>
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
              text='Producto de la aseguradora*'
            />
            <Controller
              control={control}
              defaultValue=''
              name='carrier_service_id'
              rules={{
                required: 'El producto de la aseguradora es requerido',
              }}
              render={({
                field: { onChange, value },
                fieldState: { error: errorInput },
              }) => (
                <Grid container flexDirection='column' marginTop='.5rem'>
                  <SelectInput
                    error={!!errorInput}
                    height='3rem'
                    id='carrier-service-product'
                    onChange={onChange}
                    value={value}
                  >
                    <option value=''>Seleccionar</option>
                    {carrierServices?.data?.map((carrierService) => (
                      <option key={carrierService.id} value={carrierService.id}>
                        {carrierService.name}
                      </option>
                    ))}
                  </SelectInput>
                  <Typography
                    color='error.main'
                    data-testid='error-message-carrier-service-product'
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
              text='Categoria* '
            />
            <Controller
              control={control}
              defaultValue=''
              name='category_id'
              rules={{
                required: 'La categoria es requerida',
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
                    <option value=''>Seleccionar</option>
                    {categories?.data?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
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
      </form>
      <Box display='flex' my={4} sx={{ justifyContent: 'flex-end' }}>
        <MainButton
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
