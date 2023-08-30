import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import {
  Box, Grid, IconButton, Tooltip, Typography,
} from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import {
  getCarrierServices,
  updateCarrierService,
} from '../../../slices/carriers/carrierSlice'
import { GeneralTitle } from '../../../components/texts'
import { GeneralTable, TableCell, TableRow } from '../../../components/tables'
import { columns } from './components/columns'
import { MainButton } from '../../../components/buttons'
import { filters } from './components/filters'
import { MainFilter } from '../../../components/filters'
import theme from '../../../theme'
import useRowsPerPage from '../../../hooks/useRowsPerPage'
import { ActionAlert, Alert } from '../../../components/modals'
import CarrierServicesForm from './components/carrierServicesForm/CarrierServicesForm'

const CarrierServices = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const carrierServicesForm = useForm()
  const { handleSubmit, reset } = carrierServicesForm
  const { carrierServices } = useSelector((state) => state.carrier)
  const [showDetailsCarrierService, setShowDetailsCarrierService] = useState(false)
  const [isShowUpdateAlert, setIsShowUpdateAlert] = useState(false)
  const [details, setDetails] = useState({})
  const [carrierService, setCarrierService] = useState({})
  const [metaValues, setMetaValues] = useState([])
  const {
    rowsPerPage,
    handleChangeRowsPerPage,
    handleSearch,
    page,
    onPageChange,
  } = useRowsPerPage(getCarrierServices, dispatch)

  useEffect(() => {
    if (carrierService) {
      reset({
        name: carrierService?.name || '',
        sku: carrierService?.sku || '',
      })
    }
  }, [carrierService])

  useEffect(() => {
    dispatch(getCarrierServices())
  }, [])

  const handleCreateCarrierService = () => {
    navigate('/carrier-services/create')
  }

  const handleNavigateToCarriers = () => {
    navigate('/carriers')
  }

  const handleShowUpdateAlert = (carrierServiceInfo) => {
    setCarrierService(carrierServiceInfo)
    setIsShowUpdateAlert(!isShowUpdateAlert)
  }

  const onSubmit = (dataForm) => {
    const data = {
      name: dataForm.name,
      sku: dataForm.sku.toUpperCase(),
      cost_per_year: dataForm.costPerYear,
      cost_per_month: dataForm.costPerMonth,
      is_enabled: dataForm.isEnabled,
      carrier_id: dataForm.carrierId,
      category_id: dataForm.categoryId,
      meta: metaValues,
    }
    const carrierServiceId = carrierService.id

    dispatch(updateCarrierService({ data, carrierServiceId }))
    setIsShowUpdateAlert(!isShowUpdateAlert)
  }

  const handleDescription = (description) => {
    setShowDetailsCarrierService(!showDetailsCarrierService)
    setDetails(
      Object.entries(description).map(([key, template]) => (
        <Box align='left' key={key}>
          <Typography fontWeight={600} variant='span'>
            {`${key}:`}
            {' '}
          </Typography>
          {template}
        </Box>
      )),
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle text='Carrier services' />
        <Box display='flex' flexDirection='column'>
          <MainButton
            color='primary'
            data-testid='button-create-carrierService'
            fontSize='0.85rem'
            height='3rem'
            onClick={handleCreateCarrierService}
            radius='0.62rem'
            width='15rem'
          >
            Crear carrier service
          </MainButton>
          <Box my={2}>
            <MainButton
              background={theme.palette.background.blueLight}
              color='primary'
              data-testid='button-redirect-carrier'
              fontSize='1rem'
              height='3rem'
              onClick={handleNavigateToCarriers}
              radius='0.62rem'
              type='secondary'
              width='15rem'
            >
              Ir a los carriers
            </MainButton>
          </Box>
        </Box>
      </Box>
      <MainFilter fieldDetails={filters} handleSearch={handleSearch} />
      <GeneralTable
        columns={columns}
        count={carrierServices?.meta?.total ?? 0}
        onPageChange={onPageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        SelectProps={{
          native: true,
        }}
      >
        {carrierServices?.data?.map((carrierServiceInfo) => (
          <TableRow key={carrierServiceInfo?.id}>
            <TableCell align='left'>{carrierServiceInfo?.name}</TableCell>
            <TableCell align='left'>{carrierServiceInfo?.sku}</TableCell>
            <TableCell align='center'>
              {carrierServiceInfo?.carrier?.name}
            </TableCell>
            <TableCell align='right'>
              {carrierServiceInfo?.cost_per_year}
            </TableCell>
            <TableCell align='right'>
              {carrierServiceInfo?.cost_per_month}
            </TableCell>
            <TableCell align='center'>
              {carrierServiceInfo?.category?.name}
            </TableCell>
            <TableCell align='center'>
              {carrierServiceInfo?.is_enabled ? 'Si' : 'No'}
            </TableCell>
            <TableCell align='center'>
              {carrierServiceInfo?.meta ? (
                <Typography
                  onClick={() => handleDescription(carrierServiceInfo?.meta)}
                  sx={{ cursor: 'pointer' }}
                >
                  <u>Ver metadatos</u>
                </Typography>
              ) : (
                '-'
              )}
            </TableCell>
            <TableCell align='center'>
              <Grid
                item
                onClick={() => handleShowUpdateAlert(carrierServiceInfo)}
              >
                <Tooltip title='Actualizar carrier service'>
                  <IconButton color='primary' sx={{ padding: 0 }}>
                    <BorderColorIcon sx={{ fontSize: '1.25rem' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </TableCell>
          </TableRow>
        ))}
      </GeneralTable>
      {showDetailsCarrierService && (
        <Alert
          alertTitle='Metadatos'
          alertTextButton='Cerrar'
          alertContentText={details}
          isOpen={showDetailsCarrierService}
          setIsOpen={setShowDetailsCarrierService}
        />
      )}
      {isShowUpdateAlert && (
        <ActionAlert
          actionAlertContentText=''
          actionAlertTextButton='Cerrar'
          actionAlertTitle='Actualizar carrier service'
          isOpen={isShowUpdateAlert}
          isShowPrimaryButton
          onClick={handleSubmit(onSubmit)}
          primaryButtonTextAlert='Actualizar'
          setActionsIsOpen={setIsShowUpdateAlert}
        >
          <CarrierServicesForm
            carrierServicesForm={carrierServicesForm}
            setMetaValues={setMetaValues}
          />
        </ActionAlert>
      )}
    </Box>
  )
}

export default CarrierServices
