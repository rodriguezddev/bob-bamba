/// <reference types="cypress" />

describe('Campaigns view', () => {
  it('display list campaigns', () => {
    cy.login('admin@vivebamba.com', 'Password')
    cy.get('[data-testid="drawer-item-Campañas"]').should('contain', 'Campañas')
    cy.get('[data-testid="drawer-item-Campañas"]').first().click()
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should(
      'contain',
      'Nombre de la cuenta',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should(
      'contain',
      'Fecha de envío',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should(
      'contain',
      'Template',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(4)').should(
      'contain',
      'Idioma del template',
    )
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(5)').should(
      'contain',
      'Usuarios asignados',
    )
  })

  it('use filters campaigns', () => {
    cy.get('[data-testid="FilterAltIcon"] > path').click()
    cy.get('#send_date').type('2023-10-01')
    cy.get('[data-testid="button-filter-search"]').click()
    cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(2)').should(
      'contain',
      '01-10-2023 00:00',
    )
  })

  it('check pagination', () => {
    cy.get('[aria-label="first page"]').should('be.disabled')
  })
})
