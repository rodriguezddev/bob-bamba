/// <reference types="cypress" />

describe('create user view', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.login('admin@vivebamba.com', 'Password')
  })

  it('Show errors validations form', () => {
    cy.get('[data-testid="drawer-item-Usuarios"]').should('contain', 'Usuarios')
    cy.get('[data-testid="drawer-item-Usuarios"]').first().click()
    cy.intercept('/admin/api/v1/users').as('getUsers')
    cy.wait('@getUsers')
    cy.get('[data-testid="button-create-user"]').click()
    cy.get('[data-testid="title-create-user"]').should(
      'contain',
      'Crear usuario',
    )
    cy.get('[data-testid="create-user-button"]').click()
    cy.get('[data-testid="error-message-name"]').should(
      'contain',
      'El nombre del usuario es requerido',
    )
    cy.get('[data-testid="error-message-lastname"]').should(
      'contain',
      'El primer apellido del usuario es requerido',
    )
    cy.get('[data-testid="error-message-partnerId"]').should(
      'contain',
      'El partner del usuario es requerido',
    )
    cy.get('[data-testid="error-message.cellphone"]').should(
      'contain',
      'El numero de celular del usuario es requerido',
    )
    cy.get('#acceptedNewsletter').should('be.checked')
  })
})
