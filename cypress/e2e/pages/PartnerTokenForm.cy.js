/// <reference types="cypress" />

describe('Partner view', () => {
  it('display list partners', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Productos"]').first().click()
    cy.get('[data-testid="drawer-item-Partners"]').should('contain', 'Partners')
    cy.get('[data-testid="drawer-item-Partners"]').first().click()
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should(
      'contain',
      'Nombre del partner',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should(
      'contain',
      'Código',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should(
      'contain',
      'Tipo',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(4)').should(
      'contain',
      'Compañía',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(5)').should(
      'contain',
      'Acciones',
    )
  })

  it('should show modal to token partner ', () => {
    cy.get(
      '[data-testid="icon-button-Agente Bamba"] > [data-testid="KeyIcon"]',
    ).click()
    cy.get('#alert-dialog-title').should('contain', 'Token')
  })
})
