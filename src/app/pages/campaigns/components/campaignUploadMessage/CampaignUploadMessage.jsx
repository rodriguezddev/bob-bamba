import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import { CSVLink } from 'react-csv'

const CampaignUploadMessage = ({ campaign }) => {
  const handleUnprocessedUsers = (usersErrors) => {
    const errors = Object.keys(usersErrors).map((key) => ({
      fila: key,
      error: usersErrors[key].toString(),
    }))

    return errors
  }

  return (
    <>
      <Typography component='div' variant='subtitle1'>
        {campaign?.users?.errors.length !== 0 ? (
          <b>El registro contiene errores</b>
        ) : (
          <b>
            Se le enviará un correo de confirmación para informarle que la carga
            se ha realizado correctamente
          </b>
        )}
      </Typography>
      <br />
      <Typography component='span' variant='subtitle1'>
        <b>Total de registros:&nbsp;</b>
        {campaign?.users?.rows_total || 0}
      </Typography>
      <br />
      <Typography component='span' variant='subtitle1'>
        <b>Total de procesados:&nbsp;</b>
        {campaign?.users?.processed_total || 0}
      </Typography>
      <br />
      {campaign?.users?.errors.length !== 0 && (
        <Typography color='error' component='span' variant='subtitle1'>
          <b>Con error:&nbsp;</b>
          {Object.entries(campaign?.users?.errors)?.length}
        </Typography>
      )}
      <br />
      <br />
      {campaign?.users?.errors.length !== 0 && (
        <CSVLink
          data={handleUnprocessedUsers(campaign?.users?.errors)}
          filename='user-upload-unprocessed.csv'
        >
          Ver detalle de errores
        </CSVLink>
      )}
    </>
  )
}

CampaignUploadMessage.propTypes = {
  campaign: PropTypes.shape({
    users: PropTypes.shape({
      errors: PropTypes.oneOfType([PropTypes.array, PropTypes.shape({})]),
      processed_total: PropTypes.number,
      rows_total: PropTypes.number,
    }),
  }).isRequired,
}

export default CampaignUploadMessage
