/// <reference types="cypress" />

describe('Product view', () => {
  it('display list products', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Productos"]').should(
      'contain',
      'Productos',
    )
    cy.get('[data-testid="drawer-item-Productos"]').first().click()
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should(
      'contain',
      'Nombre del producto',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should(
      'contain',
      'Sku',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should(
      'contain',
      'Recurrente',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(4)').should(
      'contain',
      'Unidad de expiración',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(5)').should(
      'contain',
      'Período de expiración',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(6)').should(
      'contain',
      'Estatus',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(7)').should(
      'contain',
      'Precios',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(8)').should(
      'contain',
      'Categorías',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(9)').should(
      'contain',
      'Descripción',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(10)').should(
      'contain',
      'Resumen',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(11)').should(
      'contain',
      'Términos y Condiciones',
    )
  })

  it('use filters products', () => {
    cy.get('[data-testid="FilterAltIcon"] > path').click()
    cy.get('#category').type('insurance')
    cy.get('[data-testid="button-filter-search"]').click()
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(8)').should(
      'contain',
      'insurance',
    )
  })

  it('check pagination', () => {
    cy.get('[aria-label="first page"]').should('be.disabled')
  })
})
