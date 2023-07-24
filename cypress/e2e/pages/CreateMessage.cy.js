/// <reference types="cypress" />

describe('create message view', () => {
  it('Show create message page', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Mensajes"]').should('contain', 'Mensajes')
    cy.get('[data-testid="drawer-item-Mensajes"]').first().click()
    cy.get('[data-testid="button-create-welcome-message"]').click()
    cy.get('[data-testid="title-create-message"]').should(
      'contain',
      'Crear mensaje',
    )
  })

  it('show errors validations form', () => {
    cy.get('[data-testid="create-template-button"]').click()
    cy.get('[data-testid="error-message-partner-id-message"]').should(
      'contain',
      'El nombre del partner es requerido',
    )
    cy.get('[data-testid="error-message-type-message"]').should(
      'contain',
      'El tipo es requerido',
    )
    cy.get('[data-testid="error-message-key-message"]').should(
      'contain',
      'La clave del mensajes es obligatoria',
    )
    cy.get('[data-testid="error-message-content"]').should(
      'contain',
      'El mensaje es requerido',
    )
  })
})
