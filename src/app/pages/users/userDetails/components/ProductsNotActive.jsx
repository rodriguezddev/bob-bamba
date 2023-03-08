import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, Grid } from '@mui/material'
import { GeneralTitle } from '../../../../components/texts'
import theme from '../../../../theme'
import { getProductsNotActive } from '../../../../slices/product/productSlice'

const ProductsNotActive = ({ userId }) => {
  const dispatch = useDispatch()
  const { productsNotActive } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(getProductsNotActive(userId))
  }, [])

  return (
    <Box>
      {productsNotActive?.data.length !== 0 && (
        <Grid marginTop='5rem'>
          <GeneralTitle
            data-testid='subscriptions-title'
            lineHeight='.5rem'
            text='Productos sin contratar'
          />
          <GeneralTitle
            fontSize='1rem'
            fontWeight='200'
            text={`${productsNotActive?.data.length} productos`}
          />
          <Card
            sx={{
              bgcolor: theme.palette.background.blueLight,
              margin: '1rem 0',
            }}
          >
            <Grid container display='flex' spacing={2} sx={{ padding: '2rem' }}>
              {productsNotActive?.data.map((product) => (
                <Grid key={product.id} item xs={4}>
                  <Card
                    sx={{
                      height: '100%',
                    }}
                  >
                    <CardContent>{product.name}</CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      )}
    </Box>
  )
}

ProductsNotActive.propTypes = {
  userId: PropTypes.string.isRequired,
}

export default ProductsNotActive
