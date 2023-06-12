/// <reference types="cypress" />

describe('create user view', () => {
  it('Show page create template', () => {
    cy.clearLocalStorage()
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Notificaciones"] ').should(
      'contain',
      'Notificaciones',
    )
    cy.get('[data-testid="drawer-item-Notificaciones"] ').first().click()
    cy.get('[data-testid="button-redirect-noticeAccount"]').click()
    cy.get('[data-testid="button-redirect-noticeAccount-template"]').click()
    cy.get('[data-testid="button-create-noticeAccount-template"]').should(
      'contain',
      'Crear plantilla',
    )
    cy.get('[data-testid="button-create-noticeAccount-template"]').click()
    cy.get('[data-testid="title-create-template"]').should(
      'contain',
      'Crear plantilla',
    )
  })

  it('Show errors validations form', () => {
    cy.get('[data-testid="create-template-button"]').should('contain', 'Enviar')
    cy.get('[data-testid="create-template-button"]').click()
    cy.get('[data-testid="error-message-name"]').should(
      'contain',
      'El nombre es requerido',
    )
    cy.get('[data-testid="error-message-noticeAccount"]').should(
      'contain',
      'La cuenta es requerida',
    )
    cy.get('[data-testid="error-message-lang"]').should(
      'contain',
      'El idioma es requerido',
    )
    cy.get('[data-testid="error-message-content"]').should(
      'contain',
      'El contenido es requerido',
    )
  })
})
