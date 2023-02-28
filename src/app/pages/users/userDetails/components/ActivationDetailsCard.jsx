import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Grid } from '@mui/material'
import { GeneralTitle } from '../../../../components/texts'

const ActivationDetailsCard = ({
  activationDate,
  activationType,
  nextActivation,
}) => (
  <Card
    sx={{
      marginTop: '1rem',
    }}
  >
    <CardContent>
      <Grid container>
        <Grid alignItems='center' container direction='row' item xs={4}>
          <GeneralTitle
            fontSize='1rem'
            lineHeight='1rem'
            marginRight='.5rem'
            text='Fecha de activación:'
            xs={6}
          />
          <GeneralTitle
            fontSize='1rem'
            fontWeight='200'
            lineHeight='1rem'
            text={activationDate}
            xs={6}
          />
        </Grid>
        <Grid alignItems='center' container direction='row' item xs={4}>
          <GeneralTitle
            fontSize='1rem'
            lineHeight='1rem'
            marginRight='.5rem'
            text='Tipo de renovación:'
            xs={5}
          />
          <GeneralTitle
            fontSize='1rem'
            fontWeight='200'
            lineHeight='1rem'
            text={activationType}
            xs={5}
          />
        </Grid>
        <Grid alignItems='center' container direction='row' item xs={4}>
          <GeneralTitle
            fontSize='1rem'
            lineHeight='1rem'
            marginRight='.5rem'
            text='Siguiente renovación:'
            xs={5}
          />
          <GeneralTitle
            fontSize='1rem'
            lineHeight='1rem'
            fontWeight='200'
            text={nextActivation}
            xs={5}
          />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)

ActivationDetailsCard.propTypes = {
  activationDate: PropTypes.string.isRequired,
  activationType: PropTypes.string.isRequired,
  nextActivation: PropTypes.string.isRequired,
}

export default ActivationDetailsCard
