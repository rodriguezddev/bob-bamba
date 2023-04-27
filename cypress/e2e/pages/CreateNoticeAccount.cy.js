/// <reference types="cypress" />

describe('Create notice account view', () => {
  it('Show create product page', () => {
    cy.clearLocalStorage()
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Administradores"]').should(
      'contain',
      'Administradores',
    )
    cy.visit('/notice-account')
    cy.get('[data-testid="button-create-notice-account"]').click()
    cy.get('[data-testid="title-create-account-name"]').should(
      'contain',
      'Crear cuenta de notificaciones',
    )
  })

  it('Show errors validations form', () => {
    cy.get('[data-testid="button-create-notice-account"]').click()
    cy.get('[data-testid="error-message-name-notice-account"]').should(
      'contain',
      'El nombre de la cuenta es requerido',
    )
    cy.get('[data-testid="error-message-account-name-campaigns"]').should(
      'contain',
      'El acción es requerida',
    )
  })

  it('Remove errors form', () => {
    cy.get('#name-notice-account').type('prueba')
    cy.get('[data-testid="error-message-name-notice-account"]').should(
      'not.have.value',
      'El nombre es requerido',
    )
    cy.get('#accountName').click()
    cy.get('[data-value="WHATSAPP"]').click()
    cy.get('[data-testid="error-message-account-name-campaigns"]').should(
      'not.have.value',
      'El acción es requerida',
    )
  })
})
