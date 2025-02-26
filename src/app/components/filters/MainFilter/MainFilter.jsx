import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Box, Grid } from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import { MainButton } from '../../buttons'
import { GeneralTitle } from '../../texts'
import theme from '../../../theme'
import FieldFilter from '../FieldFilter/FieldFilter'
import { resetResultSubscriptionFile } from '../../../slices/partner/partnerSlice'

const MainFilter = ({ fieldDetails, handleSearch, param }) => {
  const dispatch = useDispatch()
  const [isShowForm, setIsShowForm] = useState(false)
  const { control, handleSubmit, reset } = useForm()

  useEffect(() => {
    setIsShowForm(param)

    const searchParams = new URLSearchParams(param)
    const fields = {}

    searchParams.forEach((value, key) => {
      const fieldMatch = fieldDetails.find((field) => field.id === key)
      if (fieldMatch) {
        fields[key] = value
      }
    })

    reset(fields)
  }, [param])

  const handleShowForm = () => {
    setIsShowForm(!isShowForm)
  }

  const onSubmit = (dataForm) => {
    let url = ''
    Object.entries(dataForm).forEach(([key, value]) => {
      if (value) {
        url = `${url}${!url ? '?' : '&'}${key}=${value}`
      }
    })
    handleSearch(encodeURI(url))
  }

  const resetFields = () => {
    reset()
    dispatch(resetResultSubscriptionFile())
    handleSearch()
  }

  return (
    <>
      <Box display='flex' my={4} sx={{ justifyContent: 'flex-end' }}>
        <Box onClick={handleShowForm} sx={{ cursor: 'pointer' }}>
          <Box alignContent='center' display='flex' fontSize='1rem'>
            {isShowForm ? (
              <>
                <Box data-testid='filter-alt-off-icon'>
                  <FilterAltOffIcon />
                </Box>
                Ocultar filtros
              </>
            ) : (
              <>
                <Box data-testid='filter-alt-icon'>
                  <FilterAltIcon />
                </Box>
                Mostrar filtros
              </>
            )}
          </Box>
        </Box>
      </Box>
      {isShowForm && (
        <Box
          display='flex'
          my={4}
          sx={{ justifyContent: 'space-between', marginBottom: '0.9rem' }}
        >
          <Grid container spacing='2rem'>
            {fieldDetails?.map((field) => (
              <Grid item lg={4} md={6} xs={12} key={field.id}>
                <GeneralTitle
                  fontSize='.75rem'
                  lineHeight='1rem'
                  text={`${field.name}`}
                />
                <Controller
                  control={control}
                  defaultValue=''
                  name={field.id}
                  render={({ field: { onChange, value } }) => (
                    <FieldFilter
                      field={field}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
              </Grid>
            ))}
          </Grid>
          <Box
            ml={3}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'column',
            }}
          >
            <Box my={2}>
              <MainButton
                data-testid='button-filter-search'
                onClick={handleSubmit(onSubmit)}
              >
                Buscar
              </MainButton>
            </Box>
            <MainButton
              background={theme.palette.background.blueLight}
              data-testid='button-filter-clean'
              onClick={resetFields}
              type='secondary'
            >
              Limpiar
            </MainButton>
          </Box>
        </Box>
      )}
    </>
  )
}

MainFilter.propTypes = {
  fieldDetails: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      placeholder: PropTypes.string,
      type: PropTypes.string,
      values: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string,
          name: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
  handleSearch: PropTypes.func.isRequired,
  param: PropTypes.string,
}

MainFilter.defaultProps = {
  param: null,
}

export default MainFilter
