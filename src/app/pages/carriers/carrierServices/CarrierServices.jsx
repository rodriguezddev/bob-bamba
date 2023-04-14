import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Link } from '@mui/material'
import { getCarrierServices } from '../../../slices/carriers/carrierSlice'
import { GeneralTitle } from '../../../components/texts'
import { GeneralTable, TableCell, TableRow } from '../../../components/tables'
import { columns } from './components/columns'
import { MainButton } from '../../../components/buttons'
import { filters } from './components/filters'
import { MainFilter } from '../../../components/filters'
import theme from '../../../theme'
import useRowsPerPage from '../../../hooks/useRowsPerPage'

const CarrierServices = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { carrierServices } = useSelector((state) => state.carrier)
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const { rowsPerPage, handleChangeRowsPerPage } = useRowsPerPage(getCarrierServices)

  useEffect(() => {
    dispatch(getCarrierServices())
  }, [])

  const handleSearch = (path) => {
    setSearch(path)
    dispatch(getCarrierServices(path))
  }

  const handleCreateCarrierService = () => {
    navigate('/carrier-services/create')
  }

  const onPageChange = (event, newPage) => {
    dispatch(
      getCarrierServices(
        `${search ? `${search}&` : `?limit=${rowsPerPage}&`}page=${
          newPage + 1
        }`,
      ),
    )

    setPage(newPage)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle text='Carrier services' />
        <Box display='flex' flexDirection='column'>
          <MainButton
            color='primary'
            data-testid='button-create-carrierService'
            fontSize='1rem'
            height='3.75rem'
            onClick={handleCreateCarrierService}
            radius='0.62rem'
            width='18rem'
          >
            Crear carrier service
          </MainButton>
          <Box marginY={2}>
            <Link href='/carriers' underline='none'>
              <MainButton
                background={theme.palette.background.blueLight}
                color='primary'
                data-testid='button-redirect-carrier'
                fontSize='1rem'
                height='3.75rem'
                radius='0.62rem'
                type='secondary'
                width='18rem'
              >
                Ir a los carriers
              </MainButton>
            </Link>
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
        {carrierServices?.data?.map((carrierService) => (
          <TableRow key={carrierService?.id}>
            <TableCell align='left'>{carrierService?.name}</TableCell>
            <TableCell align='left'>{carrierService?.sku}</TableCell>
            <TableCell align='center'>
              {carrierService?.carrier?.name}
            </TableCell>
            <TableCell align='right'>{carrierService?.cost_per_year}</TableCell>
            <TableCell align='right'>
              {carrierService?.cost_per_month}
            </TableCell>
            <TableCell align='center'>
              {carrierService?.category?.name}
            </TableCell>
            <TableCell align='center'>
              {carrierService?.is_enabled ? 'Si' : 'No'}
            </TableCell>
          </TableRow>
        ))}
      </GeneralTable>
    </Box>
  )
}

export default CarrierServices
