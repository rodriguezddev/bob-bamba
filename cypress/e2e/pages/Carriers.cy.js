/// <reference types="cypress" />

describe('Carriers view', () => {
  it('display list carriers', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Carriers"]').should('contain', 'Carriers')
    cy.get('[data-testid="drawer-item-Carriers"]').first().click()
    cy.get('[data-testid="button-redirect-carrier"]').click()
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should(
      'contain',
      'Nombre del carrier',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should(
      'contain',
      'Código',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should(
      'contain',
      'Habilitado',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(4)').should(
      'contain',
      'Acciones',
    )
  })

  it('use filters carriers', () => {
    cy.get('[data-testid="FilterAltIcon"] > path').click()
    cy.get('#code').type('BAMBA')
    cy.get('[data-testid="button-filter-search"]').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').should(
      'contain',
      'BAMBA',
    )
  })

  it('check pagination', () => {
    cy.get('[aria-label="first page"]').should('be.disabled')
  })
})
