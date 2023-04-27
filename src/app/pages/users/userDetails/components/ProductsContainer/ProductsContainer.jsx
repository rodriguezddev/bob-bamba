import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Box,
  CardContent,
  Card,
  ListItemButton,
  Typography,
} from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { handleAvailableProducts } from '../../../../../utils/utilsActiveProducts'

const ProductsContainer = ({
  assignedSubscriptions,
  initialSubscriptions,
  subscriptions,
}) => {
  const [subscriptionsAvailable, setSubscriptionsAvailable] = useState([])
  const [selectedSubscriptions, setSelectedSubscriptions] = useState(initialSubscriptions)

  useEffect(() => {
    if (subscriptions) {
      setSubscriptionsAvailable(
        handleAvailableProducts(subscriptions, selectedSubscriptions),
      )
    }
  }, [subscriptions])

  const handleUnSelectedSubscriptions = (value) => {
    const unSelectedSubscription = selectedSubscriptions.filter(
      (item) => item.sku !== value.sku,
    )

    const returnedSubscriptions = [...subscriptionsAvailable, value]

    setSelectedSubscriptions(unSelectedSubscription)
    setSubscriptionsAvailable(returnedSubscriptions)
    assignedSubscriptions(unSelectedSubscription)
  }

  const handleSubscriptions = (value) => {
    const filteredSubscriptions = subscriptionsAvailable.filter(
      (item) => item.sku !== value.sku,
    )
    const subscriptionsCandidates = [...selectedSubscriptions, value]

    setSelectedSubscriptions(subscriptionsCandidates)
    setSubscriptionsAvailable(filteredSubscriptions)
    assignedSubscriptions(subscriptionsCandidates)
  }

  return (
    <Box>
      <Typography
        data-testid='subscriptions-available'
        sx={{
          fontWeight: 600,
          paddingTop: '1.5rem',
        }}
      >
        Productos disponibles
      </Typography>
      <Grid container direction='row' justifyContent='center' spacing={2}>
        <Grid item xs={6}>
          <Grid>
            <Box
              sx={{
                height: '18rem',
                overflowY: 'auto',
                padding: '1rem',
              }}
            >
              {subscriptionsAvailable.map((value) => (
                <Card
                  key={value?.sku}
                  sx={{
                    margin: '.5rem 0',
                    maxWidth: '24.5rem',
                  }}
                >
                  <ListItemButton onClick={() => handleSubscriptions(value)}>
                    <CardContent
                      sx={{
                        padding: '0.5rem',
                      }}
                    >
                      <Typography
                        sx={{
                          margin: '.5rem',
                        }}
                      >
                        {value.name}
                      </Typography>
                    </CardContent>
                  </ListItemButton>
                </Card>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            height: '18rem',
            overflowY: 'auto',
            padding: '1rem',
          }}
        >
          {selectedSubscriptions.length === 0 ? (
            <Grid
              alignItems='center'
              container
              direction='row'
              height='15rem'
              justifyContent='center'
            >
              <Typography
                sx={{
                  textAlign: 'center',
                }}
              >
                Aquí se mostraran las suscripciones seleccionadas
              </Typography>
            </Grid>
          ) : (
            selectedSubscriptions.map((selectedSubscription) => (
              <Card
                key={selectedSubscription.sku}
                sx={{
                  cursor: 'pointer',
                  margin: '.5rem 0',
                  maxWidth: '24.5rem',
                }}
              >
                <CardContent
                  sx={{
                    padding: '0.5rem',
                  }}
                >
                  <Grid
                    container
                    direction='row'
                    justifyContent='space-between'
                  >
                    <Grid item xs={8}>
                      <Typography
                        sx={{
                          margin: '.5rem',
                        }}
                      >
                        {selectedSubscription.name}
                      </Typography>
                    </Grid>
                    <Grid
                      data-testid='remove-subscription-service-button'
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleUnSelectedSubscriptions(selectedSubscription)}
                    >
                      <HighlightOffIcon />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

ProductsContainer.propTypes = {
  assignedSubscriptions: PropTypes.func.isRequired,
  initialSubscriptions: PropTypes.arrayOf(PropTypes.shape({})),
  subscriptions: PropTypes.shape({}),
}

ProductsContainer.defaultProps = {
  initialSubscriptions: [],
  subscriptions: {},
}

export default ProductsContainer
