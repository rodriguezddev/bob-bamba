import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Box, Grid, MenuItem, Switch, Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import AddIcon from '@mui/icons-material/Add'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
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
import theme from '../../../../theme'

const CreateCarrierServices = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { carriers, carrierService } = useSelector((state) => state.carrier)
  const { categories } = useSelector((state) => state.category)
  const { isLoading } = useSelector((state) => state.loading)
  const [showAlert, setShowAlert] = useState(false)
  const [page, setPage] = useState(0)
  const { control, handleSubmit } = useForm()
  const [contentValues, setContentValues] = useState([])
  const [metaContent, setMetaContent] = useState([])

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getCarriers())
  }, [])

  const onSubmit = (dataForm) => {
    const values = {
      name: dataForm.name,
      sku: dataForm.sku.toUpperCase(),
      cost_per_year: dataForm.costPerYear,
      cost_per_month: dataForm.costPerMonth,
      is_enabled: dataForm.isEnabled,
      carrier_id: dataForm.carrierId,
      category_id: dataForm.categoryId,
      meta: metaContent,
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

  const handleChangeContent = (index, event) => {
    const updatedContentValues = [...contentValues]
    const updatedContentItem = { ...updatedContentValues[index] }

    updatedContentItem[event.target.name] = event.target.value
    updatedContentValues[index] = updatedContentItem

    setMetaContent(
      updatedContentValues.reduce((convertedValues, item) => {
        convertedValues[item.key] = item.value
        return convertedValues
      }, {}),
    )

    setContentValues(updatedContentValues)
  }

  const handleAddInput = () => {
    setContentValues([...contentValues, { key: '', value: '' }])
  }

  const handleDeleteInput = (index) => {
    const newContentValues = [...contentValues]

    newContentValues.splice(index, 1)
    setContentValues(newContentValues)
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
      <Grid container marginTop='2rem' spacing='2rem'>
        <Grid item lg={4} md={6} xs={12}>
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Nombre(s)*' />
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
                  id='nameCarrierService'
                  onChange={onChange}
                  placeholder=''
                  radius='.5rem'
                  type='text'
                  value={value}
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
                  hiddenIcon
                  id='skuCarrierService'
                  onChange={onChange}
                  placeholder=''
                  radius='.5rem'
                  sx={{
                    '& input': {
                      textTransform: 'uppercase',
                    },
                  }}
                  type='text'
                  value={value}
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
            text='Costo por año*'
          />
          <Controller
            control={control}
            defaultValue=''
            name='costPerYear'
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
                  hiddenIcon
                  id='costPerYearCarrierService'
                  onChange={onChange}
                  placeholder=''
                  radius='.5rem'
                  type='number'
                  value={value}
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
            name='costPerMonth'
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
                  hiddenIcon
                  id='costPerMonthCarrierService'
                  onChange={onChange}
                  placeholder=''
                  radius='.5rem'
                  type='number'
                  value={value}
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
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Categoría*' />
          <Controller
            control={control}
            defaultValue=''
            name='categoryId'
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
                  id='categoryCarrierService'
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
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Carrier* ' />
          <Box>
            <Controller
              control={control}
              defaultValue=''
              name='carrierId'
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
                    id='carrierCarrierService'
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
                        rowsPerPage={10}
                        SelectProps={{
                          native: true,
                        }}
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
          <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Habilitar' />
          <Controller
            control={control}
            defaultValue={false}
            name='isEnabled'
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
                    id='enabledCarrierService'
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
        <Grid item mt={3} xs={12}>
          <GeneralTitle
            fontSize='1rem'
            lineHeight='1.5rem'
            text='Agregar detalles extras'
          />
          <GeneralTitle
            fontSize='.65rem'
            fontWeight='500'
            lineHeight='1rem'
            marginBottom='1.5rem'
            text='Esta sección no es obligatoria'
          />
          <Grid
            item
            sx={{
              marginTop: '1rem',
            }}
          >
            {contentValues.map((item, index) => (
              <Box
                alignItems='center'
                display='flex'
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                sx={{
                  padding: '1rem',
                }}
              >
                <Grid item marginRight='2rem'>
                  <GeneralTitle
                    fontSize='.75rem'
                    lineHeight='1rem'
                    text='Nombre'
                  />
                  <Grid
                    container
                    flexDirection='column'
                    justifyContent='center'
                    marginTop='.5rem'
                  >
                    <Controller
                      control={control}
                      name={`key${index}`}
                      rules={{ required: 'El campo no puede estar vació' }}
                      render={({
                        field: { onChange },
                        fieldState: { error: errorInput },
                      }) => (
                        <Grid
                          container
                          flexDirection='column'
                          marginTop='.5rem'
                        >
                          <MainInput
                            error={!!errorInput}
                            hiddenIcon
                            id='key'
                            name='key'
                            onChange={onChange}
                            onInput={(event) => handleChangeContent(index, event)}
                            placeholder=''
                            radius='.5rem'
                            type='text'
                            value={item.key}
                          />
                          <Typography
                            color='error.main'
                            data-testid='error-message-name-key'
                            variant='caption'
                          >
                            {errorInput?.message}
                          </Typography>
                        </Grid>
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid item marginRight='1rem'>
                  <GeneralTitle
                    fontSize='.75rem'
                    lineHeight='1rem'
                    text='Valores'
                  />
                  <Grid
                    container
                    flexDirection='column'
                    justifyContent='center'
                    marginTop='.5rem'
                  >
                    <Controller
                      control={control}
                      name={`value${index}`}
                      rules={{ required: 'El campo no puede estar vació' }}
                      render={({
                        field: { onChange },
                        fieldState: { error: errorInput },
                      }) => (
                        <Grid
                          container
                          flexDirection='column'
                          marginTop='.5rem'
                        >
                          <MainInput
                            error={!!errorInput}
                            hiddenIcon
                            id='value'
                            multiline
                            name='value'
                            onChange={onChange}
                            onInput={(event) => handleChangeContent(index, event)}
                            placeholder=''
                            radius='.5rem'
                            rows={1}
                            type='text'
                            value={item.value}
                          />
                          <Typography
                            color='error.main'
                            data-testid='error-message-name-value'
                            variant='caption'
                          >
                            {errorInput?.message}
                          </Typography>
                        </Grid>
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid
                  display='flex'
                  item
                  justifyContent='flex-end'
                  marginTop='2rem'
                >
                  <MainButton
                    background={theme.palette.background.blueLight}
                    onClick={() => handleDeleteInput(index)}
                    type='secondary'
                    sx={{
                      height: '2rem',
                      minWidth: '2rem',
                      padding: '0rem',
                    }}
                    width='1rem'
                  >
                    <HighlightOffIcon sx={{ fontSize: '1.5rem' }} />
                  </MainButton>
                </Grid>
              </Box>
            ))}
          </Grid>

          <Box marginTop='1rem'>
            <MainButton onClick={handleAddInput} type='primary' width='4rem'>
              <AddIcon sx={{ fontSize: '1.5rem' }} />
            </MainButton>
          </Box>
        </Grid>
      </Grid>
      <Box display='flex' my={4} sx={{ justifyContent: 'flex-end' }}>
        <MainButton
          data-testid='create-carrierService-button'
          disabled={isLoading}
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

export default CreateCarrierServices
