import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Box, Grid, IconButton, Tooltip,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Avatar } from '../../components/avatar'
import { GeneralTitle } from '../../components/texts'
import { GeneralTable, TableCell, TableRow } from '../../components/tables'
import { columns } from './components/columns'
import { getUsers } from '../../slices/user/userSlice'
import { MainFilter } from '../../components/filters'
import { filters } from './components/filters'
import useRowsPerPage from '../../hooks/useRowsPerPage'
import { MainButton } from '../../components/buttons'

const Users = () => {
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { users } = useSelector((state) => state.user)
  const { rowsPerPage, handleChangeRowsPerPage } = useRowsPerPage(getUsers)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const handleSearch = (path) => {
    setSearch(path)
    dispatch(getUsers(path))
  }

  const onPageChange = (event, newPage) => {
    dispatch(
      getUsers(
        `${search ? `${search}&` : `?limit=${rowsPerPage}&`}page=${
          newPage + 1
        }`,
      ),
    )
    setPage(newPage)
  }

  const handleUserDetails = (userId) => {
    navigate(`/users/details/${userId}`)
  }

  const handleCreateUser = () => {
    navigate('/users/create')
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle data-testid='title-users' text='Usuarios' />
        <MainButton
          color='primary'
          data-testid='button-create-user'
          fontSize='0.85rem'
          height='3rem'
          onClick={handleCreateUser}
          radius='0.62rem'
          width='15rem'
        >
          Crear Usuarios
        </MainButton>
      </Box>
      <MainFilter fieldDetails={filters} handleSearch={handleSearch} />
      <GeneralTable
        columns={columns}
        count={users?.meta?.total ?? 0}
        onPageChange={onPageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        SelectProps={{
          native: true,
        }}
      >
        {users?.data?.map((user) => (
          <TableRow key={user?.id}>
            <TableCell align='center'>
              <Box display='flex' sx={{ justifyContent: 'left' }}>
                <Avatar gender={user?.gender} />
                <Box mt={2} ml='1.5rem'>
                  {user?.name}
                  {' '}
                  {user?.lastname}
                  {' '}
                  {user?.second_lastname}
                </Box>
              </Box>
            </TableCell>
            <TableCell align='left'>{user?.email}</TableCell>
            <TableCell align='center'>{user?.tax_id ?? '-'}</TableCell>
            <TableCell align='center'>{user?.personal_id ?? '-'}</TableCell>
            <TableCell align='center'>{user?.birthdate}</TableCell>
            <TableCell align='center'>{user?.partner?.name}</TableCell>
            <TableCell align='center'>
              <Grid
                alignItems='center'
                container
                direction='row'
                justifyContent='center'
                spacing={4}
              >
                <Grid item onClick={() => handleUserDetails(user?.id)}>
                  <Tooltip title='Ver detalles'>
                    <IconButton
                      color='primary'
                      data-testid={`icon-button-${user?.tax_id}`}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        ))}
      </GeneralTable>
    </Box>
  )
}

export default Users
