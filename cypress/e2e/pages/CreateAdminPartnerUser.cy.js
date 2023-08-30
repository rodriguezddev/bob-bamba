/// <reference types="cypress" />

describe('CreateAdminPartnerUser view', () => {
  it('display create admin partner user', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Usuarios admin partners"]')
      .first()
      .click()
    cy.get('[data-testid="button-create-admin"]').click()
    cy.get('[data-testid="create-admin-button"]').click()
    cy.get('[data-testid="title-create-admin"]').should(
      'contain',
      'Crear usuario admin partner',
    )
    cy.get('[data-testid="create-admin-button"]').click()
  })

  it('show errors validations form', () => {
    cy.get('[data-testid="create-admin-button"]').click()
    cy.get('[data-testid="error-message-name"]').should(
      'contain',
      'El nombre es requerido',
    )
    cy.get('[data-testid="error-message-lastname"]').should(
      'contain',
      'El Apellido es requerido',
    )
    cy.get('[data-testid="error-message-email"]').should(
      'contain',
      'El email es requerido',
    )
    cy.get('[data-testid="error-message-password-admin"]').should(
      'contain',
      'La contraseña es requerida',
    )
    cy.get('[data-testid="error-message-confirm-password-admin"]').should(
      'contain',
      'Las contraseñas son distintas',
    )
    cy.get('[data-testid="error-message-partnerId"]').should(
      'contain',
      'El nombre del partner es requerido',
    )
  })
})
