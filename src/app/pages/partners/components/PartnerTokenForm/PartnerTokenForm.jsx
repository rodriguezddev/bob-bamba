import React from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import DeleteIcon from '../../../../assets/images/icons/delete.svg'
import { GeneralTitle } from '../../../../components/texts'
import { SelectInput } from '../../../../components/inputs'

const PartnerTokenForm = ({
  partner,
  tokenPartnerForm,
  handleCancelDialog,
}) => {
  const { control } = tokenPartnerForm

  return (
    <Box display='flex' flexDirection='column' justifyContent='center'>
      {partner?.oauth_clients?.length !== 0 && (
        <Box>
          <Typography fontWeight='Bold' mb={2}>
            Tokens activos:
          </Typography>
          {partner?.oauth_clients?.map((oauthClient) => (
            <Grid container key={oauthClient?.id} mb={3} spacing={0}>
              <Grid item sm={12}>
                <Typography fontWeight='Bold'>
                  Tipo:&nbsp;
                  <Typography component='span'>
                    {`${oauthClient?.type}`}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography fontWeight='Bold'>
                  Id:&nbsp;
                  <Typography component='span'>
                    {`${
                      oauthClient?.type !== 'PASSWORD'
                        ? oauthClient?.id
                        : 'No es posible mostrar los datos tipo password'
                    }`}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography fontWeight='Bold'>
                  Secret:&nbsp;
                  <Typography component='span'>
                    {`${
                      oauthClient?.type !== 'PASSWORD'
                        ? oauthClient?.secret
                        : 'No es posible mostrar los datos tipo password'
                    }`}
                  </Typography>
                </Typography>
              </Grid>
              <Grid
                item
                mt={1}
                sm={12}
                onClick={() => handleCancelDialog(oauthClient)}
              >
                <Tooltip title='Eliminar token'>
                  <IconButton
                    color='primary'
                    sx={{ padding: 0 }}
                    data-testid={`icon-button-${partner.name}`}
                  >
                    <img alt='delete' height={20} src={DeleteIcon} width={20} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          ))}
        </Box>
      )}
      {partner?.oauth_clients?.length < 2 && (
        <>
          <Box mb={2}>
            <GeneralTitle fontSize='1rem' text='Crear Token' />
          </Box>
          <Grid item lg={4} mb={2} md={6} xs={12}>
            <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Tipo *' />
            <Controller
              control={control}
              defaultValue=''
              name='type'
              rules={{
                required: 'El Tipo es requerido',
              }}
              render={({
                field: { onChange, value },
                fieldState: { error: errorInput },
              }) => (
                <Grid
                  container
                  flexDirection='column'
                  marginTop='.5rem'
                  width='16rem'
                >
                  <SelectInput
                    error={!!errorInput}
                    id='type'
                    onChange={onChange}
                    value={value}
                  >
                    <MenuItem value=''>Seleccionar</MenuItem>
                    <MenuItem value='CLIENT'>Cliente</MenuItem>
                    <MenuItem value='PASSWORD'>Password</MenuItem>
                  </SelectInput>
                  <Typography
                    color='error.main'
                    data-testid='error-message-expiration-period-product'
                    mt={1}
                    variant='caption'
                  >
                    {errorInput?.message}
                  </Typography>
                </Grid>
              )}
            />
          </Grid>
        </>
      )}
    </Box>
  )
}

PartnerTokenForm.propTypes = {
  handleCancelDialog: PropTypes.func.isRequired,
  partner: PropTypes.shape({
    name: PropTypes.string,
    oauth_clients: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  tokenPartnerForm: PropTypes.shape().isRequired,
}

PartnerTokenForm.defaultProps = {
  partner: {
    name: '',
    oauth_clients: [],
  },
}

export default PartnerTokenForm
