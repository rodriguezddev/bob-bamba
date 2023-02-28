/// <reference types="cypress" />

describe('Create carriers view', () => {
  it('Show create carrier page', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Carriers"]').should('contain', 'Carriers')
    cy.get('[data-testid="drawer-item-Carriers"]').first().click()
    cy.get('[data-testid="button-redirect-carrier"]').click()
    cy.get('[data-testid="button-create-carrier"]').click()
    cy.get('[data-testid="title-create-carrier"]').should(
      'contain',
      'Crear carrier',
    )
  })

  it('Show errors validations form', () => {
    cy.get('.MuiBox-root > .MuiButtonBase-root').click()
    cy.get('[data-testid="error-message-name-carrier"]').should(
      'contain',
      'El nombre del carrier es requerido',
    )
    cy.get('[data-testid="error-message-code-carrier"]').should(
      'contain',
      'El código es requerido',
    )
  })

  it('Remove errors form', () => {
    cy.get('#name-carrier').type('prueba')
    cy.get('[data-testid="error-message-name-carrier"]').should(
      'not.have.value',
      'El nombre del carrier es requerido',
    )
    cy.get('#code-carrier').type('prueba')
    cy.get('[data-testid="error-message-code-carrier"]').should(
      'not.have.value',
      'El código es requerido',
    )
  })
})
