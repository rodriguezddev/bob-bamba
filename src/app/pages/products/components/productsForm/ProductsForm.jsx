import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import {
  Box, Grid, MenuItem, Switch, Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { GeneralTitle } from '../../../../components/texts'
import { MainInput, SelectInput, TextArea } from '../../../../components/inputs'
import { getSkuProduct } from '../../../../utils/utilsValidations'
import { MainButton } from '../../../../components/buttons'
import { ActionAlert } from '../../../../components/modals'
import CarriesServicesContainer from '../carriesServicesContainer/CarriesServicesContainer'
import MetaGenerator from '../../../../components/metaGenerator'
import { getCategories } from '../../../../slices/category/categorySlice'
import { getCarrierServices } from '../../../../slices/carriers/carrierSlice'
import theme from '../../../../theme'

const ProductsForm = ({
  descriptionContent,
  isCarrierEmpty,
  metaContent,
  productsForm,
  setMetaContent,
  setDescriptionContent,
  assignedCarries,
  setAssignedCarries,
}) => {
  const { control } = productsForm
  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state.category)
  const [showDialogCarriers, setShowDialogCarriers] = useState(false)
  const [descriptionValues, setDescriptionValues] = useState([])

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getCarrierServices())
  }, [])

  const handleShowDialogCarriers = () => {
    setShowDialogCarriers(!showDialogCarriers)
  }

  const handleAddInput = () => {
    setDescriptionValues([...descriptionValues, { section: '', body: '' }])
  }

  const handleDeleteInput = (index) => {
    const newContentValues = [...descriptionValues]

    newContentValues.splice(index, 1)
    setDescriptionValues(newContentValues)
  }

  const handleChangeContent = (index, event) => {
    const updatedContentValues = [...descriptionValues]
    const updatedContentItem = { ...updatedContentValues[index] }

    updatedContentItem[event.target.name] = event.target.value
    updatedContentValues[index] = updatedContentItem

    setDescriptionValues(updatedContentValues)
    setDescriptionContent(updatedContentValues)
  }

  useEffect(() => {
    setDescriptionValues(descriptionContent)
  }, [descriptionContent])

  return (
    <Grid container marginTop='2rem' spacing='2rem'>
      <Grid item lg={4} md={6} xs={12}>
        <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Nombre*' />
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
                hiddenIcon
                id='name-product'
                onChange={onChange}
                placeholder=''
                radius='.5rem'
                type='text'
                value={value}
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
                id='sku-product'
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
          {assignedCarries && assignedCarries?.length !== 0 && (
            <Box mb={2}>
              {`Seleccionados: ${assignedCarries?.map(
                (assignedCarrie) => assignedCarrie?.name,
              )}`}
            </Box>
          )}
          <MainButton onClick={() => handleShowDialogCarriers()} width='16rem'>
            {assignedCarries?.length !== 0
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
        <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Categoría* ' />
        <Controller
          control={control}
          defaultValue={[]}
          name='categories'
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
                id='category-product'
                multiple
                onChange={onChange}
                value={value}
              >
                <MenuItem value='' disabled>
                  Seleccionar
                </MenuItem>
                {categories?.data
                  && categories?.data?.map((category) => (
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
      <Grid item lg={4} md={6} xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Recurrente'
            />
            <Controller
              control={control}
              defaultValue={false}
              name='is_recurrent'
              render={({ field: { onChange, value } }) => (
                <Grid container marginTop='.5rem'>
                  <Typography
                    data-testid='message-is-recurrent'
                    variant='caption'
                  >
                    No
                  </Typography>
                  <Switch
                    checked={value}
                    id='is_recurrent'
                    value={value}
                    onChange={onChange}
                  />
                  <Typography
                    data-testid='message-is-recurrent'
                    variant='caption'
                  >
                    Si
                  </Typography>
                </Grid>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Saas ' />
            <Controller
              control={control}
              defaultValue={false}
              name='is_saas'
              render={({ field: { onChange, value } }) => (
                <Grid container marginTop='.5rem'>
                  <Typography
                    data-testid='message-is-recurrent'
                    variant='caption'
                  >
                    No
                  </Typography>
                  <Switch
                    checked={value}
                    id='is_saas'
                    value={value}
                    onChange={onChange}
                  />
                  <Typography
                    data-testid='message-is-recurrent'
                    variant='caption'
                  >
                    Si
                  </Typography>
                </Grid>
              )}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} md={6} xs={12}>
        <GeneralTitle
          fontSize='.75rem'
          lineHeight='1rem'
          text='Precio para saas'
        />
        <Controller
          control={control}
          defaultValue=''
          name='price'
          render={({
            field: { onChange, value },
            fieldState: { error: errorInput },
          }) => (
            <Grid container flexDirection='column' marginTop='.5rem'>
              <MainInput
                error={!!errorInput}
                hiddenIcon
                id='price-product'
                onChange={onChange}
                placeholder=''
                radius='.5rem'
                type='text'
                value={value}
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
        <GeneralTitle
          fontSize='.75rem'
          lineHeight='1rem'
          text='Enlace de términos y condiciones'
        />
        <Controller
          control={control}
          defaultValue=''
          name='terms'
          render={({
            field: { onChange, value },
            fieldState: { error: errorInput },
          }) => (
            <Grid container flexDirection='column' marginTop='.5rem'>
              <MainInput
                error={!!errorInput}
                hiddenIcon
                id='terms-product'
                onChange={onChange}
                placeholder=''
                radius='.5rem'
                type='text'
                value={value}
              />
              <Typography
                color='error.main'
                data-testid='error-message-terms-product'
                variant='caption'
              >
                {errorInput?.message}
              </Typography>
            </Grid>
          )}
        />
      </Grid>
      <Grid item lg={4} md={6} xs={12}>
        <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Brief' />
        <Controller
          control={control}
          defaultValue=''
          name='brief'
          render={({
            field: { onChange, value },
            fieldState: { error: errorInput },
          }) => (
            <Grid container flexDirection='column' marginTop='.5rem'>
              <TextArea
                error={!!errorInput}
                id='brief-product'
                onChange={onChange}
                placeholder=''
                radius='.5rem'
                type='text'
                value={value}
              />
              <Typography
                color='error.main'
                data-testid='error-message-brief-product'
                variant='caption'
              >
                {errorInput?.message}
              </Typography>
            </Grid>
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <GeneralTitle
          fontSize='1rem'
          lineHeight='1.5rem'
          text='Agregar descripción'
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
          {descriptionValues.map((item, index) => (
            <Box
              alignItems='center'
              display='flex'
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              sx={{
                padding: '1rem',
              }}
            >
              <Grid container>
                <Grid item marginRight='2rem' xs={4}>
                  <GeneralTitle
                    fontSize='.75rem'
                    lineHeight='1rem'
                    marginBottom='1rem'
                    text='Sección'
                  />
                  <Grid
                    container
                    flexDirection='column'
                    justifyContent='center'
                    marginTop='.5rem'
                  >
                    <Controller
                      control={control}
                      name={`section${index}`}
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
                            id='section'
                            name='section'
                            onChange={onChange}
                            onInput={(event) => handleChangeContent(index, event)}
                            placeholder=''
                            radius='.5rem'
                            type='text'
                            value={item.section}
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
                <Grid item marginRight='1rem' xs={7}>
                  <GeneralTitle
                    fontSize='.75rem'
                    lineHeight='1rem'
                    text='Contenido'
                  />
                  <GeneralTitle
                    fontSize='.65rem'
                    fontWeight='500'
                    lineHeight='1rem'
                    text='Separa cada sección del contenido con un salto de linea'
                  />
                  <Grid
                    container
                    flexDirection='column'
                    justifyContent='center'
                    marginTop='.5rem'
                  >
                    <Controller
                      control={control}
                      name={`body${index}`}
                      render={({
                        field: { onChange },
                        fieldState: { error: errorInput },
                      }) => (
                        <Grid
                          container
                          flexDirection='column'
                          marginTop='.5rem'
                        >
                          <TextArea
                            error={!!errorInput}
                            id='body'
                            multiline
                            name='body'
                            onChange={onChange}
                            onInput={(event) => handleChangeContent(index, event)}
                            placeholder=''
                            radius='.5rem'
                            type='text'
                            value={item.body}
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
      <Grid item xs={12}>
        <MetaGenerator
          metaContent={metaContent}
          setMetaContent={setMetaContent}
        />
      </Grid>
    </Grid>
  )
}

ProductsForm.propTypes = {
  assignedCarries: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape()])),
  descriptionContent: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.shape()]),
  ),
  isCarrierEmpty: PropTypes.bool.isRequired,
  metaContent: PropTypes.shape(),
  productsForm: PropTypes.shape({
    control: PropTypes.shape({}).isRequired,
  }).isRequired,
  setMetaContent: PropTypes.func.isRequired,
  setDescriptionContent: PropTypes.func.isRequired,
  setAssignedCarries: PropTypes.func.isRequired,
}

ProductsForm.defaultProps = {
  assignedCarries: null,
  descriptionContent: [],
  metaContent: {},
}

export default ProductsForm
