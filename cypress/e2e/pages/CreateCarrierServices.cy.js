/// <reference types="cypress" />

describe('Create carrier services view', () => {
  it('Show create product page', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Carriers"]').should('contain', 'Carriers')
    cy.get('[data-testid="drawer-item-Carriers"]').first().click()
    cy.get('[data-testid="button-create-carrierService"]').click()
    cy.get('[data-testid="title-create-carrierService"]').should(
      'contain',
      'Crear carrier services',
    )
  })

  it('Show errors validations form', () => {
    cy.get('[data-testid="AddIcon"]').click()
    cy.get('[data-testid="create-carrierService-button"]').click()
    cy.get('[data-testid="error-message-name-carrierService"]').should(
      'contain',
      'El nombre del carrier service es requerido',
    )
    cy.get('[data-testid="error-message-sku-carrierService"]').should(
      'contain',
      'El SKU es requerido',
    )
    cy.get('[data-testid="error-message-cost-per-year-carrierService"]').should(
      'contain',
      'El costo por año es requerido',
    )
    cy.get(
      '[data-testid="error-message-cost-per-month-carrierService"]',
    ).should('contain', 'El costo por mes es requerido')
    cy.get('[data-testid="error-message-carrier-carrierService"]').should(
      'contain',
      'El carrier es requerido',
    )
    cy.get('[data-testid="error-message-category-carrierService"]').should(
      'contain',
      'La categoría es requerida',
    )
    cy.get('[data-testid="error-message-carrier-carrierService"]').should(
      'contain',
      'El carrier es requerido',
    )
    cy.get('[data-testid="error-message-name-key"]').should(
      'contain',
      'El campo no puede estar vació',
    )
    cy.get('[data-testid="error-message-name-value"]').should(
      'contain',
      'El campo no puede estar vació',
    )
  })

  it('Remove errors form', () => {
    cy.get('#name-carrierService').type('prueba')
    cy.get('[data-testid="error-message-name-carrierService"]').should(
      'not.have.value',
      'El nombre es requerido',
    )
    cy.get('#sku-carrierService').type('bamba-serv')
    cy.get('[data-testid="error-message-sku-carrierService"]').should(
      'not.have.value',
      'El SKU es requerido',
    )
    cy.get('#cost-per-year-carrierService').type('1')
    cy.get('[data-testid="error-message-cost-per-year-carrierService"]').should(
      'not.have.value',
      'El costo por año es requerido',
    )
    cy.get('#cost-per-month-carrierService').type('1')
    cy.get(
      '[data-testid="error-message-cost-per-month-carrierService"]',
    ).should('not.have.value', 'El costo por mes es requerido')
    cy.get('#category-carrierService').click()
    cy.get('[data-value="931b7435-403d-439f-90c3-d6ee8d11de84"]').click()
    cy.get('[data-testid="error-message-category-carrierService"]').should(
      'not.have.value',
      'La categoría es requerida',
    )

    cy.get('#carrier-carrierService').click()
    cy.get('[data-value="6c024359-72bd-49e7-a6fc-610edb84e20d"]').click()
    cy.get('[data-testid="error-message-carrier-carrierService"]').should(
      'not.have.value',
      'El carrier es requerido',
    )
    cy.get('#key').type('bamba')
    cy.get('[data-testid="error-message-name-key"]').should(
      'not.have.value',
      'El campo es requerido',
    )
    cy.get('#value').type('service')
    cy.get('[data-testid="error-message-name-value"]').should(
      'not.have.value',
      'El campo es requerido',
    )
  })
})
