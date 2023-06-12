/// <reference types="cypress" />

describe('Create campaigns view', () => {
  it('Show create campaigns page', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Campañas"]').should('contain', 'Campañas')
    cy.get('[data-testid="drawer-item-Campañas"]').first().click()
    cy.intercept('/admin/api/v1/newsletter-messages').as('getCampaigns')
    cy.wait('@getCampaigns')
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
    cy.get('[data-testid="error-message-partnerId-campaigns"]').should(
      'contain',
      'El nombre del partner es requerido',
    )
    cy.get('[data-testid="error-message-template-campaigns"]').should(
      'contain',
      'La plantilla es requerida',
    )
  })

  it('Remove errors form', () => {
    cy.get('#provider').click()
    cy.wait(2000)
    cy.get('[data-value="WHATSAPP"]').click()
    cy.get('#accountId').click()
    cy.wait(2000)
    cy.get('[data-value="50e6cbd4-6a13-4cf7-ab8b-063c314362fc"]').click()
    cy.intercept(
      '/admin/api/v1/notice-account/50e6cbd4-6a13-4cf7-ab8b-063c314362fc/templates',
    ).as('getTemplates')
    cy.wait('@getTemplates')
    cy.get('[data-testid="error-message-account-name-campaigns"]').should(
      'not.have.value',
      'El nombre de la cuenta es requerido',
    )

    cy.get(':nth-child(3) > .MuiGrid-root > .MuiFormControl-root').type(
      '2023-11-01 12:00',
    )
    cy.get('[data-testid="error-message-send-date-campaigns"]').should(
      'not.have.value',
      'La fecha de envío es requerida',
    )

    cy.get('#partnerId').click()
    cy.get('[data-value="a438caaf-9745-4b19-8498-8d99800bd664"]').click()
    cy.get('[data-testid="error-message-partnerId-campaigns"]').should(
      'not.have.value',
      'El nombre del partner es requerido',
    )

    cy.get('#infoTemplate').click()
    cy.get('[data-value="guardar_numero es_MX"]').click()
    cy.get('[data-testid="error-message-send-date-campaigns"]').should(
      'not.have.value',
      'La plantilla es requerida',
    )
  })
})
