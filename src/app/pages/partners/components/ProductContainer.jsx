import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Grid,
  Box,
  Typography,
  CardContent,
  Card,
  ListItemButton,
} from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import FormAlert from './FormAlert/FormAlert'
import { Pagination } from '../../../components/tables'
import {
  getProducts,
  getProductsByPartners,
} from '../../../slices/product/productSlice'
import {
  handleActiveProducts,
  handleAvailableProducts,
  handleDispatchProducts,
  handleProductsFormat,
} from '../../../utils/utilsActiveProducts'

const ProductContainer = ({ assignedProducts, partner }) => {
  const dispatch = useDispatch()
  const [pageProducts, setPageProducts] = useState(0)
  const { products, productsByPartners } = useSelector((state) => state.product)
  const [productsAvailable, setProductsAvailable] = useState([])
  const [product, setProduct] = useState({})
  const [selectedProducts, setSelectedProducts] = useState([])
  const [showActionAlert, setShowActionAlert] = useState(false)

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getProductsByPartners({ partner, limit: '&limit=100' }))
  }, [])

  useEffect(() => {
    if (products) {
      setProductsAvailable(handleAvailableProducts(products, selectedProducts))
    }
  }, [products])

  useEffect(() => {
    const formattedProducts = handleProductsFormat(productsByPartners, partner)

    handleDispatchProducts(productsByPartners, partner)

    setProductsAvailable(
      handleAvailableProducts(
        products,
        handleActiveProducts(
          selectedProducts,
          formattedProducts,
          productsByPartners,
        ),
      ),
    )

    setSelectedProducts(
      handleActiveProducts(
        selectedProducts,
        formattedProducts,
        productsByPartners,
      ),
    )

    assignedProducts(selectedProducts)
  }, [productsByPartners])

  const onPageChange = async (event, newPage) => {
    await dispatch(getProducts(`?page=${newPage + 1}`))
    setPageProducts(newPage)
  }

  const handleSelectedProducts = (value) => {
    const filteredProduct = productsAvailable.filter(
      (item) => item.sku !== value.sku,
    )
    const productCandidates = [...selectedProducts, value]

    setSelectedProducts(productCandidates)
    setProductsAvailable(filteredProduct)
    assignedProducts(productCandidates)
  }

  const handleUnSelectedProduct = (value) => {
    const unSelectedProduct = selectedProducts.filter(
      (item) => item.sku !== value.sku,
    )

    const returnedProducts = [...productsAvailable, value]

    setProductsAvailable(returnedProducts)
    setSelectedProducts(unSelectedProduct)
    assignedProducts(unSelectedProduct)
  }

  const handlePartner = (value) => {
    setProduct(value)
    setShowActionAlert(true)
  }

  return (
    <Box>
      <Typography
        data-testid='products-available'
        sx={{
          paddingTop: '1.5rem',
          fontWeight: 600,
        }}
      >
        Productos disponibles
      </Typography>
      <Grid container direction='row' justifyContent='center' spacing={2}>
        <Grid item xs={6}>
          <Grid>
            <Box
              sx={{
                overflowY: 'scroll',
                padding: '1rem',
                height: '30rem',
              }}
            >
              {productsAvailable.length === 0 ? (
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
                    Ya están asignados los productos de esta pagina, ve a la
                    siguiente
                  </Typography>
                </Grid>
              ) : (
                productsAvailable.map((value) => (
                  <Card
                    data-testid={`card-${value?.sku}`}
                    key={value?.sku}
                    sx={{
                      margin: '.5rem 0',
                      maxWidth: '27rem',
                    }}
                  >
                    <ListItemButton onClick={() => handlePartner(value)}>
                      <CardContent>
                        <Typography
                          sx={{
                            margin: '.5rem',
                          }}
                        >
                          {value.sku}
                        </Typography>
                      </CardContent>
                    </ListItemButton>
                  </Card>
                ))
              )}
            </Box>
            <Pagination
              count={products?.meta?.total ?? 0}
              labelDisplayedRows={() => ''}
              onPageChange={onPageChange}
              page={pageProducts}
              rowsPerPage={10}
              SelectProps={{
                native: true,
              }}
            />
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Box
            sx={{
              height: '30rem',
              overflowY: 'auto',
              padding: '1rem',
            }}
          >
            {selectedProducts.length === 0 ? (
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
                  Aquí se mostraran los productos seleccionados
                </Typography>
              </Grid>
            ) : (
              selectedProducts.map((selectedProduct) => (
                <Card
                  key={selectedProduct.sku}
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
                          {selectedProduct.sku}
                          -
                          {selectedProduct.price}
                          {selectedProduct.currency_code}
                        </Typography>
                      </Grid>
                      <Grid
                        data-testid='remove-product-button'
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleUnSelectedProduct(selectedProduct)}
                      >
                        <HighlightOffIcon />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))
            )}
          </Box>
        </Grid>
      </Grid>
      {showActionAlert && (
        <FormAlert
          alertContentText='Agregue el precio para este producto'
          alertTextButton='Cerrar'
          alertTitle='Precio del producto'
          isOpen={showActionAlert}
          isShowPrimaryButton
          primaryButtonTextAlert='Agregar'
          product={product}
          setIsOpen={setShowActionAlert}
          selectedProducts={(e) => {
            handleSelectedProducts(e)
          }}
        />
      )}
    </Box>
  )
}

ProductContainer.propTypes = {
  assignedProducts: PropTypes.func.isRequired,
  partner: PropTypes.string.isRequired,
}

export default ProductContainer
