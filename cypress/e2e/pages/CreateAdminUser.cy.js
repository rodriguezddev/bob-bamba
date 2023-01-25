/// <reference types="cypress" />

describe('Create admin user view', () => {
  it('Show create admin user page', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Administradores"]').should(
      'contain',
      'Administradores',
    )
    cy.get('[data-testid="drawer-item-Administradores"]').first().click()
    cy.get('[data-testid="button-create-admin-user"]').click()
    cy.get('[data-testid="title-admin-user"]').should(
      'contain',
      'Crear usuario administrador',
    )
  })

  it('Show errors validations form', () => {
    cy.get('.MuiBox-root > .MuiButtonBase-root').click()
    cy.get('[data-testid="error-message-name-admin"]').should(
      'contain',
      'El nombre es requerido',
    )
    cy.get('[data-testid="error-message-lastname-admin"]').should(
      'contain',
      'El apellido es requerido',
    )
    cy.get('[data-testid="error-message-email-admin"]').should(
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
  })

  it('Remove errors form', () => {
    cy.get('#name-admin-user').type('prueba')
    cy.get('[data-testid="error-message-name-admin"]').should(
      'not.have.value',
      'El nombre es requerido',
    )
    cy.get('#lastname-admin-user').type('prueba')
    cy.get('[data-testid="error-message-lastname-admin"]').should(
      'not.have.value',
      'El apellido es requerido',
    )
    cy.get('#email-admin-user').type('adminprueba@gmail.com')
    cy.get('[data-testid="error-message-email-admin"]').should(
      'not.have.value',
      'El email es requerido',
    )
    cy.get('#password-admin-user').type('Password2')
    cy.get('[data-testid="error-message-password-admin"]').should(
      'not.have.value',
      'La contraseña es requerida',
    )
    cy.get('#confirm-password-admin-user').type('Password2')
    cy.get('[data-testid="error-message-confirm-password-admin"]').should(
      'not.have.value',
      'Las contraseñas son distintas',
    )
  })
})
