/// <reference types="cypress" />

describe('Create product view', () => {
  it('Show create product page', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Productos"]').should(
      'contain',
      'Productos',
    )
    cy.get('[data-testid="drawer-item-Productos"]').first().click()
    cy.get('[data-testid="button-create-product"]').click()
    cy.get('[data-testid="title-create-product"]').should(
      'contain',
      'Crear producto',
    )
  })

  it('Show errors validations form', () => {
    cy.get('[data-testid="create-product-button"]').click()
    cy.get('[data-testid="error-message-name-product"]').should(
      'contain',
      'El nombre del producto es requerido',
    )
    cy.get('[data-testid="error-message-product"]').should(
      'contain',
      'El SKU es requerido',
    )
    cy.get('[data-testid="error-message-expiration-period-product"]').should(
      'contain',
      'El tipo de expiración es requerido',
    )
    cy.get('[data-testid="error-message-expiration-unit-product"]').should(
      'contain',
      'El periodo de expiración es requerido',
    )
  })

  it('Remove errors form', () => {
    cy.get('#name-product').type('prueba')
    cy.get('[data-testid="error-message-name-product"]').should(
      'not.have.value',
      'El nombre es requerido',
    )
    cy.get('#sku-product').type('producto-a')
    cy.get('[data-testid="error-message-product"]').should(
      'not.have.value',
      'El sku es requerido',
    )
    cy.get('#expiration-period-product').click()
    cy.get('[data-value="ANNUAL"]').click()
    cy.get('[data-testid="error-message-expiration-period-product"]').should(
      'not.have.value',
      'El tipo de expiración es requerido',
    )
    cy.get('#expiration-unit-product').click()
    cy.get('[data-value="1"]').click()
    cy.get('[data-testid="error-message-expiration-unit-product"]').should(
      'not.have.value',
      'El periodo de expiración es requerido',
    )
    cy.get('#category-product').click()
    cy.get('[data-value="931b7435-403d-439f-90c3-d6ee8d11de84"]').click()
    cy.get('[data-testid="error-message-category-product"]').should(
      'not.have.value',
      'La categoría es requerida',
    )
  })

  it('show error empty carrier', () => {
    cy.get('[data-testid="create-product-button"]').click()
    cy.get('[data-testid="error-message-carrier-services"]').should(
      'contain',
      'Debe asignar carrier services',
    )
  })

  it('show dialog carrier services', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Productos"]').should(
      'contain',
      'Productos',
    )
    cy.get('[data-testid="drawer-item-Productos"]').first().click()
    cy.get('[data-testid="button-create-product"]').click()
    cy.get('[data-testid="title-create-product"]').should(
      'contain',
      'Crear producto',
    )
    cy.get(':nth-child(4) > .MuiBox-root > .MuiButtonBase-root').click()
    cy.get('#alert-dialog-description').should(
      'contain',
      'Elige uno o mas carrier services para asignar a producto',
    )
  })
})
