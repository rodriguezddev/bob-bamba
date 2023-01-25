/// <reference types="cypress" />

describe('create partner view', () => {
  it('Show create partner page', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Partners"]').should('contain', 'Partners')
    cy.get('[data-testid="drawer-item-Partners"]').first().click()
    cy.get('[data-testid="button-create-partner"]').click()
    cy.get('[data-testid="title-partners"]').should('contain', 'Crear partner')
  })

  it('show errors validations form', () => {
    cy.get('.MuiBox-root > .MuiButtonBase-root').click()
    cy.get('[data-testid="error-message-name"]').should(
      'contain',
      'El nombre es requerido',
    )
    cy.get('[data-testid="error-message-code"]').should(
      'contain',
      'El código es requerido',
    )
    cy.get('[data-testid="error-message-partnerType"]').should(
      'contain',
      'El tipo de partner es requerido',
    )
    cy.get('[data-testid="error-message-name-company"]').should(
      'contain',
      'El nombre de la compañía es requerido',
    )
    cy.get('[data-testid="error-message-country"]').should(
      'contain',
      'El país es requerido',
    )
    cy.get('[data-testid="error-message-phone"]').should(
      'contain',
      'El teléfono es requerido',
    )
    cy.get('[data-testid="error-message-email"]').should(
      'contain',
      'El email es requerido',
    )
  })

  it('remove error form', () => {
    cy.get('#name').type('Bamba')
    cy.get('[data-testid="error-message-name"]').should(
      'not.have.value',
      'El nombre es requerido',
    )
    cy.get('#code').type('Bamba-mx')
    cy.get('[data-testid="error-message-code"]').should(
      'not.have.value',
      'El código es requerido',
    )
    cy.get('#partnerType').select('AGGREGATOR')
    cy.get('[data-testid="error-message-partnerType"]').should(
      'not.have.value',
      'El tipo de partner es requerido',
    )
    cy.get('#nameCompany').type('Bamba')
    cy.get('[data-testid="error-message-name-company"]').should(
      'not.have.value',
      'El nombre de la compañía es requerido',
    )
    cy.get('#countryCode').select('MX')
    cy.get('[data-testid="error-message-country"]').should(
      'not.have.value',
      'El país es requerido',
    )
    cy.get('#phone').type('5555555555')
    cy.get('[data-testid="error-message-phone"]').should(
      'not.have.value',
      'El teléfono es requerido',
    )
    cy.get('#email').type('bamba@bamba.com')
    cy.get('[data-testid="error-message-email"]').should(
      'not.have.value',
      'El email es requerido',
    )
  })
})
