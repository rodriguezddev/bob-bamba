import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { GeneralTitle } from '../../components/texts'
import { MainButton } from '../../components/buttons'
import { getAdminsPartnerUsers } from '../../slices/adminPartnerUsers/adminPartnerUsersSlice'
import useRowsPerPage from '../../hooks/useRowsPerPage'
import { MainFilter } from '../../components/filters'
import { filters } from './components/filters'
import { GeneralTable, TableCell, TableRow } from '../../components/tables'
import { columns } from './components/columns'
import { getTypePartner } from '../../utils/UtilsTranslate'

const AdminPartnerUsers = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { adminPartnerUsers } = useSelector((state) => state.adminPartnerUser)
  const {
    rowsPerPage,
    handleChangeRowsPerPage,
    handleSearch,
    page,
    onPageChange,
  } = useRowsPerPage(getAdminsPartnerUsers, dispatch)

  useEffect(() => {
    dispatch(getAdminsPartnerUsers())
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle text='Usuarios admin partners' />
        <MainButton
          color='primary'
          data-testid='button-create-admin'
          fontSize='0.85rem'
          height='3rem'
          onClick={() => navigate('/admin-partner-users/create')}
          radius='0.62rem'
          width='15rem'
        >
          Crear admin
        </MainButton>
      </Box>
      <MainFilter fieldDetails={filters} handleSearch={handleSearch} />
      <GeneralTable
        columns={columns}
        count={adminPartnerUsers?.meta?.total ?? 0}
        onPageChange={onPageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        SelectProps={{
          native: true,
        }}
      >
        {adminPartnerUsers?.data?.map((adminPartnerUser) => (
          <TableRow key={adminPartnerUser.id}>
            <TableCell align='left'>
              {`${adminPartnerUser?.name} ${
                adminPartnerUser?.lastname
              } ${adminPartnerUser?.second_lastname || ''}`}
            </TableCell>
            <TableCell align='left'>{adminPartnerUser?.email}</TableCell>
            <TableCell align='left'>
              <Typography noWrap paragraph variant='caption'>
                {`Nombre: ${adminPartnerUser?.partner.name}`}
                <br />
                {`Código: ${adminPartnerUser?.partner.code}`}
                <br />
                {`Tipo: ${getTypePartner(adminPartnerUser?.partner.type)}`}
                <br />
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </GeneralTable>
    </Box>
  )
}

export default AdminPartnerUsers
