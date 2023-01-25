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
    cy.get('.MuiBox-root > .MuiButtonBase-root').click()
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
    cy.get('[data-testid="error-message-carrier-service-product"]').should(
      'contain',
      'El producto de la aseguradora es requerido',
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
      'El apellido es requerido',
    )
    cy.get('#expiration-period-product').select('ANNUAL')
    cy.get('[data-testid="error-message-expiration-period-product"]').should(
      'not.have.value',
      'El tipo de expiración es requerido',
    )
    cy.get('#expiration-unit-product').select('1')
    cy.get('[data-testid="error-message-expiration-unit-product"]').should(
      'not.have.value',
      'El periodo de expiración es requerido',
    )
    cy.get('#carrier-service-product').select(
      'cb58d91f-be3d-4f0f-91b7-1877a19e2270',
    )
    cy.get('[data-testid="error-message-carrier-service-product"]').should(
      'not.have.value',
      'El producto de la aseguradora es requerido',
    )
    cy.get('#category-product').select('504b73dc-1073-492f-b9ee-975fa8c31f62')
    cy.get('[data-testid="error-message-category-product"]').should(
      'not.have.value',
      'La categoria es requerida',
    )
  })
})
