import React, { useEffect, useState } from 'react'
import {
  Grid, IconButton, TableCell, TableRow, Tooltip,
} from '@mui/material'
import { Box } from '@mui/system'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BackButton, MainButton } from '../../../components/buttons'
import { MainFilter } from '../../../components/filters'
import { GeneralTable } from '../../../components/tables'
import { GeneralTitle } from '../../../components/texts'
import { getCarriers } from '../../../slices/carriers/carrierSlice'
import { columns } from './components/columns'
import { filters } from './components/filters'
import CarrierForm from './components/CarrierForm'
import { ActionAlert } from '../../../components/modals'
import useRowsPerPage from '../../../hooks/useRowsPerPage'

const Carriers = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { carriers } = useSelector((state) => state.carrier)
  const [isShowUpdateAlert, setIsShowUpdateAlert] = useState(false)
  const [carrierToUpdate, setCarrierToUpdate] = useState({})
  const [isShowConfirmAlert, setIsShowConfirmAlert] = useState(false)
  const {
    rowsPerPage,
    handleChangeRowsPerPage,
    handleSearch,
    page,
    onPageChange,
  } = useRowsPerPage(getCarriers, dispatch)

  useEffect(() => {
    dispatch(getCarriers())
  }, [])

  const handleCreateCarrier = () => {
    navigate('/carriers/create')
  }

  const handleAlertUpdate = (carrier) => {
    setCarrierToUpdate(carrier)
    setIsShowUpdateAlert(true)
  }

  const handleUpdatedCarrier = () => {
    setIsShowConfirmAlert(true)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <BackButton />
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle text='Carriers' />
        <MainButton
          color='primary'
          data-testid='button-create-carrier'
          fontSize='0.85rem'
          height='3rem'
          onClick={handleCreateCarrier}
          radius='0.62rem'
          width='15rem'
        >
          Crear carrier
        </MainButton>
      </Box>
      <MainFilter fieldDetails={filters} handleSearch={handleSearch} />
      <GeneralTable
        columns={columns}
        count={carriers?.meta?.total ?? 0}
        onPageChange={onPageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        SelectProps={{
          native: true,
        }}
      >
        {carriers?.data?.map((carrier) => (
          <TableRow key={carrier?.id}>
            <TableCell align='left'>{carrier?.name}</TableCell>
            <TableCell align='left'>{carrier?.code}</TableCell>
            <TableCell align='center'>
              {carrier?.is_enabled ? 'Si' : 'No'}
            </TableCell>
            <TableCell align='center'>
              <Grid
                alignItems='center'
                container
                direction='row'
                justifyContent='center'
                spacing={4}
              >
                <Grid item onClick={() => handleAlertUpdate(carrier)}>
                  <Tooltip title='Actualizar carrier'>
                    <IconButton color='primary'>
                      <BorderColorIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        ))}
      </GeneralTable>
      {isShowUpdateAlert && (
        <ActionAlert
          actionAlertContentText='LLena los campos para editar el carrier seleccionado'
          actionAlertTextButton='Cerrar'
          actionAlertTitle={`Actualizar el carrier ${carrierToUpdate.name}`}
          isOpen={isShowUpdateAlert}
          isShowPrimaryButton
          onClick={handleUpdatedCarrier}
          primaryButtonTextAlert='Actualizar'
          setActionsIsOpen={setIsShowUpdateAlert}
        >
          <CarrierForm
            carrierId={carrierToUpdate.id}
            isShowConfirmAlert={isShowConfirmAlert}
            setIsShowConfirmAlert={setIsShowConfirmAlert}
            setIsShowUpdateAlert={setIsShowUpdateAlert}
          />
        </ActionAlert>
      )}
    </Box>
  )
}

export default Carriers
