import React, { useEffect, useState } from 'react'
import {
  Box, Grid, MenuItem, Typography,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { SelectInput } from '../../../../components/inputs'
import { GeneralTitle } from '../../../../components/texts'
import UploadUsersCampaignButton from '../uploadUsersCampaignButton'
import { getPartners } from '../../../../slices/partner/partnerSlice'
import useRowsPerPage from '../../../../hooks/useRowsPerPage'
import { Pagination } from '../../../../components/tables'

const AssignUsersContainer = ({ assignUsers, setUserFile }) => {
  const dispatch = useDispatch()
  const { partners } = useSelector((state) => state.partner)
  const [file, setFile] = useState('')
  const { control } = assignUsers
  const selectRowsPerPage = 100
  const { page, onPageChange } = useRowsPerPage(
    getPartners,
    dispatch,
    selectRowsPerPage,
  )

  useEffect(() => {
    dispatch(getPartners('?limit=100'))
  }, [])

  useEffect(() => {
    if (file) {
      setUserFile(file)
    }
  }, [file])

  return (
    <Box alignItems='center' display='flex' flexDirection='column'>
      <Grid item lg={4} md={6} mt={3} xs={12}>
        <Grid container flexDirection='column'>
          <UploadUsersCampaignButton setUserFile={setFile} />
          {file !== '' && (
            <Typography marginTop='1rem' textAlign='center' variant='caption'>
              *Tienes 1 archivo cargado*
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid item lg={4} md={6} my='1rem' xs={12}>
        <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Partner*' />
        <Controller
          control={control}
          defaultValue=''
          name='partnerId'
          rules={{
            required: 'El nombre del partner es requerido',
          }}
          render={({
            field: { onChange, value },
            fieldState: { error: errorInput },
          }) => (
            <Grid container flexDirection='column' marginTop='.5rem'>
              <SelectInput
                error={!!errorInput}
                id='partnerId'
                onChange={onChange}
                value={value}
              >
                <MenuItem value=''>Seleccionar</MenuItem>
                {partners?.data?.map((partner) => (
                  <MenuItem key={partner?.id} value={`${partner?.id}`}>
                    {partner?.name}
                  </MenuItem>
                ))}
                <Grid container display='flex' alignItems='center'>
                  <Pagination
                    count={partners?.meta?.total ?? 0}
                    labelDisplayedRows={() => ''}
                    onPageChange={onPageChange}
                    page={page}
                    rowsPerPage={selectRowsPerPage}
                    rowsPerPageOptions={[0]}
                    SelectProps={{
                      native: true,
                    }}
                  />
                </Grid>
              </SelectInput>
              <Typography
                color='error.main'
                data-testid='error-message-partnerId-campaigns'
                mt={1}
                variant='caption'
              >
                {errorInput?.message}
              </Typography>
            </Grid>
          )}
        />
      </Grid>
    </Box>
  )
}

AssignUsersContainer.propTypes = {
  assignUsers: PropTypes.shape().isRequired,
  setUserFile: PropTypes.func.isRequired,
}

export default AssignUsersContainer
