import { getProductsByPartners } from '../../slices/product/productSlice'
import store from '../../store'

export const handleAvailableProducts = (products, selectedProducts) => {
  let productsValidator = []
  let productValidator = {}

  if (products) {
    products.data.forEach((product) => {
      selectedProducts.forEach((selectedProduct) => {
        if (product.sku === selectedProduct.sku) {
          productValidator = selectedProduct
        }
      })

      if (productValidator.sku !== product.sku) {
        productsValidator = [...productsValidator, product]
      }
    })
  }

  return productsValidator
}

export const handleActiveProducts = (
  selectedProducts,
  formattedProducts,
  productsByPartners,
) => {
  let newSelectedProducts = []
  let selectedProductValidator = {}

  if (
    productsByPartners.data.length !== 0
    && productsByPartners.meta.last_page === 1
  ) {
    formattedProducts.forEach((formattedProduct) => {
      if (selectedProductValidator.sku !== formattedProduct.sku) {
        newSelectedProducts = [...newSelectedProducts, formattedProduct]
      }
    })
  } else {
    newSelectedProducts = [...selectedProducts]

    formattedProducts.forEach((formattedProduct) => {
      selectedProducts.forEach((selectedProduct) => {
        if (formattedProduct.sku === selectedProduct.sku) {
          selectedProductValidator = selectedProduct
        }
      })

      if (selectedProductValidator.sku !== formattedProduct.sku) {
        newSelectedProducts = [...newSelectedProducts, formattedProduct]
      }
    })
  }

  return newSelectedProducts
}

export const handleDispatchProducts = (productsByPartners, partner) => {
  if (
    productsByPartners.meta.current_page !== productsByPartners.meta.last_page
  ) {
    Array(productsByPartners.meta.last_page).join(
      store.dispatch(
        getProductsByPartners({
          partner,
          page: `&page=${productsByPartners.meta.current_page + 1}`,
        }),
      ),
    )
  }
}

export const handleProductsFormat = (productsByPartners, partner) => {
  let newProductByPartner = []

  productsByPartners.data.forEach((productByPartner) => {
    const partnerIndex = productByPartner.prices.find(
      (partnerByPrice) => partnerByPrice.partner === partner,
    )

    if (partnerIndex) {
      newProductByPartner = [
        ...newProductByPartner,
        {
          sku: productByPartner.sku,
          currency_code: partnerIndex.currency_code,
          price: partnerIndex.price,
          isShowButton: false,
        },
      ]
    }
  })

  return newProductByPartner
}
