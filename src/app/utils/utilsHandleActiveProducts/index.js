export const handleActiveProducts = (products, selectedProducts) => {
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
