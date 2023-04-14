import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { Pagination } from '../../../../components/tables'
import { handleAvailableProducts } from '../../../../utils/utilsActiveProducts'
import { getCarrierServices } from '../../../../slices/carriers/carrierSlice'

const CarriesServicesContainer = ({ assignedCarriesServices, carriers }) => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const { carrierServices } = useSelector((state) => state.carrier)
  const [carrierServicesAvailable, setCarrieServicesAvailable] = useState([])
  const [selectedCarriesServices, setSelectedCarrieServices] = useState(carriers)

  useEffect(() => {
    dispatch(getCarrierServices())
  }, [])

  useEffect(() => {
    if (carrierServices) {
      setCarrieServicesAvailable(
        handleAvailableProducts(carrierServices, selectedCarriesServices),
      )
    }
  }, [carrierServices])

  const onPageChange = async (event, newPage) => {
    await dispatch(getCarrierServices(`?page=${newPage + 1}`))
    setPage(newPage)
  }

  const handleUnSelectedCarriers = (value) => {
    const unSelectedCarriers = selectedCarriesServices.filter(
      (item) => item.sku !== value.sku,
    )

    const returnedCarriers = [...carrierServicesAvailable, value]

    setSelectedCarrieServices(unSelectedCarriers)
    setCarrieServicesAvailable(returnedCarriers)
    assignedCarriesServices(unSelectedCarriers)
  }

  const handleCarrierServices = (value) => {
    const filteredCarrierServices = carrierServicesAvailable.filter(
      (item) => item.sku !== value.sku,
    )
    const carrierServiceCandidates = [...selectedCarriesServices, value]

    setSelectedCarrieServices(carrierServiceCandidates)
    setCarrieServicesAvailable(filteredCarrierServices)
    assignedCarriesServices(carrierServiceCandidates)
  }

  return (
    <Box>
      <Typography
        data-testid='carriers-available'
        sx={{
          fontWeight: 600,
          paddingTop: '1.5rem',
        }}
      >
        Carrier services disponibles
      </Typography>
      <Grid container direction='row' justifyContent='center' spacing={2}>
        <Grid item xs={6}>
          <Grid>
            <Box
              sx={{
                height: '30rem',
                overflowY: 'scroll',
                padding: '1rem',
              }}
            >
              {carrierServicesAvailable.map((value) => (
                <Card
                  key={value?.sku}
                  sx={{
                    margin: '.5rem 0',
                    maxWidth: '27rem',
                  }}
                >
                  <ListItemButton onClick={() => handleCarrierServices(value)}>
                    <CardContent>
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
            <Pagination
              count={carrierServices?.meta?.total ?? 0}
              labelDisplayedRows={() => ''}
              onPageChange={onPageChange}
              page={page}
              rowsPerPage={10}
              SelectProps={{
                native: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            height: '30rem',
            overflowY: 'auto',
            padding: '1rem',
          }}
        >
          {selectedCarriesServices.length === 0 ? (
            <Grid
              alignItems='center'
              container
              direction='row'
              height='25rem'
              justifyContent='center'
            >
              <Typography
                sx={{
                  textAlign: 'center',
                }}
              >
                Aquí se mostraran los carries services seleccionados
              </Typography>
            </Grid>
          ) : (
            selectedCarriesServices.map((selectedCarrierService) => (
              <Card
                key={selectedCarrierService.sku}
                sx={{
                  cursor: 'pointer',
                  margin: '.5rem 0',
                  maxWidth: '27rem',
                }}
              >
                <CardContent>
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
                        {selectedCarrierService.name}
                      </Typography>
                    </Grid>
                    <Grid
                      data-testid='remove-carrier-service-button'
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleUnSelectedCarriers(selectedCarrierService)}
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

CarriesServicesContainer.propTypes = {
  assignedCarriesServices: PropTypes.func.isRequired,
  carriers: PropTypes.arrayOf(PropTypes.shape({})),
}

CarriesServicesContainer.defaultProps = {
  carriers: [],
}

export default CarriesServicesContainer
