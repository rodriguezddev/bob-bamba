/// <reference types="cypress" />

describe('Create campaigns view', () => {
  it('Show create campaigns page', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Campañas"]').should('contain', 'Campañas')
    cy.get('[data-testid="drawer-item-Campañas"]').first().click()
    cy.get('[data-testid="button-create-campaigns"]').click()
    cy.get('[data-testid="title-create-campaigns"]').should(
      'contain',
      'Crear campañas',
    )
  })

  it('Show errors validations form', () => {
    cy.get('.MuiBox-root > .MuiButtonBase-root').click()
    cy.get('[data-testid="error-message-account-name-campaigns"]').should(
      'contain',
      'El nombre de la cuenta es requerido',
    )
    cy.get('[data-testid="error-message-send-date-campaigns"]').should(
      'contain',
      'La fecha de envío es requerida',
    )
    cy.get('[data-testid="error-message-template-campaigns"]').should(
      'contain',
      'El template es requerido',
    )
  })

  it('Remove errors form', () => {
    cy.get('#accountName').click()
    cy.get('[data-value="symplifica"]').click()
    cy.get('[data-testid="error-message-account-name-campaigns"]').should(
      'not.have.value',
      'El nombre de la cuenta es requerido',
    )

    cy.get(':nth-child(2) > .MuiGrid-root > .MuiFormControl-root').type(
      '2023-11-01 12:00',
    )
    cy.get('[data-testid="error-message-send-date-campaigns"]').should(
      'not.have.value',
      'La fecha de envío es requerida',
    )

    cy.get('#infoTemplate').click()
    cy.get('[data-value="bienvenida_symplifica es_MX"]').click()
    cy.get('[data-testid="error-message-send-date-campaigns"]').should(
      'not.have.value',
      'El template es requerido',
    )
  })
})
