/// <reference types="cypress" />

describe('List users view', () => {
  it('display user view success', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Usuarios"]').should('contain', 'Usuarios')
    cy.get('[data-testid="drawer-item-Usuarios"]').first().click()
    cy.get(
      ':nth-child(1) > :nth-child(6) > .MuiGrid-container > .MuiGrid-root > .MuiButtonBase-root',
    )
      .first()
      .click()
    cy.get(
      'form > .MuiGrid-container > :nth-child(1) > .MuiTypography-root',
    ).should('contain', 'Nombre(s)*')
  })

  it('display user view return to list users', () => {
    cy.get('[data-testid="drawer-item-Usuarios"]').should('contain', 'Usuarios')
    cy.get('[data-testid="drawer-item-Usuarios"]').first().click()
    cy.get('[data-testid="VisibilityIcon"] > path').first().click()
  })

  it('show subscriptions details', () => {
    cy.get('[data-testid="subscriptions-title"]').should(
      'contain',
      'Suscripciones',
    )
    cy.get('[data-testid="button-to-show-certificate-id-1"]').click()
    cy.get('#pdf-viewer-dialog-title').should('contain', 'Certificado')
    cy.get('[data-testid="pdf-viewer-Button-action"]').click()
  })

  it('show cancel subscription modal', () => {
    cy.get('[data-testid="subscriptions-title"]').should(
      'contain',
      'Suscripciones',
    )
    cy.get('[data-testid="button-to-cancel-subscription-id-1"]').click()
    cy.get('[data-testid="close-button-alert"]').should('contain', 'Cerrar')
    cy.get('[data-testid="close-button-alert"]').click()
    cy.get('[data-testid="back-button"]').click()
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should(
      'contain',
      'Nombre del colaborador',
    )
  })
})
