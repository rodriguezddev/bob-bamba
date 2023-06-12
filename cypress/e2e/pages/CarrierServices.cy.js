/// <reference types="cypress" />

describe('Carrier services view', () => {
  it('display list carrier services', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Carriers"]').should('contain', 'Carriers')
    cy.get('[data-testid="drawer-item-Carriers"]').first().click()
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should(
      'contain',
      'Nombre del carrier service',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should(
      'contain',
      'Sku',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should(
      'contain',
      'Carrier',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(4)').should(
      'contain',
      'Costo por año',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(5)').should(
      'contain',
      'Costo por mes',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(6)').should(
      'contain',
      'Categorías',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(7)').should(
      'contain',
      'Habilitado',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(8)').should(
      'contain',
      'Metadatos',
    )
  })

  it('use filters carrier services', () => {
    cy.get('[data-testid="FilterAltIcon"] > path').click()
    cy.get('#category').type('insurance')
    cy.get('[data-testid="button-filter-search"]').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(6)').should(
      'contain',
      'insurance',
    )
  })

  it('show details', () => {
    cy.get(':nth-child(1) > :nth-child(8) > .MuiTypography-root > u').click()
    cy.get('[data-testid="title-alert-Metadatos"]').should(
      'contain',
      'Metadatos',
    )
    cy.get('[data-testid="close-button-alert"]').click()
  })

  it('check pagination', () => {
    cy.get('[aria-label="first page"]').should('be.disabled')
  })
})
