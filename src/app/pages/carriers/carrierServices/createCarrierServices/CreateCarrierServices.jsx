import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Box, Grid, MenuItem, Switch, Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { GeneralTitle } from '../../../../components/texts'
import { MainInput, SelectInput } from '../../../../components/inputs'
import { BackButton, MainButton } from '../../../../components/buttons'
import Alert from '../../../../components/modals/Alert/Alert'
import {
  createCarrierService,
  getCarriers,
  resetCarrierService,
} from '../../../../slices/carriers/carrierSlice'
import { getCategories } from '../../../../slices/category/categorySlice'
import { getSkuProduct } from '../../../../utils/utilsValidations'
import { Pagination } from '../../../../components/tables'

const CreateCarrierServices = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { carriers, carrierService } = useSelector((state) => state.carrier)
  const { categories } = useSelector((state) => state.category)
  const { isLoading } = useSelector((state) => state.loading)
  const [showAlert, setShowAlert] = useState(false)
  const [page, setPage] = useState(0)
  const { control, handleSubmit } = useForm()

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getCarriers())
  }, [])

  const onSubmit = (dataForm) => {
    const values = {
      name: dataForm.name,
      sku: dataForm.sku.toUpperCase(),
      cost_per_year: dataForm.cost_per_year,
      cost_per_month: dataForm.cost_per_month,
      is_enabled: dataForm.is_enabled,
      carrier_id: dataForm.carrier_id,
      category_id: dataForm.category_id,
    }

    dispatch(createCarrierService(values))
  }

  const handleCloseAlert = () => {
    dispatch(resetCarrierService())
    setShowAlert(false)
    navigate('/carrier-services')
  }

  const onPageChange = async (event, newPage) => {
    await dispatch(getCarriers(`?page=${newPage + 1}`))
    setPage(newPage)
  }

  useEffect(() => {
    if (carrierService && Object.entries(carrierService)?.length !== 0) {
      setShowAlert(true)
    }
  }, [carrierService])

  return (
    <Box sx={{ width: '100%' }}>
      {showAlert && (
        <Alert
          alertContentText={`Se creo el carrier service ${carrierService?.name}`}
          alertTextButton='Cerrar'
          alertTitle='¡Registro exitoso!'
          isOpen={showAlert}
          setIsOpen={handleCloseAlert}
        />
      )}
      <BackButton />
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle
          data-testid='title-create-carrierService'
          text='Crear carrier services'
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
                required: 'El nombre del carrier service es requerido',
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
                    id='name-carrierService'
                    placeholder=''
                    radius='.5rem'
                    onChange={onChange}
                    type='text'
                    value={value}
                    width='18rem'
                  />
                  <Typography
                    color='error.main'
                    data-testid='error-message-name-carrierService'
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
                maxLength: 15,
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
                    id='sku-carrierService'
                    placeholder=''
                    radius='.5rem'
                    sx={{
                      '& input': {
                        textTransform: 'uppercase',
                      },
                    }}
                    onChange={onChange}
                    type='text'
                    value={value}
                    width='18rem'
                  />
                  <Typography
                    color='error.main'
                    data-testid='error-message-sku-carrierService'
                    variant='caption'
                  >
                    {errorInput?.message}
                  </Typography>
                  {(errorInput?.type === 'maxLength'
                    || errorInput?.type === 'minLength') && (
                    <Typography
                      color='error.main'
                      data-testid='error-message-sku-carrierService'
                      variant='caption'
                    >
                      El sku debe contener entre 8 y 15 caracteres
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
              text='Costo por año* '
            />
            <Controller
              control={control}
              defaultValue=''
              name='cost_per_year'
              rules={{
                required: 'El costo por año es requerido',
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
                    id='cost-per-year-carrierService'
                    placeholder=''
                    radius='.5rem'
                    onChange={onChange}
                    type='number'
                    value={value}
                    width='18rem'
                  />
                  <Typography
                    color='error.main'
                    data-testid='error-message-cost-per-year-carrierService'
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
              text='Costo por mes* '
            />
            <Controller
              control={control}
              defaultValue=''
              name='cost_per_month'
              rules={{
                required: 'El costo por mes es requerido',
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
                    id='cost-per-month-carrierService'
                    placeholder=''
                    radius='.5rem'
                    onChange={onChange}
                    type='number'
                    value={value}
                    width='18rem'
                  />
                  <Typography
                    color='error.main'
                    data-testid='error-message-cost-per-month-carrierService'
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
              text='Categoría*'
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
                    id='category-carrierService'
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
                    data-testid='error-message-category-carrierService'
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
              text='Carrier* '
            />
            <Box>
              <Controller
                control={control}
                defaultValue=''
                name='carrier_id'
                rules={{
                  required: 'El carrier es requerido',
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error: errorInput },
                }) => (
                  <Grid
                    container
                    flexDirection='column'
                    marginTop='.5rem'
                    width='18rem'
                  >
                    <SelectInput
                      displayEmpty
                      error={!!errorInput}
                      height='3rem'
                      id='carrier-carrierService'
                      onChange={onChange}
                      value={value}
                    >
                      <MenuItem value=''>Seleccionar </MenuItem>
                      {carriers?.data?.map((carrier) => (
                        <MenuItem key={carrier.id} value={carrier.id}>
                          {carrier.name}
                        </MenuItem>
                      ))}
                      <Grid container display='flex' alignItems='center'>
                        <Pagination
                          count={carriers?.meta?.total ?? 0}
                          labelDisplayedRows={() => ''}
                          onPageChange={onPageChange}
                          page={page}
                          SelectProps={{
                            native: true,
                          }}
                          rowsPerPageOptions={[10]}
                        />
                      </Grid>
                    </SelectInput>
                    <Typography
                      color='error.main'
                      data-testid='error-message-carrier-carrierService'
                      variant='caption'
                    >
                      {errorInput?.message}
                    </Typography>
                  </Grid>
                )}
              />
            </Box>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Habilitar'
            />
            <Controller
              control={control}
              defaultValue={false}
              name='is_enabled'
              render={({ field: { onChange, value } }) => (
                <Grid container flexDirection='column' marginTop='.5rem'>
                  <Grid>
                    <Typography
                      data-testid='message-is-enabled-carrierService'
                      variant='caption'
                    >
                      No
                    </Typography>
                    <Switch
                      id='enabled-carrierService'
                      value={value}
                      onChange={onChange}
                    />
                    <Typography
                      data-testid='message-is-enabled-carrierService'
                      variant='caption'
                    >
                      Si
                    </Typography>
                  </Grid>
                  {!value && (
                    <Typography
                      data-testid='message-is-enabled-carrierService'
                      variant='caption'
                    >
                      El carrier service se creara, pero no estará habilitado
                    </Typography>
                  )}
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

export default CreateCarrierServices
